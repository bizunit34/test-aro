import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import UserService from '../../services/userService';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async (): Promise<void> => {
    setError(null); // Clear any previous error

    try {
      await UserService.signUp({ name, email, password });
      setSuccess(true);
      setTimeout(() => {
        router.push('/login').catch((err) => console.error(err)); // Redirect to login page after sign-up
      }, 2000);
    } catch (err) {
      console.error('Error: ', err);
      setError('Sign-up failed. Please try again.');
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box sx={{ mt: 8 }}>
        <Typography variant='h4' gutterBottom>
          Sign Up
        </Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        {success && (
          <Alert severity='success'>
            Sign-up successful! Redirecting to login...
          </Alert>
        )}
        <Box sx={{ mt: 2 }}>
          <TextField
            label='Name'
            fullWidth
            margin='normal'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
              handleSignUp().catch((err) => console.error(err));
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
