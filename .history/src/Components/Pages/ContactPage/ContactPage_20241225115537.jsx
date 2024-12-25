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
                <span
              </div>
            </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default ContactPage;
