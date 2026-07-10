import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function AboutSection() {
  return (
    <Box component="section" sx={{ width: '100%', bgcolor: 'background.default', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Card elevation={0} sx={{ bgcolor: 'background.paper', textAlign: 'center', p: { xs: 2, md: 4 } }}>
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
                mb: 2,
                borderBottom: '3px solid var(--color-accent)',
                display: 'inline-block',
                pb: 1,
              }}
            >
              About Me
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, lineHeight: 1.6, color: 'text.secondary' }}>
              여기는 About Me 섹션입니다. 간단한 자기소개와 &apos;더 알아보기&apos; 버튼이 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AboutSection;
