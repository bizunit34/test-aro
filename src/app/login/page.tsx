'use client';

import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import UserService from '../../services/user.service';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (): Promise<void> => {
    setError(null); // Clear any previous error

    try {
      const response = await UserService.login({ email, password });
      console.log('Login successful:', response);
      // Save token in localStorage or cookie (for demonstration)
      localStorage.setItem('token', response.token);
      alert('Login Successful!');
    } catch (err) {
      console.error('Error: ', err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box sx={{ mt: 8 }}>
        <Typography variant='h4' gutterBottom>
          Login
        </Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        <Box sx={{ mt: 2 }}>
          <TextField
            label='Email'
            fullWidth
            margin='normal'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              handleLogin().catch((err: Error) => console.error(err));
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
