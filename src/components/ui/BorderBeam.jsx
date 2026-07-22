import Box from '@mui/material/Box';

const borderBeamKeyframes = {
  '@keyframes borderBeamSpin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
};

/**
 * BorderBeam 컴포넌트
 * 부모 요소(position: 'relative' 필수)의 테두리를 따라 빛이 회전하는 애니메이션 효과 (Magic UI의 Border Beam 스타일)
 *
 * Props:
 * @param {number} size - 테두리 두께(px) [Optional, 기본값: 2]
 * @param {number} duration - 한 바퀴 도는 데 걸리는 시간(초) [Optional, 기본값: 3.5]
 * @param {string} color - 빛의 색상 [Optional, 기본값: var(--color-accent)]
 *
 * Example usage:
 * <Box sx={{ position: 'relative', borderRadius: '50%' }}>
 *   <BorderBeam />
 *   <Avatar sx={{ width: '100%', height: '100%' }} />
 * </Box>
 */
function BorderBeam({ size = 2, duration = 3.5, color = 'var(--color-accent)' }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        padding: `${size}px`,
        overflow: 'hidden',
        pointerEvents: 'none',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        ...borderBeamKeyframes,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: '-50%',
          background: `conic-gradient(from 0deg, transparent 0deg, ${color} 25deg, transparent 70deg)`,
          animation: `borderBeamSpin ${duration}s linear infinite`,
        }}
      />
    </Box>
  );
}

export default BorderBeam;
