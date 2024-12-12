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
                            <Link to='/'>ГЛАВНАЯ</Link>
                        </li>
                        <li>
                            <Link to='/services'>УСЛУГИ</Link>
                        </li>
                        <li>
                            <Link to='/cases'>КЕЙСЫ</Link>
                        </li>
                        <img src="123" alt="" />
                        <li>
                            <Link to='/'>ГЛАВНАЯ</Link>
                        </li>
                        <li>
                            <Link to='/services'>УСЛУГИ</Link>
                        </li>
                        <li>
                            <Link to='/cases'>КЕЙСЫ</Link>
                        </li>
                    </ul>
                </WidthBlock>
            </CenterBlock>
           </div>
        </>
     );
}

export default Header;