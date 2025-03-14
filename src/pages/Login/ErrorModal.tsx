// src/Pages/Login/ErrorModal.tsx

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@mui/material';

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ open, onClose }) => {
  return (
    <Dialog      
      open={open}
      onClose={onClose}  // Fecha a modal ao clicar fora ou pressionar o botão de fechar
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle id="alert-dialog-title">Login Error</DialogTitle> */}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          User not found or incorrect password! Please review your password or sign up for our system.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
