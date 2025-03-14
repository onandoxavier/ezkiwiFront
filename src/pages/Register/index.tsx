import React from 'react';
import { Container, Box, Typography, Link } from '@mui/material';
import { RegisterForm } from './RegisterForm';
import logo from '../../assets/logo.svg'; // Importando o logo

const RegisterPage: React.FC = () => {
  return (
    <Box //sx={registerStyles(theme).formContainer}>
      sx={{
        height: '100vh',
        backgroundColor: 'background.default',  // Fundo cinza claro do tema
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '50px', marginBottom: 30 }} />          
      </Box>
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: '#FFFFFF',  // Caixa branca
            padding: 4,
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Create your account
          </Typography>
          <RegisterForm />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link href="/login" underline="hover" color="primary">
              Log in!
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
