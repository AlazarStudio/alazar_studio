import React from "react";
import classes from './BottomLogo.module.css';

function BottomLogo({ children, ...props }) {
    return ( 
        <>
            <div className={classes.container}>
                <img src="/images/.png"/>
                <span>ПОМИМО ЗАКАЗА ПРОЕКТА С НУЛЯ</span>
                <span></span>
                <img src="/images/.png"/>
                <button type="button">ПЕРЕЙТИ В МАГАЗИН</button>
            </div>
        </>
     );
}

export default BottomLogo;