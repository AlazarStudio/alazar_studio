import React from 'react';
import classes from './HomePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function HomePage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className="title-container">
            <span className="title-part" style={{ '--delay': '0s' }}>
              П
            </span>
            <span className="title-part" style={{ '--delay': '0.1s' }}>
              р
            </span>
            <span className="title-part" style={{ '--delay': '0.2s' }}>
              и
            </span>
            <span className="title-part" style={{ '--delay': '0.3s' }}>
              л
            </span>
            <span className="title-part" style={{ '--delay': '0.4s' }}>
              е
            </span>
            <span className="title-part" style={{ '--delay': '0.5s' }}>
              т
            </span>
            <span className="title-part" style={{ '--delay': '0.6s' }}>
              !
            </span>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default HomePage;
