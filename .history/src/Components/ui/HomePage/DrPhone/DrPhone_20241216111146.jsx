import React from "react";
import classes from './DrPhone.module.css';

function DrPhone({ children, ...props }) {
    return ( 
        <>
            <div className={classes.container}></div>
        </>
     );
}

export default DrPhone;