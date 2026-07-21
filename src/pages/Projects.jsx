import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import useProjects from '../hooks/useProjects';
import ProjectCard from '../components/projects/ProjectCard';

function Projects() {
  const { projects, loading, error } = useProjects();

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="md" sx={{ py: 4, px: { xs: 2, md: 3 } }}>
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: { xs: 3, md: 4 }, textAlign: 'center' }}
        >
          Projects
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <Typography sx={{ textAlign: 'center', color: 'error.main' }}>
            프로젝트를 불러오지 못했습니다: {error}
          </Typography>
        )}

        {!loading && !error && projects.length === 0 && (
          <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
            등록된 프로젝트가 없습니다.
          </Typography>
        )}

        {!loading && !error && projects.length > 0 && (
          <Stack spacing={3}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                techStack={project.tech_stack}
                projectType={project.project_type}
                detailUrl={project.detail_url}
                githubUrl={project.github_url}
                thumbnailUrl={project.thumbnail_url}
              />
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default Projects;
