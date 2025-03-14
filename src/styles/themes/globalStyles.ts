// src/theme/globalStyles.ts

import { Theme } from '@mui/material/styles';

const globalStyles = (theme: Theme) => ({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  ':focus': {
    outline: 0,
    // boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
  },
  body: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.secondary.main,
    fontFamily: theme.typography.fontFamily,
    WebkitFontSmoothing: 'antialiased',
  },
  'body, input, textarea, button': {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    fontSize: '1rem',
  },
  '.bodyDisplay':{
    overflow: 'hidden', /* Exemplo de alteração */
    [theme.breakpoints.down('sm')]: {
      overflow: 'scroll'
    },
  }
});

export default globalStyles;
