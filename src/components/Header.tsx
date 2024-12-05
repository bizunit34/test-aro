'use client';

import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const pages: Array<{ title: string; route: string }> = [
  {
    title: 'Packaging',
    route: '/packaging',
  },
  {
    title: 'Marketing',
    route: '/marketing',
  },
  {
    title: 'Advertising',
    route: '/advertising',
  },
  {
    title: 'Catalog',
    route: '/catalog',
  },
  {
    title: 'Contact',
    route: '/contact',
  },
];
const settings: Array<{
  title: string;
  route: string;
}> = [
  {
    title: 'Login',
    route: '/login',
  },
  {
    title: 'Sign Up',
    route: '/register',
  },
  {
    title: 'Profile',
    route: '/profile',
  },
  {
    title: 'Orders',
    route: '/orders',
  },
  {
    title: 'Logout',
    route: '/logout',
  },
];

function Header(): React.JSX.Element {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };
  const handleNavigation = (route: string): void => {
    router.push(route);
    setAnchorElNav(null);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: 'var(--background-secondary)',
        color: 'var(--foreground)',
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Link title='Home' href='/'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1154.45 330.55'
              width={150}
              style={{ marginRight: '10px' }}
            >
              <path
                fill='currentColor'
                d='m389.04 330.55-198-66.91 163.8-121.03-21.51 121.99 63.63 21.02L447.32 0 0 330.55h389.04zM728.34 14.64C708.5 4.88 683.94 0 654.66 0H511.58l-22.31 126.52h76.5l11.32-64.19h62.33c22.98 0 39.57 4.96 49.79 14.87 10.21 9.92 13.68 24.17 10.41 42.74-3.22 18.26-11.7 32.43-25.44 42.5-13.74 10.08-32.1 15.11-55.08 15.11H480.27l-26.98 153h76.5l16.24-92.08h70.36l47.51 92.08h82.16l-55.4-106.25c23.38-9.44 42.55-23.06 57.49-40.84 14.94-17.78 24.58-38.96 28.91-63.51 4.33-24.56 2.24-45.8-6.23-63.75-8.49-17.94-22.66-31.79-42.5-41.55ZM875.39 177.55c1.71-24.56 9.1-39.09 14.92-51.03 2.66-4.91 5.62-9.66 8.96-14.2 11.42-15.52 25.49-27.62 42.24-36.3 16.75-8.67 34.56-13.01 53.43-13.01s35.14 4.34 48.84 13.01c1.74 1.1 3.41 2.26 5.03 3.47l61.03-45.13a136.5 136.5 0 0 0-18.08-12.9C1067.8 7.16 1039.23 0 1006.06 0s-64.34 7.16-93.5 21.46c-29.16 14.31-53.48 34.01-72.97 59.13-11.09 14.29-19.84 29.62-26.41 45.93-9.89 20.85-12.87 51.03-12.87 51.03-2.94 26.49.19 50.63 9.41 72.41.68 1.61 1.4 3.2 2.14 4.77l65.25-48.26c-1.96-9.01-2.53-18.66-1.72-28.93ZM1154.28 126.52c-.78-14.76-3.65-28.72-8.74-41.84l-67.33 49.79c.8 9.18 1.02 25.32-4.11 43.08-4.07 14.88-10.57 28.45-19.56 40.68-11.41 15.52-25.49 27.62-42.24 36.3-16.76 8.67-34.56 13.01-53.43 13.01-17.41 0-32.61-3.7-45.61-11.08l-61.88 45.76c3.34 2.41 6.81 4.71 10.45 6.87 24.11 14.31 52.75 21.46 85.93 21.46s64.26-7.15 93.27-21.46c29-14.3 53.32-34.01 72.97-59.12 17.04-21.79 28.76-45.93 35.18-72.41 0 0 6.35-24.81 5.09-51.03Z'
              ></path>
            </svg>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => handleNavigation(page.route)}
                >
                  <Typography sx={{ textAlign: 'center' }}>
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => handleNavigation(page.route)}
                sx={{ my: 2, color: 'var(--foreground)', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {/* Add 'Login options' */}
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='L' src='/globe.svg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.route}
                  onClick={() => handleNavigation(setting.route)}
                >
                  <Typography sx={{ textAlign: 'center' }}>
                    {setting.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
