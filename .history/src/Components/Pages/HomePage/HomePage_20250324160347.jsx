import React, { useEffect, useState } from 'react';
import classes from './HomePage.module.css';
import serverConfig from '../../../serverConfig';
import uploadsConfig from '../../../uploadsConfig';

export default function HomePage() {
  const [caseHomes, setCaseHomes] = useState([]);
  const [categories, setCategories] = useState([]); // 🆕 категории
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загружаем кейсы и категории параллельно
        const [casesHomeRes, categoriesRes] = await Promise.all([
          fetch(`${serverConfig}/casesHome`),
          fetch(`${serverConfig}/categories`)
        ]);

        const casesHomeData = await casesHomeRes.json();
        const categoriesData = await categoriesRes.json();

        setCaseHomes(casesHomeData);
        setCategories(categoriesData);
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

        {/* 🔽 Категории */}
        <div className={classes.categoryMenu}>
          {categories.map((cat) => (
            <span key={cat.id} className={classes.categoryItem}>
              {cat.title}
            </span>
          ))}
        </div>

        {/* 🔽 Кейсы */}
        <div className={classes.containerCaseMenu}>
          {caseHomes.map((item) => (
            <div key={item.id} className={classes.caseItem}>
              <img src={`${uploadsConfig}${item.img[0]}`} alt={item.name} />
              <div>{item.name}</div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
