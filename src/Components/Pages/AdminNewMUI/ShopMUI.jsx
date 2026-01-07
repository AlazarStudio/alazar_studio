import React from 'react';
import { Box, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';

const ShopMUI = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <StorefrontIcon color="primary" />
        <Typography variant="h5" fontWeight={600}>
          Магазин
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        Заглушка: тут появится управление товарами магазина (кейсы с флагом shop).
      </Typography>
    </Box>
  );
};

export default ShopMUI;


