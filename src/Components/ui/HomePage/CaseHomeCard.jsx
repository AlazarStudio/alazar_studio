import classes from './CaseHomeCard.module.css';
import serverConfig from '../../../serverConfig';
import uploadsConfig from '../../../uploadsConfig';

export default function CaseHomeCard({ caseItem, allCategories }) {
 const bg = caseItem.preview
  ? `url(${uploadsConfig}/uploads/${caseItem.preview})`
  : undefined;


  const matchedCategories = allCategories.filter((cat) =>
    caseItem.categoryIds?.includes(cat.id)
  );
  return (
    <div className={classes.card} style={{ backgroundImage: bg }}>
      {/* Затемняющий слой */}
      <div className={classes.overlay} />

      {/* Категории */}
      <div className={classes.categories}>
        {matchedCategories.map((cat) => (
          <span key={cat.id} className={classes.categoryText}>
            {cat.name}
          </span>
        ))}
      </div>

      {/* Название */}
      <div className={classes.titleWrapper}>
        <span className={classes.title}>{caseItem.title}</span>
      </div>
    </div>
  );
}
