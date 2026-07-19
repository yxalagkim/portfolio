'use client';

import { useRef, useEffect } from 'react';
import clsx from 'clsx';
import { gsap } from '@/libs/gsap';

interface MarqueeProps {
  className?: string;
  length: number;
  direction?: 'left' | 'right';
  stroke?: boolean;
  hidden?: boolean;
  children: React.ReactNode;
}

const Marquee = ({
  className,
  length,
  direction = 'left',
  stroke = false,
  hidden = false,
  children,
}: MarqueeProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;

    const animate = () => {
      const firstItemWidth = track.children[0].getBoundingClientRect().width;
      const trackWidth = track.getBoundingClientRect().width;
      const dir = direction === 'right' ? 1 : -1;

      const startXPercent =
        dir === 1 ? -(((2 * firstItemWidth) / trackWidth) * 100) : 0;
      const endXPercent =
        dir === 1 ? 0 : -(((2 * firstItemWidth) / trackWidth) * 100);

      const moveDistance = 2 * firstItemWidth;
      const speed = 50; // px/sec
      const duration = moveDistance / speed;

      gsap.killTweensOf(track);
      gsap.set(track, { xPercent: startXPercent });
      gsap.to(track, {
        xPercent: endXPercent,
        duration,
        ease: 'none',
        repeat: -1,
      });
    };

    animate();
    const handleResize = () => animate();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [direction]);

  return (
    <div className={clsx('marquee', className, hidden && 'is-hidden')}>
      <div ref={trackRef} className="marquee__track">
        {Array.from({ length }).map((_, index) => (
          <div
            key={index}
            className={clsx(
              'marquee__item',
              stroke && index % 2 === 0 && 'marquee__item--stroke',
            )}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
