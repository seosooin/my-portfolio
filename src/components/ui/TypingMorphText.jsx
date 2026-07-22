import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import useTypingMorph from '../../hooks/useTypingMorph';

const typingKeyframes = {
  '@keyframes typingCharIn': {
    from: { opacity: 0, transform: 'translateY(6px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  '@keyframes typingCursorBlink': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0 },
  },
  '@keyframes typingGradientMove': {
    '0%': { backgroundPosition: '0% center' },
    '100%': { backgroundPosition: '200% center' },
  },
};

/**
 * TypingMorphText 컴포넌트
 * 여러 단어를 타이핑 → 삭제하며 반복 전환하는 텍스트 모핑 효과.
 * 그라데이션 텍스트 + 글자별 등장 애니메이션 + 재생/일시정지 컨트롤을 포함한다.
 *
 * Props:
 * @param {string[]} words - 순환 표시할 단어 배열 [Required]
 * @param {object} sx - 텍스트에 적용할 추가 스타일 [Optional, 기본값: {}]
 *
 * Example usage:
 * <TypingMorphText words={['개발자', '디자이너', '크리에이터']} />
 */
function TypingMorphText({ words, sx = {} }) {
  const { text, isPaused, togglePause } = useTypingMorph(words);

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, ...typingKeyframes }}>
      <Box
        component="span"
        sx={{
          display: 'inline-flex',
          alignItems: 'baseline',
          backgroundImage: 'linear-gradient(90deg, var(--color-accent), #fff, var(--color-accent))',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'typingGradientMove 3s linear infinite',
          ...sx,
        }}
      >
        {text.split('').map((char, index) => (
          <Box
            key={`${index}-${char}`}
            component="span"
            sx={{ display: 'inline-block', animation: 'typingCharIn 0.25s ease-out both', whiteSpace: 'pre' }}
          >
            {char}
          </Box>
        ))}
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            width: '2px',
            height: '0.9em',
            ml: 0.5,
            bgcolor: 'var(--color-accent)',
            animation: isPaused ? 'none' : 'typingCursorBlink 0.9s steps(1) infinite',
          }}
        />
      </Box>
      <IconButton
        size="small"
        onClick={togglePause}
        aria-label={isPaused ? '타이핑 애니메이션 재생' : '타이핑 애니메이션 일시정지'}
        sx={{ color: 'inherit', opacity: 0.6, '&:hover': { opacity: 1 } }}
      >
        {isPaused ? <PlayArrowIcon fontSize="small" /> : <PauseIcon fontSize="small" />}
      </IconButton>
    </Box>
  );
}

export default TypingMorphText;
