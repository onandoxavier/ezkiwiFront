import React from 'react';
import { List, ListItem, ListItemText, Button, Box, Typography, useMediaQuery, useTheme, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { getClaimFromToken } from '../../utils/jwtHelper';

interface QueueListProps {
  queues: { id: string; name: string }[];
  handleDeleteQueue: (id: string) => void;
}

const QueueList: React.FC<QueueListProps> = ({ queues, handleDeleteQueue }) => {
  const subscriptionLimit = getClaimFromToken('SubscriptionLimit');
  const isSubscriptionValid = subscriptionLimit ? new Date(subscriptionLimit) > new Date() : false;
  
  const navigate = useNavigate();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <List sx={{ px: 2 }}>
      {queues.length > 0 ? (
        queues.map((queue) => (
          <ListItem
            key={queue.id}
            sx={{
              display: 'flex',
              justifyContent: isMobile ? 'space-between' : 'flex-start',
              alignItems: 'center',
              mb: 2,
              px: 10,
              backgroundColor: '#FFFFFF',
              padding: 2,
              borderRadius: 1,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              cursor: isMobile ? 'pointer' : 'default',
            }}
            onClick={isMobile ? () => navigate(`/queue/${queue.id}`) : undefined}
          >
            <ListItemText primary={queue.name} primaryTypographyProps={{ color:"#757575" }} />
            <Box>
              {!isMobile ? (
                <>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => navigate(`/queue/${queue.id}`)}
                    sx={{ mr: 2 }}
                  >
                    Access
                  </Button>                  
                  <Button
                    variant="outlined"
                    color="error"
                    disabled={!isSubscriptionValid}
                    onClick={() => handleDeleteQueue(queue.id)}
                  >
                    Delete
                  </Button>                  
                </>
              ) : (                
                <IconButton
                  color="error"
                  disabled={!isSubscriptionValid}
                  onClick={(e) => {
                    e.stopPropagation(); // Impede que o evento `onClick` do ListItem seja acionado
                    handleDeleteQueue(queue.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton> 
              )}
              </Box>
          </ListItem>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary">
          No active queues. Create your first queue above.
        </Typography>
      )}
    </List>
  );
};

export default QueueList;
