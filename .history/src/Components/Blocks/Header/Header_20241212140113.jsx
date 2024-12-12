import React from "react";
import classes from './Header.module.css';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import { Link, useNavigate } from 'react-router-dom';

function Header({ children, ...props }) {
    return ( 
        <>
           <div className={classes.headerContainer}>
            <CenterBlock>
                <WidthBlock>
                    <ul className={classes.navigate}>
                        <li>
                            <Link to='/'
                        </li>
                    </ul>
                </WidthBlock>
            </CenterBlock>
           </div>
        </>
     );
}

export default Header;