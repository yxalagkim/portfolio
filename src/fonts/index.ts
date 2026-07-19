import { Cormorant_Upright } from 'next/font/google';
import localFont from 'next/font/local';

export const cormorantUpright = Cormorant_Upright({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant-upright',
  display: 'swap',
});

export const cabinetGrotesk = localFont({
  src: './CabinetGrotesk-Variable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-cabinet-grotesk',
});

export const pretendard = localFont({
  src: './PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});
