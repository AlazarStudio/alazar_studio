import React from 'react';
import classes from './DrPhone.module.css';

function DrPhone({ children, ...props }) {
  return (
    <>
      <div className={classes.box}>
        <div className={classes.boxContainer1}>
        <div className={classes.boxContainer1L}></div>
        </div>
        <div className={classes.boxContainer2}></div>
      </div>
    </>
  );
}

export default DrPhone;
