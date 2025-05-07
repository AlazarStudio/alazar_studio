import React, { useEffect, useState } from 'react';
import classes from './HomePage.module.css';
import serverConfig from '../../../serverConfig';
import uploadsConfig from '../../../uploadsConfig';
import CaseHomeCard from '../../ui/HomePage/CaseHomeCard';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [caseHomes, setCaseHomes] = useState([]);
  const [categories, setCategories] = useState([]); // 🆕 категории
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false); // Состояние для открытия/закрытия меню категорий
  const [selectedCategory, setSelectedCategory] = useState(null); // Состояние для выбранной категории
  const [searchQuery, setSearchQuery] = useState(''); // Состояние для поиска

  const navigate = useNavigate();

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



  // Фильтруем кейсы, чтобы показать только те, которые относятся к выбранной категории и соответствуют запросу поиска
  const filteredCaseHomes = caseHomes.filter((caseHome) => {
    const matchesCategory = selectedCategory
      ? caseHome.categories.some((category) => category.id === selectedCategory)
      : true;

    const matchesSearchQuery = caseHome.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearchQuery;
  });

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
          <img src="/images/Arrow 1.png" onClick={() => navigate('cases')} />
        </div>

        {/* 🔽 Категории */}
        <div className={classes.categoryMenu}>
          {categories.map((cat) => (
            <span key={cat.id} className={classes.categoryItem} onClick={() => navigate(`/cases/${cat.id}`)}>
              {cat.title}
            </span>
          ))}
        </div>

        {/* 🔽 Кейсы */}
      </div>
      <CaseHomeCard caseHomes={caseHomes} />
    </div>
  );
}
