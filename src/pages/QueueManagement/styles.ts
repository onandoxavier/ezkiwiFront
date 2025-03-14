import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  pageManagerContainer: {
    marginTop:'70px',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow:1,
      alignItems: 'center',
      margin:'auto', 
      marginTop:'90px',
      width:'80%',
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    }
  },
  queueManagerContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  },
  queueManagerForm:{
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    backgroundColor: '#FFFFFF',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

export default useStyles;