import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import useStyles from './Styles';
import { Password } from '../Queue';

interface PasswordPanelProps {
  passwords: Password[];
}

const PasswordPanel: React.FC<PasswordPanelProps> = ({ passwords }) => {
  const classes = useStyles();
  const [displayedPasswords, setDisplayedPasswords] = useState<Password[]>([]);

  useEffect(() => {
    const calculateVisiblePasswords = () => {
      let maxPasswords = 20;
      if (window.innerWidth < 2100)
        maxPasswords = 14;
      if (window.innerWidth < 2000)
        maxPasswords = 12;
      if (window.innerWidth < 1300)
        maxPasswords = 8;

      // Defina os primeiros 'maxPasswords' elementos da lista
      setDisplayedPasswords(passwords.slice(0, maxPasswords));
    };

    // Recalcular sempre que a janela for redimensionada
    window.addEventListener('resize', calculateVisiblePasswords);

    // Calcular ao montar o componente
    calculateVisiblePasswords();

    // Limpar o eventListener ao desmontar o componente
    return () => {
      window.removeEventListener('resize', calculateVisiblePasswords);
    };
  }, [passwords]);

  return (
    <Box className={classes.passwordPanel}>
      <Box className={`${classes.column} ${classes.scrollbar}`}>
        {
          displayedPasswords.length > 0 ? ( 
            displayedPasswords.map((password) => (
              <Box key={password.id} className={classes.passwordItem}>
                <Typography className={`${classes.passwordText}`}> {password.value}</Typography>
                <Typography className={`${classes.passwordTime}`}>{new Date(password.createdAt).toLocaleTimeString()}</Typography>
              </Box>
            )
          )) : (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h4" color="textSecondary">
                The next one will be call soon.
              </Typography>
            </Box>
          )
        }
      </Box>
    </Box>
  );
};

export default PasswordPanel;
