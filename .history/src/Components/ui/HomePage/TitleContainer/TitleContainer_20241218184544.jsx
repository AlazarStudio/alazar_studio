import React from 'react';
import classes from './TitleContainer.module.css';

function TitleContainer({ children, ...props }) {
  return (
    <>
      <div className={classes.container1}>
        <div className={classes['title-container']}>
          <span className={classes['title-part1']} style={{ '--delay': '0s' }}>
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
          <span className={classes['title-part2']} style={{ '--delay': '0s' }}>
            <span>КАК</span> <span>МЫ</span> <span>РАБОТАЕМ</span>
          </span>
        </div>
      </div>
      <div className={classes.container2}>
      <img src="/images/LogoA.png" alt="" className={classes.a2} />
      </div>
    </>
  );
}

export default TitleContainer;
