import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal 훅
 * IntersectionObserver로 요소가 뷰포트에 들어오는 순간을 감지해 스크롤 등장 애니메이션을 트리거한다.
 *
 * @param {object} options - 옵션 객체 [Optional]
 * @param {number} options.threshold - 요소가 보이는 비율 기준 [Optional, 기본값: 0.15]
 * @param {string} options.rootMargin - 관찰 영역 여백 [Optional, 기본값: '0px 0px -10% 0px']
 * @param {boolean} options.triggerOnce - 한 번 등장 후 재관찰을 멈출지 여부 [Optional, 기본값: true]
 *
 * Example usage:
 * const { ref, isVisible } = useScrollReveal();
 * <Box ref={ref} sx={{ opacity: isVisible ? 1 : 0 }} />
 */
function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -10% 0px', triggerOnce = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

export default useScrollReveal;
