function transliterate(str) {
  const ru = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z",
    и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
    с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch",
    ы: "y", э: "e", ю: "yu", я: "ya", " ": "-", ь: "", ъ: "", "ё": "yo"
  };
  return str.split('').map(char => ru[char.toLowerCase()] || char).join('');
}

import React, { useEffect, useState } from 'react';
import classes from './CasesPage.module.css';
import serverConfig from '../../../serverConfig';
import uploadsConfig from '../../../uploadsConfig';
import CaseHomeCard from '../../ui/HomePage/CaseHomeCard';
import { useNavigate, useParams } from 'react-router-dom';

export default function CasesPage() {
  const [caseHomes, setCaseHomes] = useState([]);
  const [categories, setCategories] = useState([]); // 🆕 категории
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false); // Состояние для открытия/закрытия меню категорий
  const [selectedCategory, setSelectedCategory] = useState(null); // Состояние для выбранной категории
  const [searchQuery, setSearchQuery] = useState(''); // Состояние для поиска

  const navigate = useNavigate();
   const { categoryTitle } = useParams();

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

  const toggleCategoryMenu = () => {
    setIsCategoryMenuOpen((prevState) => !prevState); // Переключаем состояние меню
  };

  const closeCategoryMenu = () => {
    setIsCategoryMenuOpen(false); // Закрываем меню
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId); // Устанавливаем выбранную категорию
    setIsCategoryMenuOpen(false); // Закрываем меню после выбора
  };

  // Обработчик для поиска
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Обновляем состояние с запросом
  };

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

          <button onClick={toggleCategoryMenu}>НАПРАВЛЕНИЕ</button>{' '}
          {/* Кнопка для переключения меню */}
        </div>

        {/* 🔽 Категории */}
        <div className={classes.categoryMenu}>
          {categories.map((cat) => (
            <span
              key={cat.id}
              className={classes.categoryItem}
              onClick={() => handleCategorySelect(cat.id)} // Обработчик для выбора категории
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
              onClick={() => navigate(`/${transliterate(cat.title.toLowerCase())}`)} // Обработчик для выбора категории
            >
              {cat.title}
            </span>
          ))}
        </div>

        {/* 🔽 Кейсы */}
      </div>
      <CaseHomeCard caseHomes={filteredCaseHomes} /> {/* Отображаем фильтрованные кейсы */}
    </div>
  );
}
