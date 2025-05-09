import React  from 'react';
import classes from './Cases.module.css';
import { useNavigate } from 'react-router-dom';

function Cases({ children, ...props }) {
    const navigate = useNavigate();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.containerTop}>
          <div>
            <span>НАШИ</span>  <span>КЕЙСЫ</span>
          </div>
          <img src="/images/Arrow1.png" alt="" onClick={() => navigate('/cases')} />
        </div>
        <div className={classes.containerBottom}>
          <button>ЛОГОТИП И ФИРСТИЛЬ</button>
          <button>WEB-ДИЗАЙН</button>
          <button>МОБИЛЬНЫЕ</button>
          <button></button>
          <button></button>
          <button></button>
        </div>
      </div>
    </>
  );
}

export default Cases;
