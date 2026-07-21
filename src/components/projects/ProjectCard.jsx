import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import useThumbnail from '../../hooks/useThumbnail';

/**
 * ProjectCard 컴포넌트
 *
 * Props:
 * @param {string} title - 프로젝트 이름 [Required]
 * @param {string} description - 한 줄 설명 [Required]
 * @param {string[]} techStack - 기술 스택 목록 [Required]
 * @param {string} projectType - 개인/팀 여부 [Required]
 * @param {string} detailUrl - Live Demo 배포 링크 [Required]
 * @param {string} githubUrl - GitHub 저장소 링크 [Optional]
 * @param {string} thumbnailUrl - 썸네일 이미지 URL [Required]
 *
 * Example usage:
 * <ProjectCard title="..." description="..." techStack={['React']} projectType="개인" detailUrl="..." thumbnailUrl="..." />
 */
function ProjectCard({ title, description, techStack, projectType, detailUrl, githubUrl, thumbnailUrl }) {
  const { src: thumbnailSrc, isLoading: thumbnailLoading } = useThumbnail(thumbnailUrl);

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        width: '100%',
        bgcolor: 'background.paper',
        border: '2px solid transparent',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          borderColor: 'var(--color-accent)',
          boxShadow: '0 0 12px var(--color-accent), 0 0 4px var(--color-accent)',
        },
      }}
    >
      {thumbnailLoading ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            width: { xs: '100%', sm: 300 },
            height: { xs: 'auto', sm: 300 },
            aspectRatio: '1 / 1',
            flexShrink: 0,
          }}
        />
      ) : (
        <Box
          component="img"
          src={thumbnailSrc}
          alt={`${title} 썸네일`}
          sx={{
            width: { xs: '100%', sm: 300 },
            height: { xs: 'auto', sm: 300 },
            aspectRatio: '1 / 1',
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
      )}
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' }, fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, lineHeight: 1.6, color: 'text.secondary' }}>
          {description}
        </Typography>
        <Typography sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' }, color: 'text.disabled' }}>
          {techStack.join(' · ')}
        </Typography>
        <Typography sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
          {projectType}
        </Typography>
        <Stack direction="row" spacing={1.5} sx={{ mt: 'auto', pt: 1 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<LaunchIcon />}
            href={detailUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ '&:active': { transform: 'scale(0.97)' } }}
          >
            Live Demo
          </Button>
          {githubUrl && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<GitHubIcon />}
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ '&:active': { transform: 'scale(0.97)' } }}
            >
              GitHub
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
