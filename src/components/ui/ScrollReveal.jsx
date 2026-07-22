import Box from '@mui/material/Box';
import useScrollReveal from '../../hooks/useScrollReveal';

const DIRECTION_OFFSETS = {
  up: 'translate3d(0, 32px, 0)',
  down: 'translate3d(0, -32px, 0)',
  left: 'translate3d(32px, 0, 0)',
  right: 'translate3d(-32px, 0, 0)',
};

/**
 * ScrollReveal 컴포넌트
 * 자식 요소가 뷰포트에 들어오면 페이드인 + 슬라이드 애니메이션으로 등장시킨다.
 *
 * Props:
 * @param {node} children - 애니메이션을 적용할 콘텐츠 [Required]
 * @param {'up'|'down'|'left'|'right'} direction - 등장 시작 방향 [Optional, 기본값: 'up']
 * @param {number} delay - 등장 지연 시간(초) [Optional, 기본값: 0]
 * @param {number} duration - 등장 애니메이션 진행 시간(초) [Optional, 기본값: 0.7]
 *
 * Example usage:
 * <ScrollReveal direction="left" delay={0.1}><Card>...</Card></ScrollReveal>
 */
function ScrollReveal({ children, direction = 'up', delay = 0, duration = 0.7 }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : DIRECTION_OFFSETS[direction],
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Box>
  );
}

export default ScrollReveal;
