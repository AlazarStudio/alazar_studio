import React, { useEffect, useState } from 'react';
import classes from './HomePage.module.css';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [caseHomes, setCaseHomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, caseHomesRes] = await Promise.all([
          fetch(`${server}`),
          fetch('/api/case-home'),
        ]);

        const categoriesData = await categoriesRes.json();
        const caseHomesData = await caseHomesRes.json();

        setCategories(categoriesData);
        setCaseHomes(caseHomesData);
      } catch (err) {
        console.error('Ошибка при получении данных:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.containerLogo}>
        <img src="/images/logoA.png" />
        <div className={classes.containerLogoCenter}>
          <img src="/images/logoAlazar.png" />
          <img src="/images/logoStudio.png" />
        </div>
        <span>СТУДИЯ WEB-РАЗРАБОТКИ И ГРАФИЧЕСКОГО ДИЗАЙНА</span>
      </div>

      <div className={classes.containerCase}>
        <div className={classes.containerCaseTop}>
          <div className={classes.containerCaseTopName}>
            <span>НАШИ</span>
            <span>КЕЙСЫ</span>
          </div>
          <img src="/images/Arrow 1.png" />
        </div>

        <div className={classes.containerCaseMenu}>
          {caseHomes.map((item) => (
            <div key={item.id} className={classes.caseItem}>
              <img src={item.img?.[0]} alt={item.name} />
              <div>{item.name}</div>
              <div>{item.categories.map((cat) => cat.title).join(', ')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
