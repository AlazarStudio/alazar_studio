import React, { useEffect } from 'react';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import classes from './ShopPage.module.css';
import CasesMenu from '../../ui/CasesPage/CasesMenu';
import { shop } from '../../../../bd';

function ShopPage() {
  useEffect(() => {
    window.scrollTo(0, 0); // Сбрасываем прокрутку всей страницы
  }, []);

  return (
    <CenterBlock>
      <WidthBlock>
        <CasesMenu />
        {shop.map((el =))}
      </WidthBlock>
    </CenterBlock>
  );
}

export default ShopPage;
