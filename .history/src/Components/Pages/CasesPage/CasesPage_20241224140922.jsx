import React, { useEffect } from 'react';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

import DrPhone from '../../ui/HomePage/DrPhone/DrPhone';
import VeloMoto from '../../ui/HomePage/VeloMoto/VeloMoto';
import Advocate from '../../ui/HomePage/Advocate/Advocate';
import Attraction from '../../ui/HomePage/Attraction/Attraction';
import Business from '../../ui/HomePage/Business/Business';
import Service from '../../ui/HomePage/Service/Service';
import ProjectForm from '../../ui/HomePage/ProjectForm/ProjectForm';
import BottomLogo from '../../ui/HomePage/BottomLogo/BottomLogo';

import CasesMenu from '../../ui/CasesPage/CasesMenu';

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
