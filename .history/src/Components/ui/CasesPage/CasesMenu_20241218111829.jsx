import React from 'react';
import classes from './CasesMenu.module.css';
import { useNavigate } from 'react-router-dom';

function CasesMenu({ children, ...props }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.containerTop}>
          <div>
            <span>НАШИ</span> <span>КЕЙСЫ</span>
          </div>
          <img
            src="/images/Arrow1.png"
            alt=""
            onClick={() => navigate('/cases')}
          />
        </div>
        <div className={classes.containerBottom}>
          <button>ЛОГОТИП И ФИРСТИЛЬ</button>
          <button>WEB-ДИЗАЙН</button>
          <button>МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ</button>
          <button>ПРЕЗЕНТАЦИИ</button>
          <button>РЕКЛАМНАЯ ПРОДУКЦИЯ</button>
          <button>ВИДЕО</button>
        </div>
      </div>
    </>
  );
}

export default Cases;
