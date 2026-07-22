import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

/**
 * ThemeToggle 컴포넌트
 * 해/달 아이콘이 모핑되는 스위치 형태의 다크모드 토글 버튼.
 * MUI의 useColorScheme 훅을 사용해 모드를 전환하며, 선택한 값은 localStorage에 자동 저장된다.
 *
 * Example usage:
 * <ThemeToggle />
 */
function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();
  const effectiveMode = mode === 'system' ? systemMode : mode;
  const isDark = effectiveMode === 'dark';

  if (!mode) return null;

  return (
    <Box
      component="button"
      type="button"
      onClick={() => setMode(isDark ? 'light' : 'dark')}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      aria-pressed={isDark}
      sx={{
        position: 'relative',
        width: 52,
        height: 28,
        p: '3px',
        border: 'none',
        borderRadius: 999,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isDark ? 'flex-end' : 'flex-start',
        bgcolor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
        transition: 'background-color 0.4s ease',
        '&:focus-visible': {
          outline: '2px solid var(--color-accent)',
          outlineOffset: 2,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 22,
          height: 22,
          borderRadius: '50%',
          bgcolor: isDark ? '#1A1A1A' : '#FFFFFF',
          boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
          transition: 'background-color 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <LightModeIcon
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            fontSize: 14,
            color: '#FFB300',
            transform: isDark
              ? 'translate(-50%, -50%) rotate(90deg) scale(0.4)'
              : 'translate(-50%, -50%) rotate(0deg) scale(1)',
            opacity: isDark ? 0 : 1,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        />
        <DarkModeIcon
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            fontSize: 14,
            color: '#CFD8DC',
            transform: isDark
              ? 'translate(-50%, -50%) rotate(0deg) scale(1)'
              : 'translate(-50%, -50%) rotate(-90deg) scale(0.4)',
            opacity: isDark ? 1 : 0,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        />
      </Box>
    </Box>
  );
}

export default ThemeToggle;
