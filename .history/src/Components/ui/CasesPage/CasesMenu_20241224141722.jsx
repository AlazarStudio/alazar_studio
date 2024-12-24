import React from 'react';
import classes from './CasesMenu.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { categories } from '../../../../bd';

function CasesMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const isShopPage = location.pathname.includes('/shop');

  return (
    <div className={classes.container}>
      <div className={classes.container}>
        <span>НАШИ</span> <span>КЕЙСЫ</span>
      </div>
      <div className={classes.containerBottom}>
        {categories.map((el) => (
          <button
            key={el.id}
            onClick={() =>
              navigate(isShopPage ? `/shop/${el.id}` : `/cases/${el.id}`)
            }
          >
            {el.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CasesMenu;
