import React from 'react';
import classes from './HomePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ScrollOne from '../../ui/HomePage/ScrollOne/ScrollOne';

function HomePage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
       <
          <ScrollOne />

        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default HomePage;
