import React, { useEffect, useState } from 'react';
import classes from './HomePage.module.css';
import serverConfig from '../../../serverConfig';
import uploadsConfig from '../../../uploadsConfig';
import CaseHomeCard from '../../ui/HomePage/CaseHomeCard';
import { useNavigate, useParams } from 'react-router-dom';

export default function HomePage() {
  const [caseHomes, setCaseHomes] = useState([]);
  const [categories, setCategories] = useState([]); // 🆕 категории
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { categoryId } = useParams(); // Получаем id категории из URL

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загружаем кейсы и категории параллельно
        const [casesHomeRes, categoriesRes] = await Promise.all([
          fetch(`${serverConfig}/casesHome`),
          fetch(`${serverConfig}/categories`),
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

  // Фильтруем кейсы, если выбран categoryId
  const filteredCaseHomes = categoryId
    ? caseHomes.filter((caseHome) =>
        caseHome.categories.some((category) => category.title === parseInt(categoryId))
      )
    : caseHomes;

  return (
    <div className={classes.container}>
      <div className={classes.containerLogo}>
        <img src="/images/logoA.png" alt="Logo A" />
        <div className={classes.containerLogoCenter}>
          <img src="/images/logoAlazar.png" alt="Logo Alazar" />
          <img src="/images/logoStudio.png" alt="Logo Studio" />
        </div>
        <span>СТУДИЯ WEB-РАЗРАБОТКИ И ГРАФИЧЕСКОГО ДИЗАЙНА</span>
      </div>

      <div className={classes.containerCase}>
        <div className={classes.containerCaseTop}>
          <div className={classes.containerCaseTopName}>
            <span>НАШИ</span>
            <span>КЕЙСЫ</span>
          </div>
          <img src="/images/Arrow 1.png" onClick={() => navigate('cases')} alt="Arrow" />
        </div>

        {/* 🔽 Категории */}
        <div className={classes.categoryMenu}>
          {categories.map((cat) => (
            <span
              key={cat.id}
              className={classes.categoryItem}
              onClick={() => navigate(`/cases/${cat.title}`)} // Навигация с категорией в URL
            >
              {cat.title}
            </span>
          ))}
        </div>
      </div>

      {/* 🔽 Отображаем фильтрованные кейсы */}
      <CaseHomeCard caseHomes={filteredCaseHomes} />
    </div>
  );
}
