import { AppChromeRoutes } from '@/components/app-chrome/types';

export const routes: AppChromeRoutes = {
  'design-system': {
    title: 'Design System',
    absolutePath: '/',
    children: {
      buttons: {
        title: 'Buttons',
        absolutePath: '/buttons',
      },
      colors: {
        title: 'Colors',
        absolutePath: '/colors',
      },
      components: {
        title: 'Components',
        absolutePath: '/components',
      },
      inputs: {
        title: 'Inputs',
        absolutePath: '/inputs',
      },
      typography: {
        title: 'Typography',
        absolutePath: '/typography',
      },
    },
  },
} as const;
