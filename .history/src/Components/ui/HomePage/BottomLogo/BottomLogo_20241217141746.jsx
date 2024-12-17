import React from "react";
import classes from './BottomLogo.module.css';

function BottomLogo({ children, ...props }) {
    return ( 
        <>
            <div className={classes.container}>
                <img src="/images/c:\Users\admin\Downloads\HomeButtom1.png c:\Users\admin\Downloads\HomeButtom2.png.png"/>
                <span>ПОМИМО ЗАКАЗА ПРОЕКТА С НУЛЯ, ВЫ ТАКЖЕ МОЖЕТЕ</span>
                <span>ОЗНАКОМИТЬСЯ С НАШИМ РАЗДЕЛОМ ГОТОВЫХ РЕШЕНИЙ</span>
                <img src="/images/.png"/>
                <button type="button">ПЕРЕЙТИ В МАГАЗИН</button>
            </div>
        </>
     );
}

export default BottomLogo;