import React from "react";
import classes from './Container2.module.css';

function Container2({ children, ...props }) {
    return ( 
        <>
                      <div className={classes.container2}>
                        <div className={classes.container2Title}>
                          <span>КЛЮЧЕВЫЕ</span>
                          <span>НАПРАВЛЕНИЯ</span>
                        </div>
                        <div className={classes.container2Info}>
                          <div className={classes.container2InfoBlock}>
                            <div className={classes.container2InfoBlockElement}>
                              <img src="/images/infoBall.png" />
                              <span>Разработка сайтов</span>
                            </div>
                            <div className={classes.container2InfoBlockElement}>
                              <img src="/images/infoBall.png" />
                              <span>Техническая и дизайн-поддержка</span>
                            </div>
                            <div className={classes.container2InfoBlockElement}>
                              <img src="/images/infoBall.png" />
                              <span>SEO-продвижение</span>
                            </div>
                          </div>
                          <div className={classes.container2Info}>
                            <div className={classes.container2InfoElement}>
                              <img src="/images/infoBall.png" />
                              <span>Графический дизайн</span>
                            </div>
                            <div className={classes.container2InfoElement}>
                              <img src="/images/infoBall.png" />
                              <span>Моушн-дизай</span>
                            </div>
                            <div className={classes.container2InfoElement}>
                              <img src="/images/infoBall.png" />
                              <span>Видеомонтаж</span>
                            </div>
                          </div>
                        </div>
                      </div>
        </>
     );
}

export default Container2;