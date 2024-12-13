import React  from 'react';
import classes from './Cases.module.css';

function Cases({ children, ...props }) {
    const navigate = useNavigate();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.containerTop}>
          <div>
            <span>НАШИ</span>  <span>КЕЙСЫ</span>
          </div>
          <img src="/images/Arrow1.png" alt="" onClick={() => navigate('/cases')} />
        </div>
      </div>
    </>
  );
}

export default Cases;
