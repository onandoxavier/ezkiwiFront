import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100vh',
    backgroundColor: 'background.default',  // Aplicando o fundo cinza claro
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    display: 'flex', 
    alignItems: 'center'
  },
  loginFormContainer: {
    backgroundColor: '#FFFFFF',  // Caixa branca
    padding: 4,
    borderRadius: 2,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 2,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: theme.spacing(2),
  },
}));

export default useStyles;