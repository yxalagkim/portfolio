'use client';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { gsap } from '@/libs/gsap';
import { useStore } from '@/store';
import { Arrow } from '@/components/icons';
import Marquee from '@/components/animation/Marquee';

const Cursor = () => {
  const hoverText = useStore((state) => state.hoverText);
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current) return;

    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
    });

    const xTo = gsap.quickTo(cursorRef.current, 'x', {
      duration: 0.3,
      ease: 'power2.out',
    });

    const yTo = gsap.quickTo(cursorRef.current, 'y', {
      duration: 0.3,
      ease: 'power2.out',
    });

    const moveCursor = (e: MouseEvent) => {
      if (!visible) setVisible(true);

      xTo(e.clientX);
      yTo(e.clientY);
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, [visible]);

  return (
    <div
      ref={cursorRef}
      className={clsx('cursor', hoverText && 'is-text')}
      style={{ opacity: visible ? 1 : 0 }}
    >
      {hoverText && (
        <Marquee length={6}>
          {hoverText}
          <Arrow className="deco-icon" />
        </Marquee>
      )}
    </div>
  );
};

export default Cursor;
