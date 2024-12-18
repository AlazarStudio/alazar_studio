import React from 'react';
import classes from './ShopPageCard.module.css';

function ShopPageCard({ el }) {
  return (
    <>
      <div key={el.id} className={classes.card}>
        <img src={el.img} />
        <div className={classes.cardBottom}>
          <div className={classes.cardBottomLeft}>
            {el.title}
          </div>
          <div className=''
        </div>
      </div>
    </>
  );
}

export default ShopPageCard;
