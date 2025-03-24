import React, { useEffect, useState } from 'react';
import classes from './CaseHome.module.css';
import uploadsConfig from '../../../uploadsConfig';

export default function CaseHomeCard() {


  return (

        <div className={classes.containerCaseMenu}>
          {caseHomes.map((item) => (
            <div key={item.id} className={classes.caseItem}>
              <img src={`${uploadsConfig}${item.img[0]}`} alt={item.name} />
              <div>{item.name}</div>
            </div>
          ))}
        </div>
  
  );
}
