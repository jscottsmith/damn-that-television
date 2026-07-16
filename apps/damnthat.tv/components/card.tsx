import React, { HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";
import { SlotComponent, SlotComponentProps } from "./slot";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        className,
        // text-color controls shadow color
        "bg-card shadow-hard shadow-slate-700 dark:shadow-slate-950"
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}

export function CardPadding({
  children,
  className,
  ...props
}: SlotComponentProps) {
  return (
    <SlotComponent className={clsx(className, "p-3 md:p-6 lg:p-8")} {...props}>
      {children}
    </SlotComponent>
  );
}
