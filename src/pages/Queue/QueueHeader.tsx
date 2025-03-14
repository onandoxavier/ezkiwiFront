// src/Pages/QueuePage/QueueHeader.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';

interface QueueHeaderProps {
  queueName: string;
}

const QueueHeader: React.FC<QueueHeaderProps> = ({ queueName }) => {
  return (
    <Box sx={{ textAlign: 'center', pt: 2, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {queueName}
      </Typography>
    </Box>
  );
};

export default QueueHeader;
