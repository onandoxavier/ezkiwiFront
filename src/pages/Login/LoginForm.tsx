import React, { useState } from 'react';
import { Box, Button, Link, FormControl, OutlinedInput, InputAdornment, InputLabel, IconButton, FormHelperText } from '@mui/material';
import ErrorModal from './ErrorModal';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import CircularProgress from '@mui/material/CircularProgress';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../../services/authService';
import { enqueueSnackbar } from 'notistack';
import { ProblemDetails } from '../../services/api';

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorEmail, setErrorEmail] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setErrorEmail('Invalid email address');
      return;
    } else {
      setErrorEmail('');
    }

    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/queues');
    } catch (err) {
      const problem = err as ProblemDetails;      
      var erros = problem?.errors;
      erros?.map((error) => {
        enqueueSnackbar(error, { variant: 'error', anchorOrigin:{ horizontal: 'center', vertical: 'bottom' }} );
      })
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);  // Fecha a modal
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className={classes.loginForm}
        sx = {{ gap: 2 }}
      >
        <FormControl variant="outlined" error={Boolean(errorEmail)}>
          <InputLabel htmlFor="outlined-adornment-weight">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            label="Email"            
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
           {errorEmail && <FormHelperText>{errorEmail}</FormHelperText>}
        </FormControl>
        <FormControl variant="outlined">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Link href="/forgot-password" underline="hover" color="primary">
            Forgot Password?
          </Link>
        </Box>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          disabled={isLoading}
          endIcon={isLoading && <CircularProgress size={20}/>}
          fullWidth>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </Box>
      <ErrorModal open={openErrorModal} onClose={handleCloseErrorModal} />
    </>
  );
};