import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import QueueManager from './QueueManager';
import QueueList from './QueueList';
import api, { ProblemDetails } from '../../services/api'
import Header from '../../components/Header/index';
import { enqueueSnackbar } from 'notistack';
import useStyles from './styles';

interface Queue {
    id: string;
    name: string;
}

const QueueManagement: React.FC = () => {
  const [queues, setQueues] = useState<Queue[]>([]); 
  
  const classes = useStyles();

  const fetchQueues = async () => {
    try {
      const response = await api.get('/api/queues');
      setQueues(response.data);      
    } catch (error) {
        console.error(error);
    }
  };

  // Função para criar uma nova fila
  const handleCreateQueue = async (queueName: string) =>{ 
    try {
      if (queueName.trim() !== '') {
        await api.post('/api/queues', { name: queueName });
        fetchQueues();      
      }
    } catch (err) {
      const problem = err as ProblemDetails;      
      var erros = problem?.errors;
      erros?.map((error) => {
        enqueueSnackbar(error, { variant: 'error', anchorOrigin:{ horizontal: 'center', vertical: 'bottom' }} );
      })
    } finally{
        enqueueSnackbar(`${queueName} was Created!`, { variant: 'success', anchorOrigin:{ horizontal: 'center', vertical: 'bottom' }} );
        fetchQueues();
    }
  };

  const handleDeleteQueue = async (id: string) => {
    
    const queue = queues.find((o) => { return o.id === id});    
    const queueName = queue?.name;

    try {
      await api.delete(`/api/queues/${id}`);
      
    } catch (err) {
      const problem = err as ProblemDetails;      
      var erros = problem?.errors;
      erros?.map((error) => {
        enqueueSnackbar(error, { variant: 'error', anchorOrigin:{ horizontal: 'center', vertical: 'bottom' }} );
      })
    } finally{
        enqueueSnackbar(`${queueName} was deleted!`, { variant: 'success', anchorOrigin:{ horizontal: 'center', vertical: 'bottom' }} );
        fetchQueues();
    }
  };

  useEffect(() => { fetchQueues(); }, []);

  return (
    <>
      <Header />
      <Box className={classes.pageManagerContainer} sx={{ padding: 4, borderRadius: 2 }}>
        <Container maxWidth="md">      
          <QueueManager 
            handleCreateQueue={handleCreateQueue}
            queueCount={queues.length}
          />
          <QueueList queues={queues} handleDeleteQueue={handleDeleteQueue} />
        </Container>
      </Box>
    </>
  );
};

export default QueueManagement;
