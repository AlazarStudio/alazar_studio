import React from "react";
import classes from './Container3.module.css';

function Container3({ children, ...props }) {
    return ( 
        <>
            <div className={classes.container3}>
            <div className={classes.container3Le}> </div>
            </div>
        </>
     );
}

export default Container3;