// src/components/ui/HomePage/CaseHomeCard.jsx
import classes from './CaseHomeCard.module.css';
import uploadsConfig from '../../../uploadsConfig';

export default function CaseHomeCard({ caseHomes, onClickCase }) {
  return (
    <div className={classes.containerCaseMenu}>
      {caseHomes.map((item) => (
        <div
          key={item.id}
          className={classes.caseItem}
          onClick={() => onClickCase && onClickCase(item.id)} // защита от ошибки
        >
          <img
            src={`${uploadsConfig}${item.img[0]}`}
            alt={item.name}
          />
        </div>
      ))}
    </div>
  );
}
