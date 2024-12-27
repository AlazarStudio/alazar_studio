import React from 'react';
import classes from './OneProductPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function OneProductPage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <div className={classes.containerTop}>
              <div className={classes.containerTopLeft}>
                <span>{el.description}</span>
                <span></span>
              </div>
              <div className={classes.containerTopRight}></div>
            </div>
            <div className={classes.containerBottom}></div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneProductPage;
