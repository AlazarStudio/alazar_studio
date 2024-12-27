import React from 'react';
import classes from './ShopPageCard.module.css';

function ShopPageCard({ el }) {
  if (!el) {
    return <div>Product data is missing</div>;
  }

  return (
    <>
      <div key={el.id} className={classes.card}>
        <img src={el.img} alt={el.title} />
        <div className={classes.cardBottom}>
          <div className={classes.cardBottomLeft}>
            <span>{el.title}</span>
            <a href={el.website} target="_blank" rel="noopener noreferrer">
              <span>{el.website}</span>
            </a>
          </div>
          <div className={classes.cardBottomRight}>
            {Array.isArray(el.service) &&
              el.service.map((service, index) => (
                <span key={index}>{service}</span>
              ))}
          </div>
        </div>
      </div>
      <div key={el.id} className={classes.cardMedia}>
        <img src={el.img} alt={el.title} />
        <div className={classes.cardMediaBottom}>
          <div className={classes.cardMediaBottomLeft}>
            <span>{el.title}</span>
            <a href={el.website} target="_blank" rel="noopener noreferrer">
              <span>{el.website}</span>
            </a>
          </div>
          <div className={classes.cardMediaBottomRight}>
            {Array.isArray(el.tags) &&
              el.service.map((service, index) => (
                <span key={index}>{service}</span>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopPageCard;
