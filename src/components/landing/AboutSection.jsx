import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { usePortfolio } from '../../context/PortfolioContext';
import HomeSkillBadge from './HomeSkillBadge';
import ScrollReveal from '../ui/ScrollReveal';

function AboutSection() {
  const navigate = useNavigate();
  const { homeData } = usePortfolio();
  const { content, skills, basicInfo } = homeData;
  const devStory = content.find((section) => section.id === 'dev-story');

  return (
    <Box id="about-section" component="section" sx={{ width: '100%', bgcolor: 'background.default', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Card elevation={0} sx={{ bgcolor: 'background.paper', p: { xs: 2, md: 4 } }}>
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
                mb: 3,
                borderBottom: '3px solid var(--color-accent)',
                display: 'inline-block',
                pb: 1,
              }}
            >
              About Me
            </Typography>
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
                <ScrollReveal direction="left">
                  <Avatar
                    src={basicInfo.photo}
                    alt={basicInfo.name}
                    sx={{ width: 140, height: 140, mx: 'auto', mb: 2 }}
                  />
                  <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 0.5 }}>
                    {basicInfo.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
                    {basicInfo.major} · {basicInfo.experience}
                  </Typography>
                </ScrollReveal>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <ScrollReveal direction="right" delay={0.1}>
                  {devStory && (
                    <Box sx={{ mb: 3 }}>
                      <Typography sx={{ fontSize: '1.05rem', fontWeight: 600, mb: 1 }}>
                        {devStory.title}
                      </Typography>
                      <Typography
                        sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, lineHeight: 1.6, color: 'text.secondary' }}
                      >
                        {devStory.summary}
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                    {skills.map((skill) => (
                      <HomeSkillBadge key={skill.id} skill={skill} showName={false} />
                    ))}
                  </Box>
                  <Button variant="outlined" onClick={() => navigate('/about')}>
                    더 알아보기
                  </Button>
                </ScrollReveal>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AboutSection;
