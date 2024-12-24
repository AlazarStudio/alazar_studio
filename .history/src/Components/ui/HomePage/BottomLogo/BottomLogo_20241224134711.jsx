import React from "react";
import classes from './BottomLogo.module.css';

function BottomLogo({ children, ...props }) {
    return ( 
        <>
            <div className={classes.container}>
                <img src="/images/HomeButtom1.png"/>
                <span>ПОМИМО ЗАКАЗА ПРОЕКТА С НУЛЯ, ВЫ </span>
                <span>ТАКЖЕ МОЖЕТЕ ОЗНАКОМИТЬСЯ С НАШИМ РАЗДЕЛОМ ГОТОВЫХ РЕШЕНИЙ</span>
                <span>ОЗНАКОМИТЬСЯ С НАШИМ РАЗДЕЛОМ ГОТОВЫХ РЕШЕНИЙ</span>
                <img src="/images/HomeButtom2.png"/>
                <button type="button">ПЕРЕЙТИ В МАГАЗИН</button>
                <img src="/images/blurLeft.png"/>
                <img src="/images/blurRight.png"/>
            </div>
        </>
     );
}

export default BottomLogo;