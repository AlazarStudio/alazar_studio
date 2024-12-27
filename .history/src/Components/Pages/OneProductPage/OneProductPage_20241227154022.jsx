import React from "react";
import classes from './OneProductPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function OneProductPage({ children, ...props }) {
    return ( 
        <>
            <CenterBlock>
                <WidthBlock>
                   <div className={classes.container}>
                    <div className={classes.}
                   </div>
                </WidthBlock>
            </CenterBlock>
        </>
     );
}

export default OneProductPage;