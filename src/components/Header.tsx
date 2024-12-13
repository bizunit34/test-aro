'use client';

import { Menu as MenuIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { AppBar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { debounceTime, Subscription, tap } from 'rxjs';

import OrderServiceInstance from '@/services/order.service';

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Header: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    const cartSubscription: Subscription = OrderServiceInstance.getCart()
      .pipe(
        debounceTime(100),
        tap((cart) => {
          setCartCount(cart?.order_detail.length ?? 0);
        }),
      )
      .subscribe();

    return cartSubscription.unsubscribe();
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const navLinks = [
    { label: 'Marketing', href: '/marketing' },
    { label: 'Advertising', href: '/advertising' },
    { label: 'Contact', href: '/contact' },
    { label: 'Packaging', href: '/catalog' },
  ];

  return (
    <AppBar position='static' color='primary'>
      <Toolbar variant='dense' sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href='/' passHref>
          <Typography
            variant='h6'
            component='div'
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1154.45 330.55'
              width={100}
              style={{ marginRight: '10px' }}
            >
              <path
                fill='currentColor'
                d='m389.04 330.55-198-66.91 163.8-121.03-21.51 121.99 63.63 21.02L447.32 0 0 330.55h389.04zM728.34 14.64C708.5 4.88 683.94 0 654.66 0H511.58l-22.31 126.52h76.5l11.32-64.19h62.33c22.98 0 39.57 4.96 49.79 14.87 10.21 9.92 13.68 24.17 10.41 42.74-3.22 18.26-11.7 32.43-25.44 42.5-13.74 10.08-32.1 15.11-55.08 15.11H480.27l-26.98 153h76.5l16.24-92.08h70.36l47.51 92.08h82.16l-55.4-106.25c23.38-9.44 42.55-23.06 57.49-40.84 14.94-17.78 24.58-38.96 28.91-63.51 4.33-24.56 2.24-45.8-6.23-63.75-8.49-17.94-22.66-31.79-42.5-41.55ZM875.39 177.55c1.71-24.56 9.1-39.09 14.92-51.03 2.66-4.91 5.62-9.66 8.96-14.2 11.42-15.52 25.49-27.62 42.24-36.3 16.75-8.67 34.56-13.01 53.43-13.01s35.14 4.34 48.84 13.01c1.74 1.1 3.41 2.26 5.03 3.47l61.03-45.13a136.5 136.5 0 0 0-18.08-12.9C1067.8 7.16 1039.23 0 1006.06 0s-64.34 7.16-93.5 21.46c-29.16 14.31-53.48 34.01-72.97 59.13-11.09 14.29-19.84 29.62-26.41 45.93-9.89 20.85-12.87 51.03-12.87 51.03-2.94 26.49.19 50.63 9.41 72.41.68 1.61 1.4 3.2 2.14 4.77l65.25-48.26c-1.96-9.01-2.53-18.66-1.72-28.93ZM1154.28 126.52c-.78-14.76-3.65-28.72-8.74-41.84l-67.33 49.79c.8 9.18 1.02 25.32-4.11 43.08-4.07 14.88-10.57 28.45-19.56 40.68-11.41 15.52-25.49 27.62-42.24 36.3-16.76 8.67-34.56 13.01-53.43 13.01-17.41 0-32.61-3.7-45.61-11.08l-61.88 45.76c3.34 2.41 6.81 4.71 10.45 6.87 24.11 14.31 52.75 21.46 85.93 21.46s64.26-7.15 93.27-21.46c29-14.3 53.32-34.01 72.97-59.12 17.04-21.79 28.76-45.93 35.18-72.41 0 0 6.35-24.81 5.09-51.03Z'
              ></path>
            </svg>
          </Typography>
        </Link>

        <Box
          sx={{
            display: { xs: 'none', sm: 'none', md: 'flex' },
            gap: 2,
          }}
        >
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} passHref>
              <Typography
                component='div'
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {link.label}
              </Typography>
            </Link>
          ))}
        </Box>

        <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <StyledMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {navLinks.map((link) => (
              <MenuItem key={link.label} onClick={handleMenuClose}>
                <Link href={link.href} passHref>
                  <Typography component='div' sx={{ textDecoration: 'none', color: 'inherit' }}>
                    {link.label}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </StyledMenu>
        </Box>

        <IconButton color='inherit'>
          <Badge badgeContent={cartCount > 0 ? cartCount : null} color='secondary'>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
