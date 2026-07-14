"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
  type RefObject,
} from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

const SHEET_TRANSITION = {
  type: "spring" as const,
  bounce: 0.25,
  duration: 0.5,
};

type SheetSide = "top" | "right" | "bottom" | "left";

type SheetContextValue = {
  open: boolean;
  actionsRef: RefObject<SheetPrimitive.Root.Actions | null>;
};

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext() {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet components must be used within <Sheet>.");
  }
  return context;
}

function getSideMotion(side: SheetSide) {
  const hidden =
    side === "left"
      ? { x: "-100%" }
      : side === "right"
        ? { x: "100%" }
        : side === "top"
          ? { y: "-100%" }
          : { y: "100%" };

  return {
    initial: hidden,
    animate: side === "left" || side === "right" ? { x: 0 } : { y: 0 },
    exit: hidden,
  };
}

function Sheet({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  ...props
}: SheetPrimitive.Root.Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const actionsRef = useRef<SheetPrimitive.Root.Actions | null>(null);

  const handleOpenChange = useCallback(
    (
      next: boolean,
      eventDetails: Parameters<
        NonNullable<SheetPrimitive.Root.Props["onOpenChange"]>
      >[1]
    ) => {
      // Motion spring exit is JS-driven and won't show up in getAnimations(),
      // so Base UI must wait for us to unmount after onAnimationComplete.
      if (!next) {
        eventDetails.preventUnmountOnClose();
      }
      if (openProp === undefined) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next, eventDetails);
    },
    [openProp, onOpenChange]
  );

  return (
    <SheetPrimitive.Root
      data-slot="sheet"
      open={open}
      onOpenChange={handleOpenChange}
      {...props}
      actionsRef={actionsRef}
    >
      <SheetContext.Provider value={{ open, actionsRef }}>
        {children as ReactNode}
      </SheetContext.Provider>
    </SheetPrimitive.Root>
  );
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-background/80 transition-opacity duration-300 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: SheetSide;
  showCloseButton?: boolean;
}) {
  const { open, actionsRef } = useSheetContext();
  const openRef = useRef(open);
  openRef.current = open;
  const sideMotion = getSideMotion(side);

  return (
    <AnimatePresence>
      {open ? (
        <SheetPortal keepMounted>
          <SheetOverlay />
          <SheetPrimitive.Popup
            data-slot="sheet-content"
            data-side={side}
            className={cn(
              "fixed z-50 flex flex-col bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
              className
            )}
            {...props}
            render={
              <motion.div
                initial={sideMotion.initial}
                animate={sideMotion.animate}
                exit={sideMotion.exit}
                transition={SHEET_TRANSITION}
                onAnimationComplete={() => {
                  // Exiting tree keeps a stale render; read the live open flag.
                  if (!openRef.current) {
                    actionsRef.current?.unmount();
                  }
                }}
              />
            }
          >
            {children}
            {showCloseButton && (
              <SheetPrimitive.Close
                data-slot="sheet-close"
                render={
                  <Button
                    presentation="icon"
                    className="absolute top-4 right-4"
                  />
                }
              >
                <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                <span className="sr-only">Close</span>
              </SheetPrimitive.Close>
            )}
          </SheetPrimitive.Popup>
        </SheetPortal>
      ) : null}
    </AnimatePresence>
  );
}

function SheetHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-6", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
