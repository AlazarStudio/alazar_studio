import React from "react";
import classes from './Footer.module.css';

function Footer({ children, ...props }) {
    return ( 
        <>
            <div className={classes.container}>
                <span>©2024 Alazar Studio. All right reserved.</span>
            </div>
        </>
     );
}

export default Footer;