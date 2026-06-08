export type AppChromeRoute = {
  title: string;
  absolutePath: string;
  children?: AppChromeRoutes;
};

export type AppChromeRoutes = { [key: string]: AppChromeRoute };
