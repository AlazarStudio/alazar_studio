import classes from './CaseHomeCard.module.css';
import jsonApiConfig from '../../../jsonApiConfig';

export default function CaseHomeCard({ caseItem, allCategories }) {
  const bg = caseItem.preview
    ? `url(${jsonApiConfig.uploads}/${caseItem.preview})`
    : undefined;

  const matchedCategories = allCategories.filter((cat) =>
    caseItem.categoryIds?.includes(cat.id)
  );

  const formattedTitle = caseItem.title
    .replace(/["']/g, '«') // заменяем открывающие кавычки
    .replace(/«(.*?)«/g, '«$1»'); // заменяем вторую кавычку на закрывающую

  return (
    <div className={classes.card} data-cursor-hover data-cursor-text="Смотреть">
      <img src={`${jsonApiConfig.uploads}/${caseItem.preview}`} />
      <div className={classes.containerText}>
        <span className={classes.title}>{formattedTitle}</span>
        <div className={classes.categories}>
          {matchedCategories.map((cat) => (
            <span key={cat.id} className={classes.categoryText}>
              {cat.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
