import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  //display
  container: {
    display: 'flex',
    flexDirection: 'row' as const,
    padding: theme.spacing(2),    
    minHeight: '100vh', // Altura mínima para ocupar a tela toda
    [theme.breakpoints.down('sm')]: {      
      alignItems: 'center',
      overflow: 'scroll',
      flexDirection: 'column' as const,
    },
  },
  queueContainer:{
    marginTop:'70px',
    width:'100%',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow:1,
      alignItems: 'center',
      margin:'auto', 
      marginTop: '90px',
      borderRadius: 6,      
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    }
  },
  titleContent: {
    display: 'flex',
    flexDirection:'column' as const,
    alignItems: 'center',
    justifyContent:'center'    
  },
  pageContent:{
    display:'flex',
    flexDirection:'column' as const,
    marginTop: '90px',
    margin: '20px',    
    width:'75%',
    gap: 5,
    [theme.breakpoints.down('sm')]: {
      flexDirection:'column-reverse' as const,
      marginTop: '0px',
    },
  }, 
  lastPasswordFormContainer:{
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,    
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column' as const,           
      width: '100%',
    },
  }, 
  passwordListContainer:{
    height: '65vh', // Altura máxima para a lista de senhas com scroll
    overflowY: 'scroll',
    flexGrow: 1,
    margin: 2,
    width:'90%',
    [theme.breakpoints.down('sm')]: {
      width:'auto',
      height: 'auto',
      flexGrow: 0,
      maxHeight: '40vh'
    },
  },
  nextPasswordFormContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,    
    
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

export default useStyles;
