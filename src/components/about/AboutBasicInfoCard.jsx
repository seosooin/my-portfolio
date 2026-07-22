import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

/**
 * AboutBasicInfoCard 컴포넌트
 *
 * Props:
 * @param {object} basicInfo - 기본 정보 객체 (name, education, major, experience, photo) [Required]
 *
 * Example usage:
 * <AboutBasicInfoCard basicInfo={aboutMeData.basicInfo} />
 */
function AboutBasicInfoCard({ basicInfo }) {
  const { name, education, major, experience, photo } = basicInfo;

  const infoItems = [
    { label: '학력', value: education },
    { label: '전공', value: major },
    { label: '경력', value: experience },
  ];

  return (
    <Card elevation={0} sx={{ bgcolor: 'background.paper', p: { xs: 2, md: 4 } }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 2, md: 4 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Avatar
          src={photo}
          alt={name}
          sx={{ width: { xs: 120, md: 160 }, height: { xs: 120, md: 160 } }}
        />
        <Box>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 1.5 }}
          >
            {name}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {infoItems.map((item) => (
              <Typography
                key={item.label}
                component="div"
                sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'text.secondary' }}
              >
                {item.label}: {item.value}
              </Typography>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AboutBasicInfoCard;
