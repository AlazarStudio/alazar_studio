import React, { useEffect } from 'react';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';


import CasesMenu from '../../ui/CasesPage/CasesMenu';
import DrPhone from '../../ui/CasesPage/DrPhone/DrPhone';
import VeloMoto from '../../ui/CasesPage/VeloMoto/VeloMoto';

function CasesPage() {


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
