import React, { useEffect } from 'react';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import classes from './ShopPage.module.css';
import CasesMenu from '../../ui/CasesPage/CasesMenu';
import { shop } from '../../../../bd';
import ShopPageCard from '../../ui/ShopPage/Card/ShopPageCard';

function ShopPage() {
  useEffect(() => {
    window.scrollTo(0, 0); // Сбрасываем прокрутку всей страницы
  }, []);

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.container}>
          <CasesMenu />
          <div className={classes.containerShop}>
            {shop.map((el) => (
              <ShopPageCard key={el.id} el={el} />
            ))}
          </div>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default ShopPage;
