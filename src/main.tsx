import { createRoot } from 'react-dom/client'; // Correct import
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider  } from '@mui/material/styles'; // Use ThemeProvider from MUI
import { theme } from './styles/themes/theme'
import globalStyles from './styles/themes/globalStyles';  // Importando os estilos globais
import GlobalStyles from '@mui/material/GlobalStyles';
import { SnackbarProvider } from 'notistack';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container); // Use createRoot from 'react-dom/client'

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <GlobalStyles styles={globalStyles(theme)} />
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  // </React.StrictMode>
);