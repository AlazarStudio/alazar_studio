import React from 'react';
import classes from './CasesMenu.module.css';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../../../bd';

function CasesMenu({ children, ...props }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.containerBottom}>
          {categories.map((el) => (
            <button key={el.id} onClick={() => navigate('/m')}>{el.title}</button>
          ))}
        </div>
      </div>
    </>
  );
}

export default CasesMenu;
