import React from 'react';
import classes from './CasesCard.module.css';
import uploadsConfig from '../../../../uploadsConfig';

function CasesCard({ el }) {
  return (
    <>
      <div key={el.id} className={classes.card}>
        <img src={`${uploadsConfig}${el.img[0]}`} />
        <div className={classes.cardBottom}>
          <div className={classes.cardBottomName}>
            <span>{el.name}</span>
          </div>
          <div className={classes.cardBottomDesc}>
            <span className={classes.cardBottomDesc1}>{el.description}</span>
            <div className={classes.cardBottomDesc2}
            {el.tags.map((el) => (
              <span className={classes.cardBottomDesc2}>{el} </span>
            ))}
          </div>
        </div>
      </div>
      {/* <div key={el.id} className={classes.cardMedia}> */}
      {/* <img src={el.img} />
        <div className={classes.cardMediaBottom}>
          <div className={classes.cardMediaBottomLeft}>
            <span>{el.title}</span>
            <a href={el.website} target="_blank" rel="noopener noreferrer">
              <span>{el.website}</span>
            </a>
          </div> */}
      {/* <div className={classes.cardMediaBottomRight}>
            {el.service.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default CasesCard;
