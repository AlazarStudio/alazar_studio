import React from 'react';
import classes from './HomePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function HomePage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container1}>
            <div className={classes['title-container']}>
              <span
                className={classes['title-part1']}
                style={{ '--delay': '0s' }}
              >
                <img src="/images/LogoA.png" alt="" className={classes.a1} />
              </span>
              <div className={classes.container}>
                <span
                  className={classes['title-part']}
                  style={{ '--delay': '0.1s' }}
                >
                  <img src="/images/AlazarTitle.png" alt="" />
                </span>
                <span
                  className={classes['title-part']}
                  style={{ '--delay': '0.1s' }}
                >
                  СТУДИЯ WEB-РАЗРАБОТКИ И ГРАФИЧЕСКОГО ДИЗАЙНА
                </span>
              </div>
            </div>
            <div className={classes['title-container2']}>
              <span
                className={classes['title-part2']}
                style={{ '--delay': '0s' }}
              >
                <span>КАК</span> <span>МЫ</span> <span>РАБОТАЕМ</span>
              </span>
            </div>
          </div>

          <div className={classes.container2}>
            <img src="/images/w1.png" alt="" />
            <img src="/images/b1.png" alt="" />
            <img src="/images/w2.png" alt="" />
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default HomePage;
