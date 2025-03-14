import { Theme } from '@mui/material/styles';

export const registerStyles = (theme: Theme) => ({
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
