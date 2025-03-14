import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Switch } from '@mui/material';
import useStyles from './Styles';

interface NextPasswordFormProps {
  onSubmit: (password: string) => void;
  setMode: () => void;
  lastPassword: number;
  isAlphaNumeric: boolean;
}

const NextPasswordForm: React.FC<NextPasswordFormProps> = ({ onSubmit, setMode, lastPassword, isAlphaNumeric }) => {
  const classes = useStyles();
  const [nextPassword, setNextPassword] = useState('');
  const [textInputPlaceholder, setTextInputPlaceholder] = useState('Number/Name');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(nextPassword);
    setNextPassword("");
  };

  const handleNextPassword = () => {
    const newPassword = lastPassword + 1;
    onSubmit(newPassword.toString());
    setNextPassword("");
  }

  const handleModeChange = () => {    
    if (isAlphaNumeric) 
      setTextInputPlaceholder('Number');    
    else
      setTextInputPlaceholder('Number/Name');
    
    setMode();
    setNextPassword("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;    

    if (isAlphaNumeric) {
      if (/^[a-zA-Z0-9]*$/.test(value))
        setNextPassword(value);      
    } else {
      if (/^\d*$/.test(value)) 
        setNextPassword(value);      
    }
  };  

  return (
    <>
      <Box>
        <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2, mb: 2 }}>
          <Typography 
            variant="subtitle1" 
            color= "black"
            textAlign='center' 
            sx={{ opacity: isAlphaNumeric ? 0.5 : 1, transition: "opacity 0.3s" }}
          >
            Only Numbers
          </Typography>

          <Switch 
            checked={isAlphaNumeric} 
            onChange={handleModeChange} 
            sx={{
              "& .MuiSwitch-track": {
                backgroundColor: isAlphaNumeric ? "#4CAF50" : "#4CAF50", // Verde ativo, vermelho inativo
              },
              "& .MuiSwitch-thumb": {
                backgroundColor: isAlphaNumeric ? "#FFFFFF" : "#FFFFFF", // Branco ativo, amarelo inativo
              },
            }}
          />
          <Typography 
            variant="subtitle1"
            color= "black"
            textAlign='center'  
            sx={{ opacity: isAlphaNumeric ? 1 : 0.5, transition: "opacity 0.3s" }}
          >
            Letters and Numbers
          </Typography>
        </Box>

        {!isAlphaNumeric &&
          <Box className={classes.lastPasswordFormContainer}>
            <Typography variant="h6" component="h3">
              Last number called: {lastPassword}
            </Typography>
            <Button variant="contained" color="primary" 
              sx={{alignSelf: 'end', mb:4}} onClick={handleNextPassword}>
              Call Number {lastPassword + 1}
            </Button>
          </Box>
        }
      </Box>

      <Box className={classes.nextPasswordFormContainer}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" component="h3">
          Call next {textInputPlaceholder}:
        </Typography>
        <TextField
          autoFocus
          label={textInputPlaceholder}
          variant="outlined"
          fullWidth
          value={nextPassword}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" variant="contained" color="primary"
          sx={{alignSelf: 'end', mb:4}}
        >
          Call
        </Button>
      </Box>
    </>
  );
};

export default NextPasswordForm;
