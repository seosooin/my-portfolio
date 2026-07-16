import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const CONTACT_EMAIL = 'ssooin73@gmail.com';

const INFO_ITEMS = [
  { label: 'Location', value: '광주광역시', icon: LocationOnRoundedIcon },
  { label: 'Response Time', value: '평일 9:00-18:00', icon: AccessTimeRoundedIcon },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: '#', icon: GitHubIcon },
  { label: 'LinkedIn', href: '#', icon: LinkedInIcon },
  { label: 'Instagram', href: '#', icon: InstagramIcon },
];

/**
 * ContactInfoPanel 컴포넌트
 * 이메일, 위치, 응답시간 정보와 SNS 링크(동그란 아이콘 버튼)를 카드 형태로 보여준다.
 *
 * Example usage:
 * <ContactInfoPanel />
 */
function ContactInfoPanel() {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderRadius: 3,
        p: { xs: 1, md: 2 },
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 700 }}
        >
          연락처
        </Typography>

        <Box
          component="a"
          href={`mailto:${CONTACT_EMAIL}`}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            color: 'inherit',
            textDecoration: 'none',
            p: 1.5,
            borderRadius: 2,
            bgcolor: 'background.default',
          }}
        >
          <EmailRoundedIcon sx={{ color: 'var(--color-accent)' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>Email</Box>
            <Box sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, fontWeight: 500 }}>
              {CONTACT_EMAIL}
            </Box>
          </Box>
        </Box>

        {INFO_ITEMS.map(({ label, value, icon: Icon }) => (
          <Box
            key={label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'background.default',
            }}
          >
            <Icon sx={{ color: 'var(--color-accent)' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{label}</Box>
              <Box sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, fontWeight: 500 }}>{value}</Box>
            </Box>
          </Box>
        ))}

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1 }}>Social</Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <IconButton
                key={label}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                sx={{
                  bgcolor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': { bgcolor: 'var(--color-accent)', color: 'var(--color-secondary)' },
                }}
              >
                <Icon fontSize="small" />
              </IconButton>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ContactInfoPanel;
