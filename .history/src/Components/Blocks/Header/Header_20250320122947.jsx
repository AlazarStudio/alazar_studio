import React, { useState, useEffect, useRef } from 'react';
import classes from './Header.module.css';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import { Link, useNavigate } from 'react-router-dom';

function Header({ children, ...props }) {

  return (
    <>
<div className={classes.container}>
<img src='headerLogo'
</div>

    </>
  );
}

export default Header;
