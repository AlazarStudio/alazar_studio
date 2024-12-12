import React from 'react';
import classes from './HomePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function HomePage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes['title-container']}>
            <span className={classes['title-part']} style={{ '--delay': '0s' }}>
              <img src="/images/A1.png" alt="" className={classes.a1} />
            </span>
            <div className={classes.container}>
            <span
              className={classes['title-part']}
              style={{ '--delay': '0.1s' }}
            >
              <img src="/images/AlazarTitle.png" alt="" />
             
            </span>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default HomePage;
