import React from "react";
import classes from './DrPhone.module.css';

function DrPhone({ children, ...props }) {
    return ( 
        <>
            <div className={classes.box}>
                <div className={classes.boxContainer}></div>
                <div className={classes.boxContainer}></div>
                <div className={classes.boxContainer}></div>
           
            </div>
        </>
     );
}

export default DrPhone;