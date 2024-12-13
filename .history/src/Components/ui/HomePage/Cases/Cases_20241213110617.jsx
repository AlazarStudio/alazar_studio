import React from 'react';
import classes from './Cases.module.css';
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

export default Cases;
