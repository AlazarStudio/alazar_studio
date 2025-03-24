import React, { useEffect, useState } from 'react';
import classes from './HomePage.module.css';
import serverConfig from '../../../serverConfig';

export default function HomePage() {
  const [caseHomes, setCaseHomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${serverConfig}/news`);
        const newsData = await response.json();

        // ✅ Фильтруем только

        setNews(newsData);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
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
