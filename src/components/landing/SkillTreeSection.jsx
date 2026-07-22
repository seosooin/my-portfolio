import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { usePortfolio } from '../../context/PortfolioContext';
import HomeSkillBadge from './HomeSkillBadge';
import Marquee from '../ui/Marquee';
import ScrollReveal from '../ui/ScrollReveal';

function SkillTreeSection() {
  const navigate = useNavigate();
  const { aboutMeData } = usePortfolio();

  return (
    <Box component="section" sx={{ width: '100%', bgcolor: 'background.paper', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Card elevation={0} sx={{ bgcolor: 'background.default', textAlign: 'center', p: { xs: 2, md: 4 } }}>
          <CardContent>
            <ScrollReveal>
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
                Skill Tree
              </Typography>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <Box sx={{ mb: 3 }}>
                <Marquee duration={28}>
                  {aboutMeData.skills.map((skill) => (
                    <HomeSkillBadge key={skill.id} skill={skill} />
                  ))}
                </Marquee>
              </Box>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <Button variant="outlined" onClick={() => navigate('/about')}>
                전체 스킬 보기
              </Button>
            </ScrollReveal>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default SkillTreeSection;
