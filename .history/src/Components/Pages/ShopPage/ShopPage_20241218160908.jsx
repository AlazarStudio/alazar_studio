import React, { useEffect } from 'react';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import classes from './ShopPage.module.css'



function ShopPage() {
  useEffect(() => {
    window.scrollTo(0, 0); // Сбрасываем прокрутку всей страницы
  }, []);

  return (
    <CenterBlock>
      <WidthBlock>
     <div className={classes.container}>
        <div className={classes.containerBottom}>
          {categories.map((el) => (
            <button key={el.id}>{el.title}</button>
          ))}
        </div>
      </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default ShopPage;
