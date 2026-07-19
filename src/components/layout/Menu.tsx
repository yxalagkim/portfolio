'use client';

import { useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';
import { gsap } from '@/libs/gsap';
import { useStore } from '@/store';
import useIsMobile from '@/hooks/useIsMobile';
import useScrollTo from '@/hooks/useScrollTo';
import { menuItems } from '@/data/menuItems';
import { Close } from '@/components/icons';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useStore(
    useShallow((state) => [state.isMenuOpen, state.setIsMenuOpen]),
  );
  const isMobile = useIsMobile();
  const { scrollTo } = useScrollTo();
  const menuRef = useRef<HTMLElement>(null);
  const menuItemRefs = useRef<HTMLLIElement[]>([]);

  const tl = useRef(
    gsap.timeline({
      paused: true,
      defaults: { duration: 0.92, ease: 'expo.inOut' },
    }),
  );

  useEffect(() => {
    if (!menuRef.current) return;

    const scrollbar = document.querySelector('.scrollbar');
    const header = document.querySelector('.header');
    const layout = document.querySelector('.layout');
    const main = document.querySelector('.main');

    const ctx = gsap.context(() => {
      gsap.set(menuRef.current, { autoAlpha: 0 });
      gsap.set(menuItemRefs.current, { x: '-100%' });

      tl.current
        .to(menuRef.current, { autoAlpha: 1 }, 'menuOpen')
        .to(
          menuItemRefs.current,
          {
            x: 0,
            stagger: 0.016,
          },
          'menuOpen+=0.1',
        )
        .to(
          main,
          {
            left: '-40vw',
            scale: 0.9,
            transformOrigin: 'right center',
            border: '2px solid var(--color-white)',
            borderRadius: 'var(--radius)',
            pointerEvents: 'none',
          },
          0,
        )
        .to(
          layout,
          {
            opacity: isMobile ? 0.05 : 0.2,
          },
          0,
        )
        .to(
          scrollbar,
          {
            right: '41vw',
            scale: 0.9,
          },
          0,
        )
        .to(
          header,
          {
            top: '3vw',
            left: '-40vw',
            scale: 0.9,
            autoAlpha: 0,
            overwrite: true,
          },
          0,
        );
    });

    return () => ctx.revert();
  }, [isMobile]);

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    setIsMenuOpen(false);

    const onReverseComplete = () => {
      scrollTo(id);
      tl.current?.eventCallback('onReverseComplete', null);
    };

    tl.current?.eventCallback('onReverseComplete', onReverseComplete);
  };

  return (
    <nav ref={menuRef} id="site-nav" className="menu" aria-label="메뉴">
      <div className="menu__inner">
        <button
          type="button"
          className="menu__close-btn"
          aria-label="메뉴 닫기"
          onClick={() => setIsMenuOpen(false)}
        >
          <Close />
        </button>

        <ul className="menu__list">
          {menuItems.map((item, index) => (
            <li
              key={item.title}
              ref={(el) => {
                if (el) menuItemRefs.current[index] = el;
              }}
              className="menu__item"
            >
              <a
                href={item.href}
                className="menu__link"
                onClick={(e) => handleClick(e, item.href)}
              >
                <span className="menu__index">({index + 1})</span>
                <span
                  className={clsx(
                    'menu__text',
                    item.accent && 'menu__text--accent',
                  )}
                >
                  {item.title}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="menu__copyright">
          © 2026. Ha-Eun Kim
          <br />
          All Rights Reserved.
        </p>
      </div>
    </nav>
  );
};

export default Menu;
