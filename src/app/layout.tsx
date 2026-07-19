import '@/styles/style.scss';

import type { Metadata, Viewport } from 'next';
import { cormorantUpright, cabinetGrotesk, pretendard } from '@/fonts';
import LenisScroll from '@/libs/lenis/LenisScroll';
import Intro from '@/components/layout/Intro';
import Header from '@/components/layout/Header';
import Scrollbar from '@/components/ui/Scrollbar';
import Cursor from '@/components/ui/Cursor';

export const metadata: Metadata = {
  title: 'H.EUN',
  description: 'UI/UX 개발자, 웹 퍼블리셔 김하은 포트폴리오',
  keywords: [
    'UI/UX 개발자',
    '웹 퍼블리셔',
    '웹접근성',
    '웹표준',
    '반응형 웹',
    'React',
    'Next.js',
    'TypeScript',
    '인터랙션 개발',
    '포트폴리오',
  ],
  openGraph: {
    title: 'H.EUN - Web Publisher Portfolio',
    description: 'UI/UX 개발자, 웹 퍼블리셔 김하은 포트폴리오',
    images: '/og-image.jpg',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantUpright.variable} ${cabinetGrotesk.variable} ${pretendard.variable}`}
    >
      <body>
        <Intro />
        <div className="bg-video">
          <video
            src="/video/bg.mp4"
            autoPlay
            muted
            playsInline
            loop
            aria-hidden="true"
          />
        </div>
        <Scrollbar />
        <Header />
        <LenisScroll>{children}</LenisScroll>
        <Cursor />
      </body>
    </html>
  );
}
