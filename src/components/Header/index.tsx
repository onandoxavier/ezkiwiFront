import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getClaimFromToken } from '../../utils/jwtHelper'; // Função que decodifica o JWT
import { AppBar, Box, Button, Divider, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import logo from './../../assets/logo.svg'; // Importando o logo
import { useStyles } from './styles'; // Importando os estilos
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from '../../styles/themes/theme';
import { logout } from '../../services/authService';

const Header: React.FC = () => {
  const drawerWidth = 240;
  const location = useLocation(); // Verifica a página atual
  const navigate = useNavigate();
  const classes = useStyles(); 

  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  // Pega o nome do usuário logado e da empresa (caso necessário)
  const userName = getClaimFromToken('email');
  const companyName = getClaimFromToken('CompanyName');
  const subscriptionLimit = getClaimFromToken('SubscriptionLimit');
  const isSubscriptionValid = subscriptionLimit ? new Date(subscriptionLimit) > new Date() : false;
  
  // Função de logout (exemplo simples que remove o token)
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleCheckout = async () => {
    navigate('/checkout');
  }
  const handleBackToQueueManagement = () => {
    navigate('/queues');
  };

  const handleGoToProfileSettings = () => {
    navigate('/settings');
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ 
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      textAlign: 'center',
      gap: 1
    }}>
      <Box sx={{ display: 'flex', p: 2, alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '50px' }} />        
      </Box>
      {/* <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography> */}
      <Divider />
      {location.pathname.startsWith('/queue/') && (
        <Button variant="contained" onClick={handleBackToQueueManagement}
          sx = {{mx: 6, width:'80%'}}>
          Queues
        </Button>
      )}
      {location.pathname.startsWith('/settings') && (
        <Button variant="contained" onClick={handleBackToQueueManagement}
          sx = {{mx: 6, width:'80%'}}>
          Queues
        </Button>
      )}
      {location.pathname.startsWith('/queues') && (
        <Button variant="contained" onClick={handleGoToProfileSettings}
          sx = {{mx: 6, width:'80%'}}>
          Settings
        </Button>
      )}
      {!isSubscriptionValid && (      
        <Button variant="contained" color="primary" onClick={handleCheckout}
          sx = {{mx: 6, width:'80%'}}>
          Checkout
        </Button>
      )}
      <Button variant="contained" color="primary" onClick={handleLogout}
        sx = {{mx: 6, width:'80%'}}>
        Logout
      </Button>      
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar>
        <Toolbar className={classes.navBar}>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <img src={logo} alt="Logo" style={{ width: '50px' }} />        
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, visibility: { sm: 'hidden' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
            visibility: { xs: 'hidden', sm: 'visible' }
           }}>
            <Box sx={{ 
              // textAlign: 'right', 
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
              borderRadius: '6px',
              padding: '6px',
              background:theme.palette.primary.main 
            }}>                
              <Typography sx={{ 
                fontSize: '1rem', color: '#000000', fontWeight: 600,}}>
                {companyName}
              </Typography>
              <Typography sx={{ 
                fontSize: '1rem', color: '#000000', }}>
                {userName}
              </Typography>
            </Box>

            {/* Botão de Voltar para Queue Management na página de Queue */}
            {location.pathname.startsWith('/queue/') && (
              <Button variant="contained" onClick={handleBackToQueueManagement}>
                Queues
              </Button>
            )}
            {location.pathname.startsWith('/settings') && (
              <Button variant="contained" onClick={handleBackToQueueManagement}>
                Queues
              </Button>
            )}
            {location.pathname.startsWith('/queues') && (
              <Button variant="contained" onClick={handleGoToProfileSettings}>
                Settings
              </Button>
            )}
            {!isSubscriptionValid && (             
              <Button variant="contained" color="primary" onClick={handleCheckout}>
                Checkout
              </Button>
            )}
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>        
      </AppBar>
      <nav>
        <Drawer          
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>      
    </Box>
  );
};

export default Header;
