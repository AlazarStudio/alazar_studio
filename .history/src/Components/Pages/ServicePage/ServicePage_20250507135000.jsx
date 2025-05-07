import React from "react";
import classes from './ServicePage.module.css';

function ServicePage({ children, ...props }) {
    return ( 
        <>
            <div className={classes.container}>
                <div className={classes.containerTop}></div>
                <div className={classes.containerTop}></div>
            </div>
        </>
     );
}

export default ServicePage;