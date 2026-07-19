'use client';

import { useRef, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap, ScrollTrigger } from '@/libs/gsap';
import { useStore } from '@/store';

const LenisScroll = ({ children }: { children: React.ReactNode }) => {
  const setLenis = useStore((state) => state.setLenis);
  const wrapperRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const lenis = new Lenis({
      syncTouch: true,
      smoothWheel: true,
      wrapper: wrapperRef.current,
      content: contentRef.current,
    });

    setLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, [setLenis]);

  return (
    <div className="layout">
      <main ref={wrapperRef} className="main">
        <div ref={contentRef} className="container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default LenisScroll;
