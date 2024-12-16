import React from 'react';
import classes from './VeloMoto.module.css';

function VeloMoto({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
        <img src="/imajes/.png" />
      </div>
    </>
  );
}

export default VeloMoto;
