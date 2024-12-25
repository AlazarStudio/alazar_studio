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
        <div className={classes.container3CenterTop}></div>
        <div className={classes.container3CenterMiddle}></div>
        <div className={classes.container3CenterBottom}></div>
        </div>
        <div className={classes.container3Right}> </div>
      </div>
    </>
  );
}

export default Container3;
