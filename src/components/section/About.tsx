'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from '@/libs/gsap';
import { aboutItems } from '@/data/aboutItems';
import AppearText from '@/components/animation/AppearText';
import DecoVideo from '@/components/ui/DecoVideo';

const About = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const aboutItemRefs = useRef<HTMLDivElement[]>([]);
  const videoRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(videoRefs.current, {
        scrollTrigger: {
          trigger: aboutRef.current,
          scroller: document.querySelector('.main'),
          start: 'top 20%',
          scrub: true,
          toggleClass: {
            targets: videoRefs.current,
            className: 'is-open',
          },
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          scroller: document.querySelector('.main'),
          start: 'top bottom',
          end: '+=300%',
          scrub: true,
        },
      });

      aboutItemRefs.current.forEach((item) => {
        const direction = item.dataset.direction === 'right' ? '+=' : '-=';
        const parallax = parseFloat(item.dataset.parallax || '1');

        tl.to(item, { x: `${direction}${parallax * 20}vw` }, '<');
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={aboutRef} className="about" id="about">
      <div className="inner">
        <AppearText className="about__desc">
          <p>Hi, my name&apos;s Ha Eun Kim.</p>
          <p>Let me tell you about myself!</p>
        </AppearText>
        <h2 className="about__title">
          ( I am <span>→→→</span>
          <Image
            className="deco-icon deco-icon--lg deco-icon--wave"
            src="/images/waving-hand.png"
            alt=""
            width={32}
            height={32}
          />{' '}
          )
        </h2>
        {aboutItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) aboutItemRefs.current[index] = el;
            }}
            className="about__item"
            data-direction={item.direction}
            data-parallax={item.parallax}
          >
            <span className="about__index">({index + 1})</span>
            <div className="about__label">
              {item.textBefore}
              {item.src && (
                <DecoVideo
                  ref={(el) => {
                    if (el) videoRefs.current[index] = el;
                  }}
                  src={item.src}
                />
              )}
              {item.icon && <item.icon />}
              {item.textAfter}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
