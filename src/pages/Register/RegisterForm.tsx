import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import api from '../../services/api'; // Adjust the import path if necessary
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const RegisterForm: React.FC = () => {

  const navigate = useNavigate();

  // State variables for form inputs
  const [name, setName] = useState('')
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State variables for feedback messages and loading state
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessage] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [errorEmail, setErrorEmail] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Reset messages
    setErrorMessage([]);
    setSuccessMessage('');
    setErrorEmail(false);

    // Basic validation
    if (!name || !company || !email || !password || !confirmPassword) {
      setErrorMessage((prevMessages) => [...prevMessages, 'Please fill in all fields.']);
      return;
    }
  
    if (password !== confirmPassword) {      
      setErrorMessage((prevMessages) => [...prevMessages, 'Passwords do not match.']);
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage((prevMessages) => [...prevMessages, 'Invalid email address']);
      setErrorEmail(true);
      return;
    } 
    else{
      setErrorEmail(false)
    }
  
      setIsLoading(true);

      try {
        // API call to register the company
        const response = await api.post('/api/auth/register', {
          name: name,
          companyName: company,
          email: email,
          password: password,
        });
  
        setSuccessMessage('Registration successful! Redirecting to queue management...');
        // Redirect to login page after a short delay
        const { token, refreshToken, queueId } = response.data;
        // Store the token
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        setTimeout(() => {
          navigate('/queue/' + queueId);
        }, 2000);
      } catch (error: any) {
        console.log(error);
        // Handle errors from the API
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage((prevMessages) => [...prevMessages, 'An error occurred during registration.']);
        }
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 2,
      }}
    >
      {errorMessages.length > 0 && (
        <Box sx={{ mb: 2 }}>
          {errorMessages.map((message, index) => (
            <Typography key={index} color="error" variant="body2" gutterBottom>
              {message}
            </Typography>
          ))}
        </Box>
      )}
      {successMessage && (
        <Typography color="primary" variant="body2" gutterBottom>
          {successMessage}
        </Typography>
      )}
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Company"
        variant="outlined"
        fullWidth
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errorEmail} // Mostra o estilo de erro
        required
      />
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
      <FormControl variant="outlined">
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </Box>
  );
};
