import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
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
    InformEmailContainer:{
        backgroundColor: '#FFFFFF',  // Caixa branca
        padding: 4,
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

export default useStyles;