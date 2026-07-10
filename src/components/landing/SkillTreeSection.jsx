import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function SkillTreeSection() {
  return (
    <Box component="section" sx={{ width: '100%', bgcolor: 'background.paper', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Card elevation={0} sx={{ bgcolor: 'background.default', textAlign: 'center', p: { xs: 2, md: 4 } }}>
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
              Skill Tree
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, lineHeight: 1.6, color: 'text.secondary' }}>
              여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default SkillTreeSection;
