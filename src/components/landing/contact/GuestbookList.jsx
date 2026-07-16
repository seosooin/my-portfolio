import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * GuestbookList 컴포넌트
 * 등록된 방명록을 최신순으로 나열하고, 더 볼 항목이 있으면 더보기 버튼을 표시한다.
 *
 * Props:
 * @param {Array} entries - 방명록 항목 배열 { id, name, message, created_at } [Required]
 * @param {boolean} hasMore - 더 불러올 항목이 있는지 여부 [Required]
 * @param {boolean} isLoading - 로딩 중 여부 [Optional, 기본값: false]
 * @param {function} onLoadMore - 더보기 버튼 클릭 시 실행할 함수 [Required]
 *
 * Example usage:
 * <GuestbookList entries={entries} hasMore={hasMore} isLoading={loading} onLoadMore={loadMore} />
 */
function GuestbookList({ entries, hasMore, isLoading = false, onLoadMore }) {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderRadius: 3,
        p: { xs: 1, md: 2 },
      }}
    >
      <Box sx={{ p: { xs: 1, md: 1 } }}>
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 700, mb: 2 }}
        >
          방명록
        </Typography>

        {entries.length === 0 && !isLoading && (
          <Box sx={{ fontSize: '0.95rem', color: 'text.secondary', textAlign: 'center', py: 3 }}>
            아직 등록된 방명록이 없습니다. 첫 방명록을 남겨보세요!
          </Box>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {entries.map((entry) => (
            <Box
              key={entry.id}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Box sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{entry.name}</Box>
                <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                  {new Date(entry.created_at).toLocaleDateString('ko-KR')}
                </Box>
              </Box>
              <Box sx={{ fontSize: '0.9rem', color: 'text.secondary', lineHeight: 1.6 }}>
                {entry.message}
              </Box>
            </Box>
          ))}
        </Box>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {hasMore && !isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="outlined" onClick={onLoadMore}>
              더보기
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
}

export default GuestbookList;
