import React from 'react';
import classes from './ShopPageCard.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { categories } from '../../../../bd';

function ShopPageCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isShopPage = location.pathname.includes('/shop');

  return (
    <div className={classes.container}>

    </div>
  );
}

export default ShopPageCard;
