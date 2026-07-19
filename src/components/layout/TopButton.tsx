import useScrollTo from '@/hooks/useScrollTo';
import { handleBallEnter } from '@/utils/buttonBall';
import { Arrow } from '@/components/icons';

const TopButton = () => {
  const { scrollTo } = useScrollTo();

  return (
    <button
      type="button"
      className="btn btn--circle footer__top-btn"
      aria-label="상단으로 이동"
      onClick={() => scrollTo(0)}
      onMouseEnter={handleBallEnter}
    >
      <Arrow className="btn__arrow" />
      <span className="btn__ball"></span>
    </button>
  );
};

export default TopButton;
