export const handleBallEnter = (e: React.MouseEvent) => {
  const element = e.currentTarget;
  const buttonBall = element.querySelector<HTMLSpanElement>('.btn__ball');
  if (!buttonBall) return;

  const rect = element.getBoundingClientRect();
  const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
  const fromTop = e.clientY < rect.top + rect.height / 2;

  buttonBall.style.left = `${xPercent}%`;
  buttonBall.style.top = fromTop ? '0%' : '100%';
};
