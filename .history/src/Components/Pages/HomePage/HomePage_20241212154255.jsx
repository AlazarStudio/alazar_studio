import React from "react";
import classes from './HomePage.module.css';
import CenterBlock from "../../Standart/CenterBlock/CenterBlock";
import WidthBlock from "../../Standart/WidthBlock/WidthBlock";

function HomePage({ children, ...props }) {
    return ( 
        <>
            <CenterBlock>
                <WidthBlock>
                    23423
                </WidthBlock>
            </CenterBlock>
        </>
     );
}

export default HomePage;