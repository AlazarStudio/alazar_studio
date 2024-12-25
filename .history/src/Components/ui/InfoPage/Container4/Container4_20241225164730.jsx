import React from "react";
import classes from './Container4.module.css';

function Container4({ children, ...props }) {
    return ( 
        <>
            <div className={classes.container4}>
                <div className={classes.container4Title}>
                    <span>НАША</span>
                    <span>КОМАНДА</span>
                </div>
                <div className={classes.container4}
            </div>
        </>
     );
}

export default Container4;