'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from '@/libs/gsap';
import DecoVideo from '@/components/ui/DecoVideo';

const Collab = () => {
  const collabRef = useRef<HTMLElement>(null);
  const collabTextRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!collabRef.current || !collabTextRef.current || !videoRef.current)
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: collabRef.current,
        scroller: document.querySelector('.main'),
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onLeave: () => videoRef.current?.classList.add('is-open'),
        onEnterBack: () => videoRef.current?.classList.remove('is-open'),
      },
    });

    const lines = Array.from(
      collabTextRef.current.children,
    ) as HTMLDivElement[];

    lines.forEach((line) => {
      tl.to(line, { backgroundSize: '100%', duration: 1, ease: 'none' });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={collabRef} className="collab">
      <div className="inner collab__inner">
        <div ref={collabTextRef} className="collab__en-text">
          <div>Are you</div>
          <div>
            looking
            <DecoVideo ref={videoRef} src="/video/deco-04.mp4" />
            for
          </div>
          <div>a publisher</div>
          <div>to work with?</div>
        </div>
        <p className="collab__ko-text">
          함께 일할 퍼블리셔를 찾고 계신가요?
          <Image
            className="deco-icon deco-icon--lg"
            src="/images/eyes.png"
            alt=""
            width={32}
            height={32}
          />
        </p>
      </div>
    </section>
  );
};

export default Collab;
