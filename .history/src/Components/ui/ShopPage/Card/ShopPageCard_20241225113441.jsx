import React from 'react';
import classes from './ShopPageCard.module.css';

function ShopPageCard({ el }) {
  return (
    <>
      <div key={el.id} className={classes.card}>
        <img src={el.img} />
        <div className={classes.cardBottom}>
          <div className={classes.cardBottomLeft}>
            <span>{el.title}</span>
            <span>{el.description}</span>  
          </div>
          <div className={classes.cardBottomRight}>
            {el.service.map((el, index) => <span key={index}>{el}</span>)}
          </div>
        </div>
      </div>
      <div key={el.id} className={classes.cardMedia}>
        <img src={el.img} />
        <div className={classes.cardMediaBottom}>
          <div className={classes.cardMediaBottomLeft}>
            <span>{el.title}</span>
            <span>{el.цуи}</span>  
          </div>
          <div className={classes.cardMediaBottomRight}>
            {el.service.map((el, index) => <span key={index}>{el}</span>)}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopPageCard;
