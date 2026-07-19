'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { gsap } from '@/libs/gsap';
import { useStore } from '@/store';

const Scrollbar = () => {
  const [lenis, isMenuOpen, introOut] = useStore(
    useShallow((state) => [state.lenis, state.isMenuOpen, state.introOut]),
  );
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  // thumb 위치 업데이트
  const updateThumb = useCallback(() => {
    if (!scrollbarRef.current || !thumbRef.current || !lenis) return;

    const scrollbarHeight = scrollbarRef.current.offsetHeight;
    const thumbHeight = thumbRef.current.offsetHeight;
    const maxThumbPos = scrollbarHeight - thumbHeight;

    const scrollPercent = lenis.scroll / lenis.limit;
    const top = Math.min(maxThumbPos, scrollPercent * maxThumbPos);

    thumbRef.current.style.top = `${top}px`;
  }, [lenis]);

  // 스크롤바 트리거
  const triggerScrollbar = () => {
    if (!scrollbarRef.current) return;

    gsap.to(scrollbarRef.current, { opacity: 1, duration: 0.3 });

    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      if (!scrollbarRef.current) return;
      gsap.to(scrollbarRef.current, { opacity: 0, duration: 0.5 });
    }, 1500);
  };

  useEffect(() => {
    if (!lenis) return;

    updateThumb();

    // 스크롤 이벤트
    const handleScroll = () => {
      triggerScrollbar();
      updateThumb();
    };

    // 리사이즈
    const handleResize = () => {
      lenis.resize();
      updateThumb();
    };

    lenis.on('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // 메뉴가 닫히거나 인트로가 끝났을 때 강제 표시
    if (!isMenuOpen || introOut) {
      triggerScrollbar();
    }

    return () => {
      lenis.off('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [lenis, updateThumb, isMenuOpen, introOut]);

  return (
    <div ref={scrollbarRef} className="scrollbar">
      <div ref={thumbRef} className="scrollbar__thumb"></div>
    </div>
  );
};

export default Scrollbar;
