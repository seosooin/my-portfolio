import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function ContactSection() {
  return (
    <Box
      component="section"
      sx={{ width: '100%', bgcolor: 'primary.dark', color: 'primary.contrastText', py: { xs: 6, md: 10 } }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Card elevation={0} sx={{ bgcolor: 'transparent', textAlign: 'center' }}>
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
              Contact
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, lineHeight: 1.6 }}>
              여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ContactSection;
