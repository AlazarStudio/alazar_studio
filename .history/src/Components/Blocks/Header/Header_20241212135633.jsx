import React from "react";
import classes from './Header.module.css';

function Header({ children, ...props }) {
    return ( 
        <>
           <div className={classes.headerContainer}>
            123
           </div>
        </>
     );
}

export default Header;