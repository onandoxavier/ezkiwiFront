import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import useStyles from './styles';
import { getClaimFromToken } from '../../utils/jwtHelper';

interface QueueManagerProps {
  handleCreateQueue: (queueName: string) => void;
  queueCount: number;
}

const QueueManager: React.FC<QueueManagerProps> = ({handleCreateQueue, queueCount }) => {
    const [queueName, setQueueName] = useState('');
    const subscriptionLimit = getClaimFromToken('SubscriptionLimit');    
    const isSubscriptionValid = subscriptionLimit ? new Date(subscriptionLimit) > new Date() : false;
    
    const classes = useStyles();

    const handleName = (value: string)=>{
        setQueueName(value); // Limpa o input após criar a fila
    };

    const handleCreate = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleCreateQueue(queueName);
        setQueueName('')
    }

  return (
    <>      
      {/* Cabeçalho com título e contador de filas ativas */}
      <Box className={classes.queueManagerContainer}
        sx = {{ pt: 2, mb: 3, px: 10 }}> {/* Margem à esquerda e à direita */}
        <Typography variant="h4" component="h1">
          Queue Management
        </Typography>
        <Typography variant="h6">
          Active Queues: {queueCount}
        </Typography>
      </Box>

      {/* Formulário de criação de fila */}
      <Box className={classes.queueManagerForm}
        component="form"
        sx = {{ gap: 2,
          mb: 4,  // Espaçamento inferior do formulário em relação à lista
          px: 10,  // Margem à esquerda e à direita
        }}
        onSubmit={(e) => {handleCreate(e)}}
      >
        <TextField
          label="Queue Name"
          variant="outlined"
          fullWidth
          value={queueName}
          onChange={(e) => handleName(e.target.value)}
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isSubscriptionValid && queueCount >= 3}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Create Queue
        </Button>        
      </Box>
      {!isSubscriptionValid && (
        queueCount >= 3 ? (
          <Typography
            variant="h3"
            component="h2"
            sx={{ textAlign: 'center', color: 'red', fontSize: '1rem' }}
          >
            Subscribe to the paid plan to be able to create more queues!
          </Typography>
        ) : (
          <Typography
            variant="h3"
            component="h2"
            sx={{ textAlign: 'center', color: 'blue', fontSize: '1rem' }}
          >
            You are close to the queue limit 3 queues free! Consider subscribing to the paid plan.
          </Typography>
        )
      )}
    </>
  );
};

export default QueueManager;
