import React, { useEffect } from 'react';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

import CasesMenu from '../../ui/CasesPage/CasesMenu';
import DrPhone from '../../ui/CasesPage/DrPhone/DrPhone';
import VeloMoto from '../../ui/CasesPage/VeloMoto/VeloMoto';
import Advocate from '../../ui/CasesPage/Advocate/Advocate';
import Attraction from '../../ui/CasesPage/Attraction/Attraction';
import Business from '../../ui/CasesPage/Business/Business';

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
      </WidthBlock>
    </CenterBlock>
  );
}

export default CasesPage;
