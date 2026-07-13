import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

function Navigation() {
  const location = useLocation();
  const currentPath = NAV_ITEMS.some((item) => item.path === location.pathname)
    ? location.pathname
    : false;

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'stretch', px: { xs: 2, md: 3 } }}>
        <Typography variant="h6" sx={{ fontWeight: 700, alignSelf: 'center' }}>
          My Portfolio
        </Typography>
        <Tabs
          value={currentPath}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ alignSelf: 'flex-end' }}
        >
          {NAV_ITEMS.map((item) => (
            <Tab
              key={item.path}
              label={item.label}
              value={item.path}
              component={Link}
              to={item.path}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
