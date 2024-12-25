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
        <img src="/images/infoTerB.png" className={`${classes.line1} ${classes.lineFirst}`} />
        <div className={classes.container4PeopleLeft}>
            <img src
        </div>
        <img src="/images/infoTel.png"  className={`${classes.line2} ${classes.line}`} />
        <div className={classes.container4PeopleRight}></div>
        <img src="/images/infoTer.png" className={`${classes.line3} ${classes.line}`}  />
        <div className={classes.container4PeopleLeft}></div>
        <img src="/images/infoTel.png"  className={`${classes.line4} ${classes.line}`} />
        <div className={classes.container4PeopleRight}></div>
        <img src="/images/infoTer.png"  className={`${classes.line5} ${classes.line}`} />
        <div className={classes.container4PeopleLeft}></div>
        <img src="/images/infoTel.png"  className={`${classes.line6} ${classes.line}`} />
        <div className={classes.container4PeopleRight}></div>
        <img src="/images/infoTer.png"  className={`${classes.line7} ${classes.line}`} />
        <div className={classes.container4PeopleLeft}></div>
        <img src="/images/infoTel.png"  className={`${classes.line8} ${classes.line}`} />
        <div className={classes.container4PeopleRight}></div>
        <img src="/images/infoTer.png"  className={`${classes.line9} ${classes.line}`} />
        <div className={classes.container4PeopleLeft}></div>
        <img src="/images/infoTel.png"  className={`${classes.line10} ${classes.line}`} />
        <div className={classes.container4PeopleRight}></div>
      </div>
    </>
  );
}

export default Container4;
