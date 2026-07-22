import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';

const TRAIL_COUNT = 4;
const MAGNETIC_SELECTOR = 'a, button, [role="button"]';
const TEXT_SELECTOR = 'p, h1, h2, h3, h4, h5, h6, span, li';
const MAGNETIC_STRENGTH = 0.25;
const MAGNETIC_MAX = 14;

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

/**
 * CustomCursor 컴포넌트
 * 마우스를 따라다니는 팔로워 링 + 트레일을 렌더링하고, 링크/버튼 근처에서는 자기장처럼 끌려가는 효과와
 * 커서 모양 변형(호버/텍스트)을 적용한다. 터치 기기(hover: none 또는 pointer: coarse)에서는 자동으로 비활성화된다.
 *
 * Example usage:
 * <CustomCursor />  // App.jsx 최상단에 한 번만 마운트
 */
function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [variant, setVariant] = useState('default');

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const magneticTargetRef = useRef(null);

  const mouse = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const trailPos = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 })));

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouchDevice) return undefined;

    setIsEnabled(true);
    document.body.style.cursor = 'none';

    const handleMouseMove = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      const target = magneticTargetRef.current;
      if (target) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = Math.max(Math.min((event.clientX - centerX) * MAGNETIC_STRENGTH, MAGNETIC_MAX), -MAGNETIC_MAX);
        const dy = Math.max(Math.min((event.clientY - centerY) * MAGNETIC_STRENGTH, MAGNETIC_MAX), -MAGNETIC_MAX);
        target.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
    };

    const handleOver = (event) => {
      const magneticTarget = event.target.closest(MAGNETIC_SELECTOR);
      if (magneticTarget) {
        setVariant('interactive');
        magneticTargetRef.current = magneticTarget;
        magneticTarget.style.transition = 'transform 0.2s ease-out';
        return;
      }
      if (event.target.closest(TEXT_SELECTOR)) {
        setVariant('text');
      }
    };

    const handleOut = (event) => {
      const magneticTarget = event.target.closest(MAGNETIC_SELECTOR);
      if (magneticTarget) {
        magneticTarget.style.transform = 'translate3d(0, 0, 0)';
        magneticTargetRef.current = null;
      }
      const nextTarget = event.relatedTarget;
      if (!nextTarget || !nextTarget.closest?.(`${MAGNETIC_SELECTOR}, ${TEXT_SELECTOR}`)) {
        setVariant('default');
      }
    };

    let rafId;
    const animate = () => {
      dotPos.current.x = lerp(dotPos.current.x, mouse.current.x, 0.35);
      dotPos.current.y = lerp(dotPos.current.y, mouse.current.y, 0.35);
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.15);

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      let prevX = mouse.current.x;
      let prevY = mouse.current.y;
      trailPos.current.forEach((pos, index) => {
        pos.x = lerp(pos.x, prevX, 0.25);
        pos.y = lerp(pos.y, prevY, 0.25);
        const node = trailRefs.current[index];
        if (node) {
          node.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
        }
        prevX = pos.x;
        prevY = pos.y;
      });

      rafId = window.requestAnimationFrame(animate);
    };
    rafId = window.requestAnimationFrame(animate);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.body.style.cursor = '';
    };
  }, []);

  if (!isEnabled) return null;

  const isInteractive = variant === 'interactive';
  const isText = variant === 'text';

  return (
    <>
      {trailPos.current.map((_, index) => (
        <Box
          key={index}
          ref={(node) => {
            trailRefs.current[index] = node;
          }}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 6 - index,
            height: 6 - index,
            borderRadius: '50%',
            bgcolor: 'var(--color-accent)',
            opacity: 0.35 - index * 0.07,
            pointerEvents: 'none',
            zIndex: 9998,
            willChange: 'transform',
          }}
        />
      ))}
      <Box
        ref={dotRef}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: 'var(--color-accent)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'opacity 0.2s ease',
          opacity: isInteractive || isText ? 0 : 1,
          willChange: 'transform',
        }}
      />
      <Box
        ref={ringRef}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isInteractive ? 56 : isText ? 3 : 32,
          height: isInteractive ? 56 : isText ? 26 : 32,
          borderRadius: isText ? '2px' : '50%',
          border: '1.5px solid #fff',
          bgcolor: isInteractive ? 'rgba(255,255,255,0.15)' : 'transparent',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border-radius 0.25s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}

export default CustomCursor;
