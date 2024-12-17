import React from "react";
import classes from './Footer.module.css';
import CenterBlock from "../../Standart/CenterBlock/CenterBlock";
import WidthBlock from "../../Standart/WidthBlock/WidthBlock";

function Footer({ children, ...props }) {
    return ( 
        <>
        <CenterBlock><WidthBlock></WidthBlock></CenterBlock>
            <div className={classes.container}>
                <span>©2024 Alazar Studio. All right reserved.</span>
            </div>
        </>
     );
}

export default Footer;