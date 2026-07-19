import { Asterisk } from '@/components/icons';

export interface AboutItem {
  id: number;
  src?: string;
  textBefore: string;
  textAfter?: string;
  direction: 'left' | 'right';
  parallax: number;
  icon?: React.ComponentType;
}

export const aboutItems: AboutItem[] = [
  {
    id: 1,
    src: '/video/deco-01.mp4',
    textBefore: 'Detail',
    textAfter: 'oriented',
    direction: 'right',
    parallax: 1,
  },
  {
    id: 2,
    src: '/video/deco-02.mp4',
    textBefore: 'Creative',
    direction: 'right',
    parallax: 3,
  },
  { id: 3, textBefore: 'Proactive', direction: 'left', parallax: 1 },
  {
    id: 4,
    textBefore: 'Flexible',
    direction: 'right',
    parallax: 2,
    icon: Asterisk,
  },
  {
    id: 5,
    src: '/video/deco-03.mp4',
    textBefore: 'Team',
    textAfter: 'player',
    direction: 'left',
    parallax: 1,
  },
];
