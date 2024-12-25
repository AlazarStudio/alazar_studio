import React from 'react';
import classes from './Container3.module.css';

function Container3({ children, ...props }) {
  return (
    <>
      <div className={classes.container3}>
        <div className={classes.container3Left}>
          <img src="/images/container3left.png" />
        </div>
        <div className={classes.container3Center}>
          <div className={classes.container3CenterTop}>
            <span>3 МЕСЯЦА</span>
            <span>необходимо для выпуска первой стабильной версии проекта</span>
          </div>
          <div className={classes.container3CenterMiddle}>
            <span>3 ДНЯ</span>
            <span></span>
          </div>
          <div className={classes.container3CenterBottom}>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={classes.container3Right}> </div>
      </div>
    </>
  );
}

export default Container3;
