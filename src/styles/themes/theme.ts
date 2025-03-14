import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#a3d274',  // Verde Principal
      contrastText: '#000',
    },
    secondary: {
      main: '#ffda88',  // Amarelo Principal
    },
    background: {
      default: '#FAFAFA',         // Cinza Claro para o fundo da página
    },
    text: {
      primary: '#757575',  // Cinza Escuro para o texto
      secondary: '#BDBDBD',  // Cinza Médio para textos secundários      
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#FAFAFA',  // Título em Cinza Escuro
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#757575',  // Título em Cinza Escuro
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 300,
      color: '#757575',  // Título em Cinza Escuro
    },
    h6: {
      color: '#757575',  // Título em Cinza Escuro
    },
    body2: {
      fontSize: '1rem',
      color: '#BDBDBD',  // Texto secundário em Cinza Médio
    },
  },
  spacing: 8, // Define o valor base de espaçamento (por padrão é 8px)
});
