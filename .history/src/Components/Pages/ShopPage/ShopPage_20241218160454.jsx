import React, { useEffect } from 'react';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ScrollOne from '../../ui/HomePage/ScrollOne/ScrollOne';
import TitleContainer from '../../ui/HomePage/TitleContainer/TitleContainer';
import DrPhone from '../../ui/HomePage/DrPhone/DrPhone';
import VeloMoto from '../../ui/HomePage/VeloMoto/VeloMoto';
import Advocate from '../../ui/HomePage/Advocate/Advocate';
import Attraction from '../../ui/HomePage/Attraction/Attraction';
import Business from '../../ui/HomePage/Business/Business';
import Service from '../../ui/HomePage/Service/Service';
import ProjectForm from '../../ui/HomePage/ProjectForm/ProjectForm';
import BottomLogo from '../../ui/HomePage/BottomLogo/BottomLogo';
import { categories } from '../../../../bd';
import CasesMenu from '../../ui/CasesPage/CasesMenu';

function ShopPage() {
  useEffect(() => {
    window.scrollTo(0, 0); // Сбрасываем прокрутку всей страницы
  }, []);

  return (
    <CenterBlock>
      <WidthBlock>
        <CasesMenu />
        <DrPhone />
        <VeloMoto />
        <Advocate />
        <Attraction />
        <Business />
        <Service />
        <ProjectForm />
        <BottomLogo />
      </WidthBlock>
    </CenterBlock>
  );
}

export default CasesPage;
