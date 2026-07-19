'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect } from 'react';
import { gsap } from '@/libs/gsap';
import useScrollTo from '@/hooks/useScrollTo';
import useWindowSize from '@/hooks/useWindowSize';
import useIsMobile from '@/hooks/useIsMobile';
import { menuItems } from '@/data/menuItems';
import { link, contacts } from '@/data/info';
import { Logo, Arrow, ArrowSerif } from '@/components/icons';
import AppearText from '@/components/animation/AppearText';
import TopButton from '@/components/layout/TopButton';

const Clock = dynamic(() => import('@/components/ui/Clock'), { ssr: false });

const Footer = () => {
  const { scrollTo } = useScrollTo();
  const windowSize = useWindowSize();
  const isMobile = useIsMobile();
  const footerWrapperRef = useRef<HTMLElement>(null);
  const footerContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const footer = footerContentRef.current;

      if (!footer || !windowSize.height) return;

      gsap.set(footer, { yPercent: 0, height: 'auto' });

      if (!isMobile && footer.offsetHeight <= windowSize.height) {
        gsap.set(footer, { yPercent: -50, height: '100dvh' });
        gsap.to(footer, {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: footerWrapperRef.current,
            scroller: document.querySelector('.main'),
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [isMobile, windowSize.height]);

  return (
    <footer
      ref={footerWrapperRef}
      className="footer"
      id="contact"
      data-header-theme="light"
    >
      <div ref={footerContentRef} className="grid-inner footer__inner">
        <div className="footer__nav">
          <AppearText>
            <h3 className="footer__nav-title">Sitemap</h3>
            {menuItems.map((item) => (
              <div key={item.title} className="footer__nav-item">
                <a
                  href={item.href}
                  className="footer__nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                >
                  {item.title}
                </a>
              </div>
            ))}
          </AppearText>
        </div>
        <div className="footer__nav">
          <AppearText>
            <h3 className="footer__nav-title">Follow</h3>
            <div className="footer__nav-item">
              <a
                href={link.github}
                className="footer__nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Arrow />
                <span>Github</span>
              </a>
            </div>
          </AppearText>
        </div>
        <div className="footer__contact">
          <AppearText>
            <div className="footer__contact-title">
              <h3>
                Work
                <br />
                With Me!!!
              </h3>
              <div className="footer__contact-arrows">
                {[...Array(4)].map((_, index) => (
                  <ArrowSerif key={index} />
                ))}
              </div>
            </div>
            {contacts.map((contact) => (
              <div key={contact.type} className="footer__contact-item">
                <a
                  href={
                    contact.type === 'mail'
                      ? `mailto:${contact.value}`
                      : `tel:${contact.value}`
                  }
                >
                  {contact.value}
                </a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="300%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 1200 60"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" />
                </svg>
              </div>
            ))}
          </AppearText>
        </div>
        <div className="footer__info">
          <AppearText>
            <p>Seoul, Korea</p>
            <p className="footer__time">
              Current Time: <Clock />
            </p>
          </AppearText>
        </div>
        <div className="footer__desc">
          <AppearText>
            <p>This site is not intended for commercial purposes,</p>
            <p>but is intended to be a private portfolio site.</p>
          </AppearText>
        </div>
        <div className="footer__copyright">
          <AppearText>
            <p>© 2026. Ha-Eun Kim</p>
            <p>All Rights Reserved.</p>
          </AppearText>
        </div>
        <h1 className="footer__logo">
          <Logo />
        </h1>
        <TopButton />
      </div>
    </footer>
  );
};

export default Footer;
