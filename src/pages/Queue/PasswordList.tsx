import React from 'react';
import { List, ListItem, ListItemText, Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import useStyles from './Styles';
import api from '../../services/api';
import { getClaimFromToken } from '../../utils/jwtHelper';

interface Password {
  id: number;
  value: string;
  createdAt: string;
}

interface PasswordListProps {
  passwords: Password[];
  queueId: string;
}

const PasswordList: React.FC<PasswordListProps> = ({ passwords, queueId }) => {  
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const subscriptionLimit = getClaimFromToken('SubscriptionLimit');    
  const isSubscriptionValid = subscriptionLimit ? new Date(subscriptionLimit) > new Date() : false;  

  const handleRecallPassword = async (passwordId: number) => {
    await api.put(`/api/queues/${queueId}/passwords/${passwordId}`);
  };

  const handleDeletePassword = async (passwordId: number) => {
    console.log("vai deletar Pela lista:", passwordId);
    console.log(passwords);
    
    await api.delete(`/api/queues/${queueId}/passwords/${passwordId}`);
  };

  return (
    <>
      <Box className={classes.passwordListContainer} sx = {{ margin: 2 }}> {
        passwords.length > 0 ? (
          <List sx = {{ margin: 1 }}>
            {passwords.map((password) => (
              <ListItem
                key={password.id}
                secondaryAction = {                
                  <Button
                    disabled={!isSubscriptionValid}
                    onClick={() => handleDeletePassword(password.id)}
                  >
                    <DeleteForeverIcon color= { !isSubscriptionValid ? 'disabled' : 'error'} fontSize='large' />
                  </Button>
                }            
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  padding: 2,
                  borderRadius: 1,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  mb: 2,
                }}
              >
              <Button
                disabled={!isSubscriptionValid}
                onClick={() => handleRecallPassword(password.id)}
              >
                <MoveUpIcon color= { !isSubscriptionValid ? 'disabled' : 'info'} fontSize='large' />
              </Button>
              <ListItemText
                primary={`${password.value}`}
                secondary= { isMobile ?                  
                  `${new Date(password.createdAt).toLocaleTimeString()}`:
                  `Called at ${new Date(password.createdAt).toLocaleTimeString()}`}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginRight: 10, 
                  color:'black'
                }}
              />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography
            variant="h4"
            sx={{ margin: 1, textAlign: 'center', color: '#888' }}>
            No one has been called in this list yet
          </Typography>
        )}
      </Box>
    </>
  );
};

export default PasswordList;
