import { Button, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import api from './../../services/api';
import { refresh } from './../../services/authService';
import {
  Navigate,
  useNavigate
} from "react-router-dom";

const Return: React.FC =() => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const [needRefresh, setNeedRefresh] = useState(false);

    const navigate = useNavigate();

    const handleStartClick = () => {
      navigate('/queues'); // Redireciona para a rota "/queues"
    };
  
    useEffect(() => {
      const fetchSessionStatus = async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');
        
        try {
          const response = await api.get(`/api/Checkout/session-status?session_id=${sessionId}`);
          const data = response.data;
          
          setStatus(data.status);
          setCustomerEmail(data.customer_email);
          setNeedRefresh(data.forceRefresh);
        } catch (error) {
          console.error('Erro ao buscar a sessão:', error);
        }
      };
    
      fetchSessionStatus();
    }, []);
  
    if (status === 'open') {
      return (
        <Navigate to="/checkout" />
      )
    }
  
    if (status === 'complete') {

      if (needRefresh) refresh();      
      
      return (<Container
        maxWidth="sm"
        style={{
          textAlign: 'center',
          marginTop: '2rem',
          padding: '2rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Thank You!
        </Typography>
        <Typography variant="body2" gutterBottom>
          We appreciate your business! A confirmation email will be sent to <strong>{customerEmail}</strong>{" "}
          If you have any questions, please email{" "}
          <strong>support@ezkiwi.app</strong>.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '2rem' }}
          onClick={handleStartClick}
        >
          Let's Start
        </Button>
      </Container>)      
    }
  
    return null;
}
  
export default Return;