"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { Button } from "@workspace/ui/components/button";
import { EyeMan } from "@workspace/ui/components/eye-button";
import { ThemeToggle } from "@workspace/ui/components/theme-toggle";
import { TooltipProvider } from "@workspace/ui/components/tooltip";

import { routes } from "app/routes.constants";

import {
  ArrowsRightLeftIcon,
  Cog6ToothIcon,
  EllipsisHorizontalIcon,
  RectangleGroupIcon,
  Square2StackIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import {
  Bars3BottomLeftIcon,
  LockClosedIcon,
  RectangleStackIcon,
} from "@heroicons/react/16/solid";

import { APP_CHROME_SIDEBAR_ID } from "./constants";

export { APP_CHROME_SIDEBAR_ID } from "./constants";
export { AppContent } from "./app-content";
export { AppHeader } from "./app-header";
export { AppPage } from "./app-page";

const SIDEBAR_VARIANTS = ["floating", "sidebar", "inset"] as const;
const SIDEBAR_COLLAPSIBLES = ["icon", "offcanvas", "none"] as const;
const SIDEBAR_SIDES = ["left", "right"] as const;

type SidebarVariant = (typeof SIDEBAR_VARIANTS)[number];
type SidebarCollapsible = (typeof SIDEBAR_COLLAPSIBLES)[number];
type SidebarSide = (typeof SIDEBAR_SIDES)[number];

const SIDEBAR_VARIANT_ICONS = {
  floating: Square2StackIcon,
  sidebar: ViewColumnsIcon,
  inset: RectangleGroupIcon,
} as const;

const SIDEBAR_COLLAPSIBLE_ICONS = {
  icon: Bars3BottomLeftIcon,
  offcanvas: RectangleStackIcon,
  none: LockClosedIcon,
} as const;

function nextInCycle<T extends string>(values: readonly T[], current: T): T {
  const index = values.indexOf(current);
  return values[(index + 1) % values.length];
}

function AppChromeLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { setOpen, isMobile } = useSidebar();
  const [variant, setVariant] = useState<SidebarVariant>("inset");
  const [collapsible, setCollapsible] = useState<SidebarCollapsible>("icon");
  const [side, setSide] = useState<SidebarSide>("left");
  const [query, setQuery] = useState("");

  const VariantIcon = SIDEBAR_VARIANT_ICONS[variant];
  const CollapsibleIcon = SIDEBAR_COLLAPSIBLE_ICONS[collapsible];
  const normalizedQuery = query.trim().toLowerCase();

  useEffect(() => {
    if (!isMobile) {
      setOpen(true);
    }
  }, [isMobile]); /* oxlint-disable-line react-hooks/exhaustive-deps */

  return (
    <>
      <Sidebar
        id={APP_CHROME_SIDEBAR_ID}
        side={side}
        variant={variant}
        collapsible={collapsible}
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="group/eye-man"
                tooltip="Design System"
                render={<Link href="/" />}
              >
                <span
                  className="block size-6 rounded-full shrink-0 [&_svg]:size-full bg-sidebar-accent"
                  aria-hidden
                >
                  <EyeMan />
                </span>{" "}
                Design System
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarInput
            placeholder="Search…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Filter navigation"
          />
        </SidebarHeader>
        <SidebarContent>
          {Object.entries(routes).map(([routePath, route]) => {
            const children = route.children
              ? Object.entries(route.children).filter(([, childRoute]) =>
                  normalizedQuery
                    ? childRoute.title.toLowerCase().includes(normalizedQuery)
                    : true
                )
              : [];

            if (route.children && children.length === 0) {
              return null;
            }

            const ParentIcon = route.icon;

            return (
              <SidebarGroup key={routePath}>
                <SidebarGroupLabel>{route.title}</SidebarGroupLabel>
                <SidebarGroupAction aria-label={`${route.title} settings`}>
                  <Cog6ToothIcon />
                </SidebarGroupAction>
                <SidebarGroupContent>
                  <nav>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          tooltip={route.title}
                          isActive={pathname === route.absolutePath}
                          render={<Link href={route.absolutePath} />}
                        >
                          <ParentIcon className="size-4" />
                          <span>{route.title}</span>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>6</SidebarMenuBadge>
                        {children.length > 0 ? (
                          <SidebarMenuSub>
                            {children.map(([childPath, childRoute]) => {
                              const Icon = childRoute.icon;
                              return (
                                <SidebarMenuSubItem key={childPath}>
                                  <SidebarMenuSubButton
                                    isActive={
                                      pathname === childRoute.absolutePath
                                    }
                                    render={
                                      <Link href={childRoute.absolutePath} />
                                    }
                                  >
                                    <Icon className="size-4" />
                                    <span>{childRoute.title}</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        ) : null}
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </nav>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
          <SidebarSeparator />
          {/* <SidebarGroup>
            <SidebarGroupLabel>Showcase</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton variant="outline" size="sm">
                    <Square2StackIcon className="size-4" />
                    <span>Outline sm</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction showOnHover aria-label="Showcase more">
                    <EllipsisHorizontalIcon />
                  </SidebarMenuAction>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton showIcon width="84%" />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton showIcon width="62%" />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton width="74%" />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup> */}
        </SidebarContent>
        <SidebarFooter className="items-start">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              presentation="icon"
              size="sm"
              variant="secondary"
              aria-label={`Sidebar variant: ${variant}. Click to switch.`}
              onClick={() => setVariant(nextInCycle(SIDEBAR_VARIANTS, variant))}
            >
              <VariantIcon />
            </Button>
            <Button
              presentation="icon"
              size="sm"
              variant="secondary"
              aria-label={`Sidebar collapsible: ${collapsible}. Click to switch.`}
              onClick={() =>
                setCollapsible(nextInCycle(SIDEBAR_COLLAPSIBLES, collapsible))
              }
            >
              <CollapsibleIcon />
            </Button>
            <Button
              presentation="icon"
              size="sm"
              variant="secondary"
              aria-label={`Sidebar side: ${side}. Click to switch.`}
              onClick={() => setSide(nextInCycle(SIDEBAR_SIDES, side))}
            >
              <ArrowsRightLeftIcon />
            </Button>
            <ThemeToggle />
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </>
  );
}

export function AppChrome({ children }: PropsWithChildren) {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen>
        <AppChromeLayout>{children}</AppChromeLayout>
      </SidebarProvider>
    </TooltipProvider>
  );
}
