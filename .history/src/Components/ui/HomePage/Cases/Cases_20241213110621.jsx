import React from 'react';
import classes from './Cases.module.css';

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
