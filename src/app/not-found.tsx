import React from 'react';
import { Container, Typography } from '@mui/material';
import Image from 'next/image';

const NotFound: React.FC = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      {/* Image */}
      <Image 
        src="/404-robot.jpg" 
        alt="404 Illustration" 
        width={500} 
        height={300}
      />
      
      {/* 404 Text */}
      <Typography variant="h1" color="primary" sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
        404
      </Typography>
      
      {/* Subtext */}
      <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
    </Container>
  );
};

export default NotFound;
