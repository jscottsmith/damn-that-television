import type { ComponentType, SVGProps } from "react";

export type AppChromeRouteIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type AppChromeRoute = {
  title: string;
  absolutePath: string;
  icon: AppChromeRouteIcon;
  children?: AppChromeRoutes;
};

export type AppChromeRoutes = { [key: string]: AppChromeRoute };
