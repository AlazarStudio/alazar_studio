import React from 'react';
import classes from './ShopPageCard.module.css';

function ShopPageCard({el}) {


  return (
    <div className={classes.container}>
{el.title}
    </div>
  );
}

export default ShopPageCard;
