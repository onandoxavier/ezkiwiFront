import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

// Defina os estilos isolados para o componente Header
export const useStyles = makeStyles((theme: Theme) => ({
  navBar:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    background: '#0e981d',
    height: '70px' // Defina a altura do cabeçalho
  },
  companyName: {    
    fontSize: '2rem',
    color: '#fff',
    fontWeight: 700,
  },
  userName: {
    fontSize: '1rem',
    color: theme.palette.background.default,
  },
  headerContainer: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '70px',
    
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid #ccc',
  }
}));

