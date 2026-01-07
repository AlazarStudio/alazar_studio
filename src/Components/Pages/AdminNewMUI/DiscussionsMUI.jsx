import React from 'react';
import { Box, Typography } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';

const DiscussionsMUI = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <ForumIcon color="primary" />
        <Typography variant="h5" fontWeight={600}>
          Заявки
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        Заглушка: здесь будет таблица заявок с фильтрами и статусами.
      </Typography>
    </Box>
  );
};

export default DiscussionsMUI;


