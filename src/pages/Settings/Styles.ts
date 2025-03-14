import { makeStyles } from '@mui/styles';
import { theme } from '../../styles/themes/theme';

const useStyles = makeStyles(() => ({
    settingContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow:1,
        alignItems: 'center',
        margin:'auto',        
        marginTop:'90px',  
        maxWidth: '600px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    settingFormContainer:{
        width:'100%',
        flexGrow: 1,
    },
    actionButtonsContainer:{
        display:"flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width:'100%',
        gap:'1rem',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
            textAlign: 'center',
        },
    }
}));

export default useStyles;