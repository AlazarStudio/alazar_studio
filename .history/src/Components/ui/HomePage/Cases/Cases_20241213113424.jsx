import React from 'react';
import classes from './Cases.module.css';

function Cases({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
       <div className={classes.top}>
        <div>
          <span>Н</span>
        </div>
       </div>
      </div>
    </>
  );
}

export default Cases;
