import { useEffect, useRef } from 'react';

/**
 * useParallax 훅
 * 스크롤 위치에 따라 요소에 다층 패럴렉스 이동 효과를 적용한다.
 * scroll 이벤트를 requestAnimationFrame으로 쓰로틀링해 리플로우 비용을 줄이고,
 * 계산된 값은 CSS 커스텀 프로퍼티(--parallax-y)로 노출해 transform3d로 렌더링한다.
 *
 * @param {number} speed - 패럴렉스 이동 배율 (음수면 반대 방향으로 이동) [Optional, 기본값: 0.15]
 *
 * Example usage:
 * const parallaxRef = useParallax(0.2);
 * <Box ref={parallaxRef} sx={{ transform: 'translate3d(0, var(--parallax-y, 0px), 0)' }} />
 */
function useParallax(speed = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let ticking = false;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distanceFromCenter = rect.top + rect.height / 2 - viewportCenter;
      node.style.setProperty('--parallax-y', `${distanceFromCenter * speed}px`);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return ref;
}

export default useParallax;
