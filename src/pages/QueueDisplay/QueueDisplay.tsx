import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import PasswordPanel from './PasswordPanel';
import useStyles from './Styles';
import api from '../../services/api';
import { getSignalRConnection } from '../../services/SignalR/queuehub';
import { Password } from '../Queue';

const QueueDisplay: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const queueId = id!;
  
  const [passwords, setPasswords] = useState<Password[]>([]); 
  const [connection, setConnection] = useState<signalR.HubConnection>();
  const [companyName, setCompanyName] = useState<string>('');
  const classes = useStyles();

  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const response = await api.get(`/api/queues/${queueId}`);
        setCompanyName(response.data.company);
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };
    fetchCompanyName();
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
      });
      newConnection.on('RemovePassword', (passwordId: number) => {
        setPasswords(prev => prev.filter((p) => p.id !== passwordId));
      });
      newConnection.on('RecallPassword', (password: Password) => {
        setPasswords((prevPasswords) => {
          // Retorna uma nova lista sem o item original e com ele no início
          return [password, ...prevPasswords.filter(p => p.id !== password.id)];
        });
      });
      newConnection.on('RestartPassword', () => {
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
    <Container className={[classes.container, classes.scrollbar].join(' ')} sx = {{ 
      margin:'0px',
      maxWidth: '100% !important',
    }}>
      {/* Cabeçalho com nome da empresa e QR Code */}
      <Box className={classes.header}>
        <Typography variant="h1" color='black' component="h1" className={classes.companyName}>
          {companyName}
        </Typography>        
      </Box>
      <Box className={classes.pageContent}>
        {/* Painel de senhas chamadas */}
        <PasswordPanel passwords={passwords} />
        <Box className={classes.qrCode}>
          <QRCodeSVG value={`${import.meta.env.VITE_BASE_URL}/display/${id}`} />
          <Typography variant="h4">Scan to Access</Typography>
        </Box>
      </Box>
      <Box className={classes.downQrCode}>
        <QRCodeSVG value={`${import.meta.env.VITE_BASE_URL}/display/${id}`} />
        <Typography variant="h4">Scan to Access</Typography>
      </Box>
    </Container>
  );
};

export default QueueDisplay;
