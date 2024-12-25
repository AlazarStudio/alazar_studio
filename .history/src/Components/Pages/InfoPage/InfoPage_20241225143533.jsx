import React from 'react';
import classes from './InfoPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import Container1 from '../../ui/InfoPage/Container1/Container1';
import Container2 from '../../ui/InfoPage/Container2/Container2';
import Container3 from '../../ui/InfoPage/Container3/Container3';
import Container4 from '../../ui/InfoPage/Container4/Container4';

function InfoPage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.title}>
            <span>О</span>
            <span>НАС</span>
          </div>
          <Container1 />
          <Container2 />
          <Container3 />
          <Container4 />
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default InfoPage;
