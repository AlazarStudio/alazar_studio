import React from "react";
import classes from './BottomLogo.module.css';

function BottomLogo({ children, ...props }) {
    return ( 
        <>
            <div className={classes.container}>
                <img src="/images/.png"/>
                <span></span>
                <span></span>
                
            </div>
        </>
     );
}

export default BottomLogo;