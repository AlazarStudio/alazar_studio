import React from "react";
import classes from './Service.module.css';

function Service({ children, ...props }) {
    return ( 
        <>
           <div className={classes.container}>
            <div className={classes.containerLeft}>
                <img src=""
            </div>
            <div className={classes.containerRight}></div>
           </div>
        </>
     );
}

export default Service;