import { NavLinks } from '@/components/types';
import { ROUTE_DAMN_GAME, ROUTE_RESUME } from '@/constants/routes.constants';

export const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: [0.01, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
};

export const NAVIGATION_LINKS: NavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Résumé', href: ROUTE_RESUME },
  { label: 'Damn TV', href: ROUTE_DAMN_GAME },
];

export const SECONDARY_LINKS: NavLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/jscottsmith/',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jscsmith/',
  },
  {
    label: 'Codepen',
    href: 'https://codepen.io/jscottsmith/',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/damntelevision',
  },
];

export const COLORS = {
  white: '#ffffff',
  ghost: '#edf8ff',
  ghostShade: '#dce6fa',
  softy: '#f5b8b5',
  softyShade: '#c68eab',
  fab: '#fffb74',
  cream: '#f7e7b3',
  club: '#6574ff',
  miami: '#72dbde',
  miamiDeep: '#4eb1b6',
  lit: '#ff714c',
  lunar: '#665b85',
  deep: '#2c2f34',
  pepto: '#ea94ba',
};
