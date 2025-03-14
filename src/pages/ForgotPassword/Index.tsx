import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Link, CircularProgress } from '@mui/material';
import useStyles from './Styles';
import api from '../../services/api'
import logo from '../../assets/logo.svg';

const ForgotPassword: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRecoverPassword = async () => {
    setIsLoading(true);
    setError([]);
    
    try {
      const response = await api.post('/api/auth/forgotPassword', { email });
      const { token } = response.data;
      // Redireciona para tela de verificação do código
      navigate(`/verify-code/${token}`);
    } catch (err: any) {
        setIsLoading(false);
        
        // Adiciona erros adicionais, se existirem
        if (err.response?.data?.errors) {
          // Adiciona cada erro específico que vem da resposta da API ao array de erros
          setError(prevError => [
            ...prevError,
            ...err.response.data.errors // Presume que "errors" é um array de strings
          ]);
        }
        console.log(err);
    } finally {
        setIsLoading(false); // Desativa o estado de loading
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
                <Typography variant="h4" sx={{ mb: 2 }}>Forgot password?</Typography>
                <Typography variant="body2">
                    Remember your password?
                    <Link href="/login" underline="hover" color="primary"
                        sx={{ ml: 1 }}>
                        Login Here!
                    </Link>
                </Typography>

                {error.length > 0 && (
                <>
                    {error.map((msg, index) => (
                    <Typography key={index} color="error">
                        {msg}
                    </Typography>
                    ))}
                </>
                )}
                
                <TextField sx={{ 
                    my: 2,
                    width: '100%' 
                }}
                    label="E-mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button sx={{ my: 2 }}
                    type="submit"                    
                    variant="contained" 
                    disabled={isLoading}
                    endIcon={isLoading && <CircularProgress size={20}/>}
                    onClick={handleRecoverPassword}
                    fullWidth>
                    {isLoading ? 'Loading...' : 'Submit'}
                </Button>
            </Box>
        </Container>       
    </Box>    
  );
};

export default ForgotPassword;
