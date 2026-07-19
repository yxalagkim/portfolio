'use client';

import { useRef, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { gsap, ScrollTrigger } from '@/libs/gsap';
import { useStore } from '@/store';

const Intro = () => {
  const [lenis, introOut, setIntroOut] = useStore(
    useShallow((state) => [state.lenis, state.introOut, state.setIntroOut]),
  );
  const introRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLParagraphElement[]>([]);
  const progressRef = useRef<HTMLParagraphElement>(null);
  const progressValueRef = useRef({ value: 0 });

  useEffect(() => {
    if (!introRef.current) return;

    const header = document.querySelector('.header');
    const main = document.querySelector('.main');

    const ctx = gsap.context(() => {
      gsap.set(header, { autoAlpha: 0 });
      gsap.set(main, { x: '100%', scale: 0.9 });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onStart: () => lenis?.stop(),
        onComplete: () => {
          lenis?.start();
          setIntroOut(true);

          gsap.delayedCall(0.05, () => ScrollTrigger.refresh());
        },
      });

      // 진행률 증가
      tl.to(progressValueRef.current, {
        value: 100,
        duration: 5,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (progressRef.current) {
            progressRef.current.innerText = `${progressValueRef.current.value.toFixed(
              0,
            )}%`;
          }
        },
      });

      // 텍스트 슬라이드
      tl.to(
        [textRefs.current[0], progressRef.current],
        {
          yPercent: -100,
          duration: 0.5,
        },
        '-=0.2',
      );
      tl.to(textRefs.current[1], { yPercent: -100, duration: 0.5 }, '-=0.3');

      // 화면 전환
      tl.to(introRef.current, { scale: 0.9, borderRadius: 'var(--radius)' });
      tl.to(introRef.current, { x: '-100%' });
      tl.to(main, { x: 0 }, '<');
      tl.to(main, {
        scale: 1,
        borderRadius: 0,
        onComplete: () => {
          gsap.to(header, { autoAlpha: 1 });
        },
      });
    });

    return () => ctx.revert();
  }, [lenis, setIntroOut]);

  if (introOut) return null;

  return (
    <div ref={introRef} className="intro">
      <div className="intro__text">
        <p
          ref={(el) => {
            if (el) textRefs.current[0] = el;
          }}
        >
          Initializing interface...
        </p>
        <p
          ref={(el) => {
            if (el) textRefs.current[1] = el;
          }}
        >
          System ready
        </p>
      </div>
      <div className="intro__progress">
        <p ref={progressRef}>0%</p>
      </div>
    </div>
  );
};

export default Intro;
