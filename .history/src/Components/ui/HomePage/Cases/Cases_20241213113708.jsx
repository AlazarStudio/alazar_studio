import React from 'react';
import classes from './Cases.module.css';

function Cases({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.containertop}>
          <div>
            <span>Наши</span>
            <span>КЕЙСЫ</span>
          </div>
          <img src="/images/Arrow1.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default Cases;
