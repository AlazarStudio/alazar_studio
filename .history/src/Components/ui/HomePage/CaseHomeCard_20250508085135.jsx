import classes from './CaseHomeCard.module.css';
import uploadsConfig from '../../../uploadsConfig';
import { useNavigate } from 'react-router-dom';

export default function CaseHomeCard({ caseHomes, onClickCase }) {
  const navigate = useNavigate();
  return (
    <div className={classes.containerCaseMenu}>
      {caseHomes.map((item) => (
        <div
          key={item.id}
          className={classes.caseItem}
         
        >
          <img
            src={`${uploadsConfig}${item.img[0]}`}
            alt={item.name}
            onClick={() => onClickCase(item.id)}
            // onClick={() => navigate(`/case/${item.id}`)}
          />
          {/* <span>{item.name}</span> */}
        </div>
      ))}
    </div>
  );
}
