import React from 'react';
import classes from './Container4.module.css';

function Container4({ children, ...props }) {
  return (
    <>
      <div className={classes.container4}>
        <div className={classes.container4Title}>
          <span>НАША</span>
          <span>КОМАНДА</span>
        </div>
        <img src="/images/infoTerB.png" className={classes.line} />
        <div className={classes.container4PeopleLeft}></div>
        <img src="/images/infoTel.png" />
        <div className={classes.container4PeopleRight}></div>
        <img src="/images/infoTer.png" />
        <div className={classes.container4PeopleLeft}></div>
        <img src="/images/infoTel.png" />
        <div className={classes.container4PeopleRight}></div>
        <img src="/images/infoTer.png" />
        <div className={classes.container4PeopleLeft}></div>
        <img src="/images/infoTel.png" />
        <div className={classes.container4PeopleRight}></div>
        <img src="/images/infoTer.png" />
        <div className={classes.container4PeopleLeft}></div>
        <img src="/images/infoTel.png" />
        <div className={classes.container4PeopleRight}></div>
        <img src="/images/infoTer.png" />
        <div className={classes.container4PeopleLeft}></div>
        <img src="/images/infoTel.png" />
        <div className={classes.container4PeopleRight}></div>
      </div>
    </>
  );
}

export default Container4;
