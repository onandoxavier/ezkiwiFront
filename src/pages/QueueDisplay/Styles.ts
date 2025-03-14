import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  //display
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: theme.spacing(2),    
    minHeight: '100vh', // Altura mínima para ocupar a tela toda
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  //display
  header: {
    display: 'flex',    
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column' as const,
      textAlign: 'center' as const,
    },
  },
  pageContent:{
    display: 'flex',
    flexDirection:'row' as const,
    alignItems: 'center',
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {      
      width: '100%',
      Height: '10vh', 
    },
  },
  //display
  companyName: {
    fontSize: '2rem',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      textAlign: 'center' as const,
    },
  },
  passwordPanel: {
    display: 'flex',
    width: '60%',
    // justifyContent: 'space-between',
    flexGrow: 1, // Ocupa o espaço disponível
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse' as const, // Senhas mais recentes no topo no celular
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column' as const,
    flexWrap: 'wrap',
    height: '70vh',
    flex: 1,
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {      
      flexWrap: 'nowrap',      
      height: '100vh',      
    },
  },
  passwordItem: {
    backgroundColor: theme.palette.background.default,    
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    minWidth: '49%',
    justifyContent: 'space-between',        
  },
  passwordText:{
    color: theme.palette.primary.contrastText,
    fontSize: '1.25rem !important' ,
    [theme.breakpoints.up('md')]: {
      fontSize: '3rem !important', // Aumenta o tamanho da fonte para telas grandes (TVs)
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '2rem !important', // Tamanho menor em celular, mas ainda visível
    },
  },
  passwordTime:{
    color: theme.palette.primary.contrastText,
    fontSize: '1rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem', // Aumenta o tamanho da fonte para telas grandes (
    }
  },
  //display
  qrCode: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',    
    [theme.breakpoints.down('sm')]: {
      display: 'none', // Oculta o QR Code em telas pequenas
    },
  },
  downQrCode: {
    marginTop: theme.spacing(2),
    gap: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    visibility: 'hidden',
    [theme.breakpoints.down('sm')]: {
      visibility: 'visible', // Oculta o QR Code em telas pequenas
    },
  },
  // Estilo para esconder a barra de rolagem
  scrollbar: {    
    '&::-webkit-scrollbar': {
      width: '0', // Remove a barra de rolagem em navegadores Webkit
      height: '0',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'transparent', // Mantém a barra invisível
    },
    scrollbarWidth: 'none', // Remove a barra de rolagem no Firefox
    msOverflowStyle: 'none', // Remove a barra de rolagem no IE e Edge
  },
}));

export default useStyles;
