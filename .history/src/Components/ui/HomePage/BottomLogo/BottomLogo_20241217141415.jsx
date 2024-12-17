import React from "react";
import classes from './BottomLogo.module.css';

function BottomLogo({ children, ...props }) {
    return ( 
        <>
            <div className={classes.container}>
                <img src="/images/.png"/>
                <span></span>
                <span></span>
                <img src="/images/.png"/>
                <button type="button"
            </div>
        </>
     );
}

export default BottomLogo;