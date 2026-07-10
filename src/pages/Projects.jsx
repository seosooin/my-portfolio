import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Projects() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="md" sx={{ py: 4, px: { xs: 2, md: 3 }, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 2 }}>
          Projects
        </Typography>
        <Typography sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, lineHeight: 1.6, color: 'text.secondary' }}>
          Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default Projects;
