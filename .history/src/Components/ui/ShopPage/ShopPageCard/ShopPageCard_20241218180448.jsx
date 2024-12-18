import React from 'react';
import classes from './ShopPageCard.module.css';

function ShopPageCard({ el }) {
  return (
    <>
      <div key={el.id} className={classes.card}>
        <img src={el.img} />
        <div className={classes.cardBottom}
      </div>
    </>
  );
}

export default ShopPageCard;
