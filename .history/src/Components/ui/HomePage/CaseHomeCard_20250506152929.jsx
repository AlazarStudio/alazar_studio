
import classes from './CaseHomeCard.module.css';
import uploadsConfig from '../../../uploadsConfig';

export default function CaseHomeCard({caseHomes}) {


  return (

        <div className={classes.containerCaseMenu}>
          {caseHomes.map((item) => (
            <div key={item.id} className={classes.caseItem}>
              <img src={`${uploadsConfig}${item.img[0]}`} alt={item.name} />
              {/* <span>{item.name}</span> */}
            </div>
          ))}
        </div>
  
  );
}
