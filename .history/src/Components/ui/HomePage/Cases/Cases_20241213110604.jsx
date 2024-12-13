import React from 'react';
import classes from './HomePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ScrollOne from '../../ui/HomePage/ScrollOne/ScrollOne';
import TitleContainer from '../../ui/HomePage/TitleContainer/TitleContainer';

function Cases({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <TitleContainer />
          <ScrollOne />
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default HomePage;
