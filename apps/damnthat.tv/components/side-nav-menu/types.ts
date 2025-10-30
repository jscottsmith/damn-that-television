export type SideNavMenuRoute = {
  title: string;
  absolutePath: string;
  children?: SideNavMenuRoutes;
};

export type SideNavMenuRoutes = { [key: string]: SideNavMenuRoute };
