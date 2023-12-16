import { SideNavMenuRoutes } from '@/components/side-nav-menu/types';

export const routes: SideNavMenuRoutes = {
  'design-system': {
    title: 'Design System',
    absolutePath: '/design-system',
    children: {
      buttons: {
        title: 'Buttons',
        absolutePath: '/design-system/buttons',
      },
      colors: {
        title: 'Colors',
        absolutePath: '/design-system/colors',
      },
      components: {
        title: 'Components',
        absolutePath: '/design-system/components',
      },
      inputs: {
        title: 'Inputs',
        absolutePath: '/design-system/inputs',
      },
      typography: {
        title: 'Typography',
        absolutePath: '/design-system/typography',
      },
    },
  },
};
