import React, { useEffect } from 'react';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ScrollOne from '../../ui/HomePage/ScrollOne/ScrollOne';
import TitleContainer from '../../ui/HomePage/TitleContainer/TitleContainer';
import Cases from '../../ui/HomePage/Cases/Cases';
import DrPhone from '../../ui/HomePage/DrPhone/DrPhone';
import VeloMoto from '../../ui/HomePage/VeloMoto/VeloMoto';
import Advocate from '../../ui/HomePage/Advocate/Advocate';

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0); // Сбрасываем прокрутку всей страницы
  }, []);

  return (
    <CenterBlock>
      <WidthBlock>
        <TitleContainer />
        <ScrollOne />
        <Cases />
        <DrPhone />
        <VeloMoto />
        <Advocate />
      </WidthBlock>
    </CenterBlock>
  );
}

export default HomePage;
