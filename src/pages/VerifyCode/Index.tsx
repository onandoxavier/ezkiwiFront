import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Box, Typography, Container, Link, CircularProgress } from '@mui/material';
import useStyles from './Styles';
import api from '../../services/api'
import logo from '../../assets/logo.svg';
import OTPInput from '../../components/OTP/Index';

const VerifyCode: React.FC = () => {  
  const { id } = useParams<{ id: string }>();
  const token = id!;
  
  const [error, setError] = useState<string[]>([]);

  const [code, setOtp] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [resendResponse, setResendResponse] = useState('');

  const navigate = useNavigate();
  const classes = useStyles();

  const handleResendCode = async () => {
    setIsLoading(true);
    setError([]);
    try {
      if (!token) {
        setError(['Solicitation not found. Go back and request the process again.']);
        return;
      }

      const response = await api.post('/api/auth/ResendCode', { token });
      const { data } = response;

      setResendResponse(data);
    } catch (err: any) {
      setIsLoading(false);  
  
      if (err.response?.data?.errors) {
        setError(prevError => [
          ...prevError,
        ]);
      }
    } finally {
      setIsLoading(false);
      setOtp('');
    }
  }

  const handleVerifyCode = async () => {
    setResendResponse('');
    setIsLoading(true);
    setError([]);
    try {
      if (!token) {
        setError(['Solicitation not found. Go back and request the process again.']);
        return;
      }
      await api.post('/api/auth/verifycode', {
        token, code
      });

      navigate(`/reset-password/${token}`);
    } catch (err: any) {
      setIsLoading(false); 
      if (err.response?.data?.errors) {
        setError(prevError => [
          ...prevError,
        ]);
      }
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
        <Box className = {classes.InformEmailContainer}
          sx = {{            
              padding: 4,
              borderRadius: 2,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>Verify code</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Enter the code sent to your email below              
          </Typography>

          {resendResponse && <Typography color='#a3d274' sx={{mb:2}} >{resendResponse}</Typography>}          
          {error.length > 0 && (
            <>
              {error.map((msg, index) => (
                <Typography key={index} color="error">
                  {msg}
                </Typography>
              ))}
            </>
          )}

          <OTPInput value={code} onChange={setOtp} length={6} />
          <Typography variant="body2" sx={{ my: 2, width:'80%' }}> 
            If you have any problems, click here to send a new code!
              <Link underline="hover" color="primary" onClick={handleResendCode} 
                  sx={{ ml: 1, cursor: 'pointer' }}>
                  Send new code!
              </Link>
          </Typography>
          <Button sx={{ my: 2 }}
            type="submit"                    
            variant="contained" 
            disabled={isLoading}
            endIcon={isLoading && <CircularProgress size={20}/>}
            onClick={handleVerifyCode}
            fullWidth>
            {isLoading ? 'Loading...' : 'Verify'}
          </Button>
        </Box>
      </Container>       
    </Box> 
  );
};

export default VerifyCode;
