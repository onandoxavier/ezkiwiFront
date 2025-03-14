import React from 'react';
import { Container, Box, Typography, Link  } from '@mui/material';
import { LoginForm } from './LoginForm';
import logo from '../../assets/logo.svg';
import useStyles from './styles';

const LoginPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className = {classes.container} >
      <Box className = {classes.logo}>
        <img src={logo} alt="Logo" style={{ width: '50px', marginBottom: 30 }} />          
      </Box>
      <Container maxWidth="sm">
        <Box className = {classes.loginFormContainer}
          sx = {{            
            padding: 4,
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <LoginForm />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don’t have an account?{' '}
            <Link href="/signup" underline="hover" color="primary">
              Sign up!
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
