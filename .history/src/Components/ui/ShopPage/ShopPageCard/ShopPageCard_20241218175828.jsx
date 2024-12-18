import React from 'react';
import classes from './ShopPageCard.module.css';

function ShopPageCard({ el }) {
  return (
    <>
      <div className={classes.card}>
        <img src={el.img}
      </div>
    </>
  );
}

export default ShopPageCard;
