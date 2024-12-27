import React from 'react';
import classes from './ShopPageCard.module.css';

function ShopPageCard({ el }) {
  return (
    <>
      <div key={el.id} className={classes.card}>
        <img src={``}  />
        <div className={classes.cardBottom}>
          <div className={classes.cardBottomLeft}>
            <span>{el.name}</span>
            <a href={el.website} target="_blank" rel="noopener noreferrer">
              <span>{el.website}</span>
            </a>
          </div>
          {/* <div className={classes.cardBottomRight}>
            {el.service.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </div> */}
        </div>
      </div>
      <div key={el.id} className={classes.cardMedia}>
        <img src={el.img} />
        <div className={classes.cardMediaBottom}>
          <div className={classes.cardMediaBottomLeft}>
            <span>{el.title}</span>
            <a href={el.website} target="_blank" rel="noopener noreferrer">
              <span>{el.website}</span>
            </a>
          </div>
          {/* <div className={classes.cardMediaBottomRight}>
            {el.service.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default ShopPageCard;
