import classes from './ShopCard.module.css';
import serverConfig from '../../../serverConfig';
import uploadsConfig from '../../../uploadsConfig';

export default function ShopCard({ caseItem, allCategories }) {
  // const bg = caseItem.preview
  //   ? `url(${uploadsConfig}/uploads/${caseItem.preview})`
  //   : undefined;

  const matchedCategories = allCategories.filter((cat) =>
    caseItem.categoryIds?.includes(cat.id)
  );
  return (
    <div className={classes.card}>
      {caseItem.preview && (
        <img
          src={`${uploadsConfig}/uploads/${caseItem.preview}`}
          alt={caseItem.title}
          className={classes.image}
        />
      )}
      <div className={classes.bottom}>
        <div className={classes.categories}>
          {matchedCategories.map((cat) => (
            <span key={cat.id} className={classes.categoryText}>
              {cat.name}
            </span>
          ))}
        </div>
        <div className={classes.titleWrapper}>
          <span className={classes.title}>{caseItem.title}</span>
        </div>
        <div className={classes.cardPrice}>
          <span className={classes.price}>
            {caseItem.price?.toLocaleString('ru-RU')} ₽
          </span>
        </div>
      </div>

      {/* <div className={classes.categories}>
        {matchedCategories.map((cat) => (
          <span key={cat.id} className={classes.categoryText}>
            {cat.name}
          </span>
       ))}
     </div> */}

      {/* Название */}
      {/* <div className={classes.titleWrapper}>
        <span className={classes.title}>{caseItem.title}</span>
      </div> */}
    </div>
  );
}
