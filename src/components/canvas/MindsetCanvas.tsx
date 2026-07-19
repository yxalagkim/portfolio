'use client';

import { useRef, useEffect } from 'react';
import Matter from 'matter-js';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@/store';
import { contact } from '@/data/info';

const images = [
  {
    src: '/images/mindset-text-01.svg',
    width: 495,
    height: 155,
    text: 'Meaningful markup',
  },
  {
    src: '/images/mindset-text-02.svg',
    width: 454,
    height: 224,
    text: "Let's make it reusable",
  },
  {
    src: '/images/mindset-text-03.svg',
    width: 374,
    height: 156,
    text: 'Problem solver',
  },
  {
    src: '/images/mindset-text-04.svg',
    width: 464,
    height: 225,
    text: 'Always open to learning',
  },
  {
    src: '/images/mindset-text-05.svg',
    width: 496,
    height: 155,
    text: 'Turn ideas into reality',
  },
  {
    src: '/images/mindset-text-06.svg',
    width: 457,
    height: 155,
    text: 'Moving forward',
  },
  {
    src: '/images/mindset-text-07.svg',
    width: 493,
    height: 155,
    text: 'I enjoy challenges',
  },
  {
    src: '/images/mindset-text-08.svg',
    width: 573,
    height: 155,
    text: 'Learn continuously',
  },
  {
    src: '/images/mindset-text-09.svg',
    width: 367,
    height: 155,
    text: 'Follow trends',
  },
  { src: '/images/mindset-text-10.svg', width: 406, height: 184 },
  {
    src: '/images/mail.png',
    width: 160,
    height: 117,
    link: `mailto:${contact.mail}`,
  },
  { src: '/images/asterisk.svg', width: 80, height: 80 },
  { src: '/images/arrow-serif.svg', width: 80, height: 151 },
];

const MindsetCanvas = () => {
  const [lenis, setHoverText] = useStore(
    useShallow((state) => [state.lenis, state.setHoverText]),
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const wallsRef = useRef<{
    roof: Matter.Body;
    ground: Matter.Body;
    wallLeft: Matter.Body;
    wallRight: Matter.Body;
  } | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);

  const createBody = (
    img: (typeof images)[0],
    width: number,
    height: number,
    existingBody?: Matter.Body,
  ) => {
    const scale =
      width <= 768
        ? Math.min(Math.max(width / 1920, 0.35), 0.45)
        : Math.min(Math.max(width / 1920, 0.5), 1);
    const bodyWidth = img.width * scale;
    const bodyHeight = img.height * scale;

    const index = images.indexOf(img);
    const cols = Math.ceil(Math.sqrt(images.length));
    const col = index % cols;
    const colWidth = width / cols;

    let posX = existingBody
      ? existingBody.position.x
      : col * colWidth + Math.random() * (colWidth - bodyWidth) + bodyWidth / 2;

    let posY = existingBody
      ? existingBody.position.y
      : Math.random() * (height / 2 - bodyHeight) + bodyHeight / 2;

    posX = Math.min(Math.max(posX, bodyWidth / 2), width - bodyWidth / 2);
    posY = Math.min(Math.max(posY, bodyHeight / 2), height - bodyHeight / 2);

    const body = Matter.Bodies.rectangle(posX, posY, bodyWidth, bodyHeight, {
      angle: (Math.random() - 0.5) * 1.8,
      render: {
        sprite: {
          texture: img.src,
          xScale: bodyWidth / img.width,
          yScale: bodyHeight / img.height,
        },
      },
    });

    if (existingBody) {
      Matter.Body.setVelocity(body, existingBody.velocity);
      Matter.Body.setAngle(body, existingBody.angle);
      Matter.Body.setAngularVelocity(body, existingBody.angularVelocity);
    }

    return body;
  };

  useEffect(() => {
    if (!wrapperRef.current || !canvasRef.current) return;

    const element = wrapperRef.current;
    const canvas = canvasRef.current;
    const width = element.clientWidth;
    const height = element.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    const engine = Matter.Engine.create();
    engine.gravity.y = 1;

    const render = Matter.Render.create({
      element,
      canvas,
      engine,
      options: {
        width: width * dpr,
        height: height * dpr,
        wireframes: false,
        background: 'transparent',
        pixelRatio: dpr,
      },
    });

    render.canvas.width = width * dpr;
    render.canvas.height = height * dpr;
    render.canvas.style.width = width + 'px';
    render.canvas.style.height = height + 'px';
    const ctx = render.canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 바디 생성
    const bodies = images.map((img) => createBody(img, width, height));
    bodiesRef.current = bodies;
    Matter.Composite.add(engine.world, bodies);

    // 벽 생성
    const createWalls = (w: number, h: number) => {
      const roof = Matter.Bodies.rectangle(w / 2, -30, w, 60, {
        isStatic: true,
        render: { visible: false },
      });

      const ground = Matter.Bodies.rectangle(w / 2, h + 30, w, 60, {
        isStatic: true,
        render: { visible: false },
      });

      const wallLeft = Matter.Bodies.rectangle(-30, h / 2, 60, h, {
        isStatic: true,
        render: { visible: false },
      });

      const wallRight = Matter.Bodies.rectangle(w + 30, h / 2, 60, h, {
        isStatic: true,
        render: { visible: false },
      });

      Matter.Composite.add(engine.world, [roof, ground, wallLeft, wallRight]);

      return { roof, ground, wallLeft, wallRight };
    };
    wallsRef.current = createWalls(width, height);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // mouseConstraint 초기화
    const initMouseConstraint = () => {
      if (mouseConstraintRef.current) {
        Matter.Composite.remove(engine.world, mouseConstraintRef.current);
        mouseConstraintRef.current = null;
      }

      const mouse = Matter.Mouse.create(render.canvas);

      if (window.innerWidth > 1024) {
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
          mouse,
          constraint: { stiffness: 0.1, render: { visible: false } },
        });
        Matter.Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;
        mouseConstraintRef.current = mouseConstraint;
      }
    };
    initMouseConstraint();

    // 커서 호버 텍스트
    const handleMouseEnter = () => {
      setHoverText('Try dragging');
    };

    const handleMouseLeave = () => {
      setHoverText(null);
    };

    // 바디 클릭 링크 이동
    const openBodyLink = (clientX: number, clientY: number) => {
      const rect = render.canvas.getBoundingClientRect();
      const mousePos = { x: clientX - rect.left, y: clientY - rect.top };

      const clickedBody = Matter.Query.point(
        Matter.Composite.allBodies(engine.world),
        mousePos,
      )[0];
      if (!clickedBody) return;

      const texture = clickedBody.render?.sprite?.texture;
      if (!texture) return;

      const imgData = images.find((img) => texture.endsWith(img.src));
      if (imgData?.link) {
        window.location.assign(imgData.link);
      }
    };

    const handleMouseDown = (e: MouseEvent) =>
      openBodyLink(e.clientX, e.clientY);

    const handleTouchEnd = (e: TouchEvent) => {
      if (!e.changedTouches.length) return;
      const touch = e.changedTouches[0];
      openBodyLink(touch.clientX, touch.clientY);
    };

    // 이벤트 리스너 등록
    render.canvas.addEventListener('mouseenter', handleMouseEnter);
    render.canvas.addEventListener('mouseleave', handleMouseLeave);
    render.canvas.addEventListener('mousedown', handleMouseDown);
    render.canvas.addEventListener('touchend', handleTouchEnd);

    // 리사이즈
    const handleResize = () => {
      // 캔버스 크기 갱신
      const newWidth = element.clientWidth;
      const newHeight = element.clientHeight;

      Matter.Render.setSize(render, newWidth * dpr, newHeight * dpr);
      render.canvas.style.width = `${newWidth}px`;
      render.canvas.style.height = `${newHeight}px`;

      // 벽 갱신
      Object.values(wallsRef.current ?? {}).forEach((wall) =>
        Matter.Composite.remove(engine.world, wall),
      );
      wallsRef.current = createWalls(newWidth, newHeight);

      // 바디 갱신
      const newBodies = bodiesRef.current.map((body, i) =>
        createBody(images[i], newWidth, newHeight, body),
      );
      bodiesRef.current.forEach((body) =>
        Matter.Composite.remove(engine.world, body, true),
      );
      Matter.Composite.add(engine.world, newBodies);
      bodiesRef.current = newBodies;

      // mouseConstraint 갱신
      initMouseConstraint();

      // 튕김 효과
      bodiesRef.current.forEach((body) => {
        const randomY = -5 - Math.random() * 5;
        Matter.Body.setVelocity(body, { x: 0, y: randomY });
      });
    };
    window.addEventListener('resize', handleResize);

    // 스크롤 이벤트
    const handleScroll = ({ velocity }: { velocity: number }) => {
      if (Math.abs(velocity) > 2) {
        bodiesRef.current.forEach((body) => {
          if (!body) return;

          const bodyHeight = body.bounds.max.y - body.bounds.min.y;
          const MAX_RISE_RATIO = 1.5;
          const groundY = wallsRef.current?.ground.position.y ?? 0;
          const currentRise = groundY - body.position.y;

          if (currentRise > bodyHeight * MAX_RISE_RATIO) return;

          const baseVelocity = Math.min(5, Math.abs(velocity) * 0.2);
          const randomOffset = Math.random() * 1;
          Matter.Body.setVelocity(body, {
            x: 0,
            y: -baseVelocity - randomOffset,
          });
        });
      }
    };
    lenis?.on('scroll', handleScroll);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Composite.clear(engine.world, true);
      Matter.Engine.clear(engine);
      render.canvas.remove();

      // 이벤트 제거
      render.canvas.removeEventListener('mouseenter', handleMouseEnter);
      render.canvas.removeEventListener('mouseleave', handleMouseLeave);
      render.canvas.removeEventListener('mousedown', handleMouseDown);
      render.canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      lenis?.off('scroll', handleScroll);
    };
  }, [lenis, setHoverText]);

  return (
    <div ref={wrapperRef} className="mindset__canvas">
      <div className="blind">
        <h2>Mindset</h2>
        <ul>
          {images.map((img, i) => img.text && <li key={i}>{img.text}</li>)}
        </ul>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MindsetCanvas;
