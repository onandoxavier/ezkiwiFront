import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Dialog, DialogActions, 
    DialogContent, DialogTitle, FormControl, FormHelperText, 
    IconButton, InputAdornment, InputLabel, OutlinedInput, Typography 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Header from "../../components/Header";
import useStyles from './Styles';
import api, { ProblemDetails } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { logout } from "../../services/authService";
import { getClaimFromToken } from "../../utils/jwtHelper";

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const SettingsPage: React.FC = () => {
    const [userEmail, setUserEmail] = useState<string>("");    
    const [isSubscriptionValid, setIsSubscriptionValid] = useState<boolean>(false);
        
    const [openResetPassword, setOpenResetPassword] = useState<boolean>(false);

    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');    
    
    const [currentEmail, setCurrentEmail] = useState('');
    const [email, setEmail] = useState('');    
    const [errorEmail, setErrorEmail] = useState('');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const [openModal, setOpenModal] = useState(false);
    
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);

    const [showNewPassword, setShowNewPassword] = useState(false);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleOpenModal = () => {
        setOpenModal(true);
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const classes = useStyles();

    useEffect(() => {
        const getEmail = getClaimFromToken('email');
        const limit = getClaimFromToken("SubscriptionLimit");
        
        console.log("subscriptionLimit carregado:", limit);
        
        getEmail && setUserEmail(getEmail);
        limit && setIsSubscriptionValid(new Date(limit) > new Date());        
    }, []);

    useEffect(() => {
        const fetchCompanyInfos = async () => {
            try {
                const response = await api.get(`/api/company/`);
                var result = response.data;

                setName(result.name);
                setEmail(result.email);
                setCurrentEmail(result.email);
                setCompanyName(result.companyName);
                
            } catch (error) {
                console.error('Error fetching company:', error);
            }
        };
        fetchCompanyInfos();
    }, []);
   
    const handleSubscription = async () => {
        // Codifica o e-mail antes de adicioná-lo ao link
        const encodedEmail = encodeURIComponent(userEmail!);
        const stripeUrl = ``;

        // Abre o link em uma nova aba
        window.open(stripeUrl, '_blank', 'noopener,noreferrer');
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setName(newValue);    
    };

    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setCompanyName(newValue);    
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setEmail(newValue);
    
        if (!isValidEmail(newValue)) {
          setErrorEmail('Invalid email address');
        } else {
          setErrorEmail('');
        }
    };
    
    const handleResetPassword = () => {
        setOpenResetPassword(true);
    };
    
    const handleCloseResetPassword = () => {
        setOpenResetPassword(false);
    };
    
    const handleResetPasswordSubmit = async () => {
        setIsLoading(true);
        try {
            setError('');
      
            if (!newPassword || !confirmPassword) {
                setError('Fill all fields!');
                return;
            }
      
            if (newPassword !== confirmPassword) {
                setError('The passwords must be the same!');
                return;
            }
                  
            await api.put('/api/auth/UpdatePassword', { currentPassword, newPassword });
            
            enqueueSnackbar(`Password was reseted!`, { variant: 'success', anchorOrigin:{ horizontal: 'center', vertical: 'bottom' }} );
            await logout();

            navigate('/');
        } catch (err) {
            const problem = err as ProblemDetails;      

            console.log(problem);
            var erros = problem?.errors;
            erros?.map((error) => {
                enqueueSnackbar(error, { variant: 'error', anchorOrigin:{ horizontal: 'center', vertical: 'bottom' }} );
            })
        } finally {
            setIsLoading(false);
            setOpenResetPassword(false);            
        }
    };

    const handleSubmit = async () => {
        if (currentEmail !== email) {        
            handleOpenModal();
        } else {        
            await handleUpdateCompany();
        }
    };

    const handleUpdateCompany = async () => {
        try {
            setIsLoading(true);
            setError('');
        
            await api.put('/api/company/', {
                name,
                email,
                companyName,
            });
                
            if (currentEmail !== email) {            
                localStorage.removeItem('token');
                navigate('/login');
            }    
        } catch (err) {
            const problem = err as ProblemDetails;      
            var erros = problem?.errors;
            erros?.map((error) => {
                enqueueSnackbar(error, { variant: 'error', anchorOrigin:{ horizontal: 'center', vertical: 'bottom' }} );
            })
        } finally {
            setIsLoading(false);
        }
    };
    // Se o usuário confirmar no modal
    const handleConfirmEmailChange = async () => {
        setOpenModal(false);
        await handleUpdateCompany();
    };

    return (
        <>
            <Header/>
            <Box className={classes.settingContainer} sx={{ padding: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                    Profile
                </Typography>
                <Box component="form" onSubmit={handleSubmit} 
                    className={classes.settingFormContainer}>
                    <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }} >
                        <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-name"
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }} >
                        <InputLabel htmlFor="outlined-adornment-company">Company</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-name"
                            label="Company"
                            fullWidth
                            value={companyName}
                            onChange={handleCompanyChange}
                            required
                        />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth sx={{ position: 'relative', marginBottom: 2 }} disabled
                        error={Boolean(errorEmail)} // indica se o FormControl está em estado de erros                        
                    >
                        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        {errorEmail && <FormHelperText>{errorEmail}</FormHelperText>}
                    </FormControl>
                </Box>                

                {/* Botões de ação */}
                <Box className={classes.actionButtonsContainer} sx={{ mt: 2 }}>
                    <Button variant="outlined" onClick={handleResetPassword}>
                        Reset Password
                    </Button>
                    {isSubscriptionValid && (
                        <Button variant="contained" color="primary" onClick={handleSubscription}>
                            Manage Subscription
                        </Button>
                    )}
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>

            {/* Modal de confirmação */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Warning</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">                        
                        You have changed your email. Once complete, you will need to log in again.  
                        Do you want to continue?
                    </Typography>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseModal} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmEmailChange} color="primary" autoFocus>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de Reset Password */}
            <Dialog open={openResetPassword} onClose={handleCloseResetPassword} fullWidth={true}>                
                <DialogTitle sx={{textAlign:'center'}}>Reset Password</DialogTitle>
                <DialogContent>
                    <Box sx={{
                        display: 'flex',
                        flexDirection:'column',
                        width: '100%',                        
                        gap: 2,
                        mt: 1
                    }}>
                        {error && <Typography color="error">{error}</Typography>}
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-current-password">Current Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-current-password"
                                type={showCurrentPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showCurrentPassword ? 'hide the current password' : 'display the current password'
                                            }
                                            onClick={handleClickShowCurrentPassword}
                                            edge="end"
                                        >
                                            {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Current Password"          
                                fullWidth
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-new-password">New Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-new-password"
                                type={showNewPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showNewPassword ? 'hide the new password' : 'display the new password'
                                            }
                                            onClick={handleClickShowNewPassword}
                                            edge="end"
                                        >
                                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"          
                                fullWidth
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirm-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showConfirmPassword ? 'hide the confirm password' : 'display the confirm password'
                                            }
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"          
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </FormControl>                            
                    </Box>
                </DialogContent>
                <DialogActions sx={{display:'flex', gap:2, mb:2, mx:2}}>
                    <Button variant="outlined" onClick={handleCloseResetPassword}>Cancel</Button>
                    <Button variant="contained" onClick={handleResetPasswordSubmit}
                        type="submit"                        
                        disabled={isLoading}
                        endIcon={isLoading && <CircularProgress size={20}/>}                        >
                        {isLoading ? 'Loading...' : 'Submit'}
                    </Button>
                </DialogActions>                
            </Dialog>            
        </>
    )
}

export default SettingsPage;