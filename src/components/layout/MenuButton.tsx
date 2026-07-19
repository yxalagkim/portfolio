import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@/store';

const MenuButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useStore(
    useShallow((state) => [state.isMenuOpen, state.setIsMenuOpen]),
  );

  return (
    <button
      type="button"
      className="header__menu-btn"
      aria-label="메뉴 열기"
      aria-expanded={isMenuOpen}
      aria-controls="site-nav"
      onClick={() => setIsMenuOpen(true)}
    >
      <div className="header__menu-flip">
        <span>MENU</span>
        <span aria-hidden="true">MENU</span>
      </div>
    </button>
  );
};

export default MenuButton;
