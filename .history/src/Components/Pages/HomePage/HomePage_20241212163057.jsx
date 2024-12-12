import React from 'react';
import classes from './HomePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function HomePage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <div className={classes['title-part']} style={{ '--delay': '0s' }}>
              <img src="/images/A1.png" alt="" />
            </div>
            <div className={classes.container}
            <span
              className={classes['title-part']}
              style={{ '--delay': '0.1s' }}
            >
              A
            </span>
            <span
              className={classes['title-part']}
              style={{ '--delay': '0.1s' }}
            >
              L
            </span>
            <span
              className={classes['title-part']}
              style={{ '--delay': '0.2s' }}
            >
              A
            </span>
            <span
              className={classes['title-part']}
              style={{ '--delay': '0.3s' }}
            >
              Z
            </span>
            <span
              className={classes['title-part']}
              style={{ '--delay': '0.4s' }}
            >
              A
            </span>
            <span
              className={classes['title-part']}
              style={{ '--delay': '0.5s' }}
            >
              R
            </span>
            <span
              className={classes['title-part']}
              style={{ '--delay': '0.6s' }}
            >
              
            </span>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default HomePage;
