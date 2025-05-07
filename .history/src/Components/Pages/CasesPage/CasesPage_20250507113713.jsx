import React, { useEffect, useState } from 'react';
import classes from './CasesPage.module.css';
import serverConfig from '../../../serverConfig';
import CaseHomeCard from '../../ui/HomePage/CaseHomeCard';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function CasesPage() {
  const [caseHomes, setCaseHomes] = useState([]);
  const [categories, setCategories] = useState([]); // 🆕 категории
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false); // Состояние для открытия/закрытия меню категорий
  const [selectedCategory, setSelectedCategory] = useState(null); // Состояние для выбранной категории
  const [searchQuery, setSearchQuery] = useState(''); // Состояние для поиска

  const navigate = useNavigate();
  const { categoryTitle } = useParams(); // Получаем название категории из URL
  const location = useLocation();

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

  // Обработчик для поиска
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Обновляем URL с параметром поиска
    navigate(`?search=${query}${categoryTitle ? `&category=${categoryTitle}` : ''}`);
  };

  // Обработчик для выбора категории
  const handleCategorySelect = (categoryId, categoryTitle) => {
    setSelectedCategory(categoryId);
    // Обновляем URL с параметром категории
    navigate(`/cases/${categoryTitle}?search=${searchQuery}`);
  };

  // Фильтруем кейсы по выбранной категории и запросу поиска
  const filteredCaseHomes = caseHomes.filter((caseHome) => {
    const matchesCategory = selectedCategory
      ? caseHome.categories.some((category) => category.id === selectedCategory)
      : true;

    const matchesSearchQuery = caseHome.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearchQuery;
  });

  // Извлекаем параметры из URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    const category = params.get('category');
    
    setSearchQuery(search);

    if (category) {
      setSelectedCategory(category);
    }

  }, [location.search]);

  return (
    <div className={classes.container}>
      <div className={classes.containerCase}>
        <div className={classes.containerCaseTop}>
          <div className={classes.containerCaseTopName}>
            <span>НАШИ</span>
            <span>КЕЙСЫ</span>
          </div>

          {/* Поле поиска */}
          <input
            type="text"
            placeholder="ПОИСК"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <button onClick={() => setIsCategoryMenuOpen((prev) => !prev)}>НАПРАВЛЕНИЕ</button>{' '}
          {/* Кнопка для переключения меню */}
        </div>

        {/* 🔽 Категории */}
        <div className={classes.categoryMenu}>
          {categories.map((cat) => (
            <span
              key={cat.id}
              className={classes.categoryItem}
              onClick={() => handleCategorySelect(cat.id, cat.title)} // Обработчик для выбора категории
            >
              {cat.title}
            </span>
          ))}
        </div>

        {/* 🔽 Мобильное меню с категориями */}
        <div
          className={`${classes.categoryMenuMobil} ${
            isCategoryMenuOpen ? classes.open : ''
          }`}
        >
          {categories.map((cat) => (
            <span
              key={cat.id}
              className={classes.categoryItemMobil}
              onClick={() => handleCategorySelect(cat.id, cat.title)} // Обработчик для выбора категории
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
