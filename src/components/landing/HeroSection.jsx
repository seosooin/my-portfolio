import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center', px: { xs: 2, md: 3 } }}>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, mb: 2 }}
        >
          Hero
        </Typography>
        <Typography sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, lineHeight: 1.6 }}>
          여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default HeroSection;
