import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface QRCodeWithCopyProps {
  queueId: string;
}

const QRCodeWithCopy: React.FC<QRCodeWithCopyProps> = ({ queueId }) => {
  const queueLink = `${import.meta.env.VITE_BASE_URL}/display/${queueId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(queueLink);
    alert('Link copied to clipboard');
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" component="h3" gutterBottom>
        Display Screen QR Code
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 2, my: 2, ml:3 }}>
        <QRCodeSVG value={queueLink} />        
        <Tooltip title="Copy Link">
          <IconButton onClick={handleCopyLink}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default QRCodeWithCopy;
