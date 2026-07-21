import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import useProjects from '../../hooks/useProjects';
import ProjectThumbnailCard from './ProjectThumbnailCard';

const FEATURED_COUNT = 4;

function ProjectsSection() {
  const { projects, loading, error } = useProjects();
  const featuredProjects = projects.slice(0, FEATURED_COUNT);

  return (
    <Box component="section" sx={{ width: '100%', bgcolor: 'background.default', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 700,
              display: 'inline-block',
              borderBottom: '3px solid var(--color-accent)',
              pb: 1,
            }}
          >
            Projects
          </Typography>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <Typography sx={{ textAlign: 'center', color: 'error.main' }}>
            프로젝트를 불러오지 못했습니다: {error}
          </Typography>
        )}

        {!loading && !error && featuredProjects.length === 0 && (
          <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
            등록된 프로젝트가 없습니다.
          </Typography>
        )}

        {!loading && !error && featuredProjects.length > 0 && (
          <Grid container spacing={3}>
            {featuredProjects.map((project) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <ProjectThumbnailCard
                  title={project.title}
                  detailUrl={project.detail_url}
                  thumbnailUrl={project.thumbnail_url}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 5 } }}>
          <Button variant="outlined" size="large" component={RouterLink} to="/projects">
            더 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
