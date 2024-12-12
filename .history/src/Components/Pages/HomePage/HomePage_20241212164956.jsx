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
              <img src="/images/A1.png" alt="A1" />
            </span>
            <span
              className={classes['title-part1']}
              style={{ '--delay': '0.1s' }}
            >
              <img src="/images/AlazarTitle.png" alt="AlazarTitle" />
              <span
                className={classes['title-text']}
                style={{ '--delay': '0.2s' }}
              >
                СТУДИЯ WEB-РАЗРАБОТКИ И ГРАФИЧЕСКОГО ДИЗАЙНА
              </span>
            </span>

            <span className={classes['title-part']} style={{ '--delay': '0.3s' }}>
              A
            </span>
            <span className={classes['title-part']} style={{ '--delay': '0.4s' }}>
              Z
            </span>
            <span className={classes['title-part']} style={{ '--delay': '0.5s' }}>
              A
            </span>
            <span className={classes['title-part']} style={{ '--delay': '0.6s' }}>
              R
            </span>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default HomePage;
