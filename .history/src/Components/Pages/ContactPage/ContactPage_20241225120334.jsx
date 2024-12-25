import React from 'react';
import classes from './ContactPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function ContactPage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
            <div className={classes.container}>
              <div className={classes.containerTitle}>
                <span>НАШИ</span>
                <span>КОНТАКТЫ</span>
              </div>
              <div className={classes.containerAddress}>
                <span>Адрес</span>
                <span>КЧР, г.Черкесск, ул.Октябрьская, д.264</span>
              </div>
              <div className={classes.containerNumber}>
                <span>НОМЕР</span>
                <span>+7 928 399-53-84</span>
                <button onClick={() => window.open('https://instagram.com/USERNAME', '_blank')}>
                    TELEGRAM 
                    
                </button>

              </div>
            </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default ContactPage;
