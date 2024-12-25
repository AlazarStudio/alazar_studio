import React from 'react';
import classes from './InfoPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function InfoPage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
            <div className={classes.title}>
                <span>О</span>
                <span>НАС</span>
            </div>
            <div className={classes.container1}>
                <img src='/images/.png'
            </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default InfoPage;
