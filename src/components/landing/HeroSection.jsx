import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import { usePortfolio } from '../../context/PortfolioContext';
import BorderBeam from '../ui/BorderBeam';
import TypingMorphText from '../ui/TypingMorphText';
import useParallax from '../../hooks/useParallax';

const ROLE_WORDS = ['개발자', '디자이너', '크리에이터'];

const GITHUB_URL = 'https://github.com/seosooin';
const TOUCH_TARGET = 44;

const heroKeyframes = {
  '@keyframes heroFadeInUp': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  '@keyframes heroBounce': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(8px)' },
  },
  '@keyframes heroPulse': {
    '0%, 100%': { boxShadow: '0 0 0 0 rgba(232, 51, 42, 0.45)' },
    '50%': { boxShadow: '0 0 0 12px rgba(232, 51, 42, 0)' },
  },
};

function fadeIn(delay) {
  return {
    opacity: 0,
    animation: 'heroFadeInUp 0.8s ease-out forwards',
    animationDelay: `${delay}s`,
  };
}

function HeroSection() {
  const { homeData } = usePortfolio();
  const { basicInfo } = homeData;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const accentBlobRef = useParallax(0.15);
  const softBlobRef = useParallax(-0.1);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: { xs: 6, sm: 8, md: 10, lg: 14 },
        backgroundImage:
          'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(160deg, var(--color-primary-dark) 0%, var(--color-primary) 55%, var(--color-primary-light) 100%)',
        backgroundSize: '22px 22px, 100% 100%',
        ...heroKeyframes,
      }}
    >
      <Box
        ref={accentBlobRef}
        sx={{
          position: 'absolute',
          top: { xs: -40, sm: -60, md: -80, lg: -100 },
          right: { xs: -40, sm: -60, md: -70, lg: -80 },
          width: { xs: 140, sm: 200, md: 260, lg: 320 },
          height: { xs: 140, sm: 200, md: 260, lg: 320 },
          borderRadius: '50%',
          bgcolor: 'var(--color-accent)',
          opacity: 0.18,
          filter: 'blur(60px)',
          transform: 'translate3d(0, var(--parallax-y, 0px), 0)',
          willChange: 'transform',
        }}
      />
      <Box
        ref={softBlobRef}
        sx={{
          position: 'absolute',
          bottom: { xs: -60, sm: -80, md: -100, lg: -120 },
          left: { xs: -40, sm: -60, md: -80, lg: -100 },
          width: { xs: 160, sm: 220, md: 280, lg: 340 },
          height: { xs: 160, sm: 220, md: 280, lg: 340 },
          borderRadius: '50%',
          bgcolor: 'primary.contrastText',
          opacity: 0.06,
          filter: 'blur(70px)',
          transform: 'translate3d(0, var(--parallax-y, 0px), 0)',
          willChange: 'transform',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 3, sm: 4, md: 6 }} alignItems="center">
          <Grid size={{ xs: 12, sm: 12, md: 5 }} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                position: 'relative',
                display: 'inline-block',
                borderRadius: '50%',
                width: { xs: 96, sm: 140, md: 160, lg: 180 },
                height: { xs: 96, sm: 140, md: 160, lg: 180 },
                ...fadeIn(0.1),
              }}
            >
              <BorderBeam size={3} duration={4.5} />
              <Avatar
                src={basicInfo.photo}
                alt={basicInfo.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  border: '3px solid',
                  borderColor: 'primary.contrastText',
                  boxShadow: '0 0 0 6px rgba(255,255,255,0.08)',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 0 6px var(--color-accent)',
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 7 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.78rem', md: '0.85rem' },
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                mb: { xs: 1, md: 1.5 },
                ...fadeIn(0.2),
              }}
            >
              Fashion Designer → Web Designer
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' },
                mb: { xs: 1.5, md: 2 },
                ...fadeIn(0.25),
              }}
            >
              <Typography sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }, fontWeight: 700 }}>
                저는 <TypingMorphText words={ROLE_WORDS} /> 입니다
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.2rem', lg: '2.6rem' },
                fontWeight: 800,
                lineHeight: { xs: 1.35, md: 1.3 },
                mb: { xs: 2.5, md: 3 },
                ...fadeIn(0.3),
              }}
            >
              패션에서 웹으로, 경계를 넘으며
              <br />
              성장하는 디자이너 {basicInfo.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: { xs: 'center', md: 'flex-start' },
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: { xs: 1.5, sm: 2 },
                ...fadeIn(0.4),
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                fullWidth={isMobile}
                onClick={() => scrollToSection('projects-section')}
                sx={{
                  fontWeight: 700,
                  px: 4,
                  minHeight: TOUCH_TARGET,
                  animation: 'heroPulse 2.4s ease-in-out infinite',
                  transition: 'transform 0.25s ease',
                  '&:hover': { transform: 'translateY(-3px) scale(1.03)' },
                }}
              >
                프로젝트 보기
              </Button>
              <Button
                variant="text"
                fullWidth={isMobile}
                onClick={() => scrollToSection('contact-section')}
                sx={{
                  color: 'primary.contrastText',
                  opacity: 0.85,
                  minHeight: TOUCH_TARGET,
                  transition: 'opacity 0.25s ease, transform 0.25s ease, background-color 0.25s ease',
                  '&:hover': { opacity: 1, transform: 'translateY(-2px)', bgcolor: 'rgba(255,255,255,0.08)' },
                }}
              >
                연락하기
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            mt: { xs: 4, sm: 6, md: 8 },
          }}
        >
          <IconButton
            component="a"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            sx={{
              width: TOUCH_TARGET,
              height: TOUCH_TARGET,
              color: 'primary.contrastText',
              border: '1px solid rgba(255,255,255,0.3)',
              transition: 'transform 0.25s ease, border-color 0.25s ease, color 0.25s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                borderColor: 'var(--color-accent)',
                color: 'var(--color-accent)',
              },
            }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            onClick={() => scrollToSection('about-section')}
            aria-label="아래로 스크롤"
            sx={{
              width: TOUCH_TARGET,
              height: TOUCH_TARGET,
              color: 'primary.contrastText',
              animation: 'heroBounce 1.8s ease-in-out infinite',
            }}
          >
            <KeyboardArrowDownIcon fontSize="large" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
