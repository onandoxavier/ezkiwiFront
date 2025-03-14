import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Box, Typography, Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import useStyles from './Styles';
import api from '../../services/api'
import logo from '../../assets/logo.svg';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ResetPassword: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Capturando o id da URL
  const token = id!;

  const [isLoading, setIsLoading] = useState(false)

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const navigate = useNavigate();
  const classes = useStyles();
  
  const handleResetPassword = async () => {
    setIsLoading(true);

    try {
      setError('');

      if (!newPassword || !confirmPassword) {
        setError('Preencha todos os campos');
        return;
      }

      if (newPassword !== confirmPassword) {
        setError('As senhas não conferem');
        return;
      }
      
      console.log("valroes")
      console.log(newPassword);
      console.log(confirmPassword);

      await api.post('/api/auth/ConfirmReset', { token, newPassword, confirmPassword });

      // Se deu certo, redireciona para a tela de login
      navigate('/');
    } catch (err: any) {
      setError('Ocorreu um erro ao redefinir a senha.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className = {classes.container}>
      <Box className = {classes.logo}>
        <img src={logo} alt="Logo" style={{ width: '50px', marginBottom: 30 }} />          
      </Box>
      <Container maxWidth="sm">
        <Box className = {classes.resetPasswordContainer}
          sx = {{            
              padding: 4,
              borderRadius: 2,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>Reset Your Password</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Enter a new password bellow to change your password
          </Typography>
          {error && <Typography color="error">{error}</Typography>}

          <FormControl variant="outlined" sx={{width: '100%'}}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"          
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </FormControl>
          <FormControl variant="outlined" sx={{width: '100%'}}>
            <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showConfirmPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"          
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button sx={{ my: 2 }}
            type="submit"                    
            variant="contained" 
            disabled={isLoading}
            endIcon={isLoading && <CircularProgress size={20}/>}
            onClick={handleResetPassword}
            fullWidth>
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </Box>
      </Container>  
    </Box>
  );
};

export default ResetPassword;
