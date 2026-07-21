import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import useThumbnail from '../../hooks/useThumbnail';

/**
 * ProjectThumbnailCard 컴포넌트
 * 홈 화면 Projects 섹션에 노출되는 대표작 썸네일 카드 (클릭 시 Live Demo로 이동)
 *
 * Props:
 * @param {string} title - 프로젝트 이름 [Required]
 * @param {string} detailUrl - Live Demo 배포 링크 [Required]
 * @param {string} thumbnailUrl - 썸네일 이미지 URL [Required]
 *
 * Example usage:
 * <ProjectThumbnailCard title="..." detailUrl="..." thumbnailUrl="..." />
 */
function ProjectThumbnailCard({ title, detailUrl, thumbnailUrl }) {
  const { src, isLoading } = useThumbnail(thumbnailUrl);

  return (
    <Card
      elevation={0}
      sx={{
        border: '2px solid transparent',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          borderColor: 'var(--color-accent)',
          boxShadow: '0 0 12px var(--color-accent), 0 0 4px var(--color-accent)',
        },
      }}
    >
      <CardActionArea
        component="a"
        href={detailUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ '&:active': { transform: 'scale(0.98)' } }}
      >
        {isLoading ? (
          <Skeleton variant="rectangular" animation="wave" sx={{ width: '100%', aspectRatio: '1 / 1' }} />
        ) : (
          <Box
            component="img"
            src={src}
            alt={`${title} 썸네일`}
            sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block' }}
          />
        )}
        <Box sx={{ p: { xs: 1.5, md: 2 } }}>
          <Typography sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, fontWeight: 700, textAlign: 'center' }}>
            {title}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default ProjectThumbnailCard;
