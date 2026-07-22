import Box from '@mui/material/Box';

const marqueeKeyframes = {
  '@keyframes marqueeScroll': {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(-50%)' },
  },
};

/**
 * Marquee 컴포넌트
 * 전달받은 콘텐츠를 좌우로 끊김 없이 무한 반복 스크롤하는 컨테이너 (Magic UI의 Marquee 스타일)
 *
 * Props:
 * @param {node} children - 반복 스크롤할 콘텐츠 [Required]
 * @param {number} duration - 한 바퀴 도는 데 걸리는 시간(초) [Optional, 기본값: 24]
 * @param {boolean} isReverse - 반대 방향으로 스크롤할지 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <Marquee duration={20}>{items.map((item) => <Chip key={item.id} label={item.name} />)}</Marquee>
 */
function Marquee({ children, duration = 24, isReverse = false }) {
  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        ...marqueeKeyframes,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: `marqueeScroll ${duration}s linear infinite`,
          animationDirection: isReverse ? 'reverse' : 'normal',
          '&:hover': { animationPlayState: 'paused' },
        }}
      >
        <Box sx={{ display: 'flex', gap: 4, flexShrink: 0, pr: 4 }}>{children}</Box>
        <Box sx={{ display: 'flex', gap: 4, flexShrink: 0, pr: 4 }} aria-hidden="true">
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Marquee;
