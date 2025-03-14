import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Modal, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { HubConnection } from '@microsoft/signalr';
import api, { ProblemDetails } from '../../services/api';
import PasswordList from './PasswordList';
import NextPasswordForm from './NextPasswordForm';
import QRCodeWithCopy from '../../components/QRCodeWithCopy';
import Header from '../../components/Header/index';
import useStyles from './Styles';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { getSignalRConnection } from "../../services/SignalR/queuehub";
import { enqueueSnackbar } from 'notistack';
import { getClaimFromToken } from '../../utils/jwtHelper';

export interface Password {
  id: number;
  value: string;
  createdAt: string;
}

const QueuePage: React.FC = () => {
  const classes = useStyles();  
  
  const { id } = useParams<{ id: string }>(); // Capturando o id da URL
  const queueId = id!;

  const [connection, setConnection] = useState<HubConnection>();
  const [passwords, setPasswords] = useState<Password[]>([]);   
  const [queueName, setQueueName] = useState<string>('');
  
  const [lastPassword, setLastPassword] = useState<number>(0);
  const [isAlphaNumeric, setIsAlphaNumeric] = useState(false);

  const subscriptionLimit = getClaimFromToken('SubscriptionLimit');
  const isSubscriptionValid = subscriptionLimit ? new Date(subscriptionLimit) > new Date() : false;
  
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const fetchLastPassword = async () => {
    try {
      const response = await api.get(`/api/queues/${queueId}/Passwords/Highest`);
      const value = response.data.value;
      var lastPassword = value ? parseInt(value) : 0; 
      setLastPassword(lastPassword);
    } catch (error) {
      console.error('Error fetching queue:', error);
    }
  };

  const handleNextPassword = async (password: string) => {
    try {
      await api.post(`/api/queues/${queueId}/passwords`, { Password: password });

      if (!isAlphaNumeric){
        if (parseInt(password) > lastPassword) {
          setLastPassword(parseInt(password));
        }        
      }

    } catch (err) {
      const problem = err as ProblemDetails;
      var erros = problem?.errors;
      erros?.map((error) => {
        enqueueSnackbar(error, { variant: 'error', anchorOrigin:{ horizontal: 'center', vertical: 'bottom' }} );
      })
    }
  };

  const handleSetMode = () => {
    setIsAlphaNumeric((prev) => !prev);    
  }

  const handleRestartQueue = async () => {
    try {
      await api.put(`/api/queues/${queueId}/passwords/restart`);
    } catch (err) {
      const problem = err as ProblemDetails;      
      var erros = problem?.errors;
      erros?.map((error) => {
        enqueueSnackbar(error, { variant: 'error', anchorOrigin:{ horizontal: 'center', vertical: 'bottom' }} );
      })
    } finally {
      enqueueSnackbar(`Queue was reseted!`, { variant: 'success', anchorOrigin:{ horizontal: 'center', vertical: 'bottom' }} );
    }
  }

  useEffect(() => {
    if (!isAlphaNumeric){
      fetchLastPassword();
    }
  }, [isAlphaNumeric]);  

  useEffect(() => {
    const fetchQueueName = async () => {
      try {
        const response = await api.get(`/api/queues/${queueId}`);
        setQueueName(response.data.name);
      } catch (error) {
        console.error('Error fetching queue:', error);
      }
    };
    
    fetchQueueName();
  }, [queueId]);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await api.get(`/api/queues/${queueId}/passwords`);        
        setPasswords(response.data);
      } catch (error) {
        console.error('Error fetching passwords:', error);
      }
    };
    fetchPasswords();
  }, [queueId]);  

  useEffect(() => {
    const setupConnection = async () => {
      const newConnection = getSignalRConnection({ queueId });
      
      newConnection.on('ReceivePassword', (password: Password) => {        
        setPasswords(prev => [password, ...prev]);
        
        if (!isAlphaNumeric){
          if (parseInt(password.value) > lastPassword) {
            setLastPassword(parseInt(password.value));
          }        
        }
      });
      newConnection.on('RemovePassword', (passwordId: number) => {
        const passwordDeleted = passwords.find((p) => p.id === passwordId);
        setPasswords(prev => prev.filter((p) => p.id !== passwordId));

        if (!passwordDeleted)
          fetchLastPassword();
        else if (!isAlphaNumeric && passwordDeleted && parseInt(passwordDeleted.value) === lastPassword)
          fetchLastPassword();        
      });
      newConnection.on('RecallPassword', (password: Password) => {
        setPasswords((prevPasswords) => {
          return [password, ...prevPasswords.filter(p => p.id !== password.id)];
        });
      });
      newConnection.on('RestartPassword', () => {
        setLastPassword(0);
        setPasswords([]);
      });

      setConnection(newConnection);
    };

    setupConnection();    

    return () => {      
      if (connection) {
        connection.off('ReceivePassword');
        connection.off('RemovePassword');
        connection.off('RecallPassword');
        connection.off('RestartPassword');
      }
    };
  }, [queueId]);  

  return (
    <>
      <Header />
      <Container className={classes.container} sx = {{ 
        margin:'0px',
        padding:'0px',
        maxWidth: '100% !important',
      }}>
        <Box className={classes.queueContainer}>
          <Box className={classes.titleContent} 
            sx={{ marginTop:'30px', mx: 2 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ marginBottom: 2 }}>
              {queueName}
            </Typography>
            {isSubscriptionValid && (
              <Button 
                variant="contained" 
                sx={{ lineHeight:'normal' }}            
                onClick={handleOpenModal}
              > 
                Restart Queue  <RestartAltIcon/>
              </Button>
            )}
          </Box>
          <PasswordList queueId={queueId} passwords={passwords} />
        </Box>
        <Box className={classes.pageContent}>
          <QRCodeWithCopy queueId={queueId} />
          <NextPasswordForm 
            onSubmit={handleNextPassword} 
            setMode={handleSetMode}
            lastPassword={lastPassword}
            isAlphaNumeric = {isAlphaNumeric}/>
        </Box>
      </Container>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="restart-queue-modal"
        aria-describedby="restart-queue-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            id="restart-queue-modal"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Are you sure you want to reset the queue? This action cannot be undone.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleRestartQueue();
                handleCloseModal();
              }}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default QueuePage;
