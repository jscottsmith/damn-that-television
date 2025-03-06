import { NavLinks } from '@/components/types';
import { ROUTE_DAMN_GAME, ROUTE_RESUME } from '@/constants/routes.constants';
import { INTRO_ID } from 'app/(main)/home/components/introduction';

export const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: [0.01, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
};

export const NAVIGATION_LINKS: NavLinks = [
  { label: 'Who?', href: `/#${INTRO_ID}` },
  { label: 'Play', href: ROUTE_DAMN_GAME },
  { label: 'Résumé', href: ROUTE_RESUME },
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

export const METADATA = {
  title: 'Damn that television!',
  description: `What a bad picture! Don't get upset, it's not a major disaster.`,
  siteDomain: 'Damnthat.tv',
  baseUrl: 'https://damnthat.tv',
} as const;
