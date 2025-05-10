// src/components/ui/HomePage/CaseHomeCard.jsx
import classes from './CaseHomeCard.module.css';
import uploadsConfig from '../../../uploadsConfig';

export default function CaseHomeCard({ caseHomes, onClickCase }) {
  return (
    <div className={classes.containerCaseMenu}>
      {caseHomes.map((item) => {
        const imageUrl =
          Array.isArray(item.img) && item.img.length > 0
            ? `${uploadsConfig}${item.img[0]}`
            : '/images/placeholder.png'; // fallback картинка

        return (
          <div
            key={item.id}
            className={classes.caseItem}
            onClick={() => onClickCase(item.id, item)}
          >
            <img src={imageUrl} alt={item.name || 'Кейс'} />
          </div>
        );
      })}
    </div>
  );
}
