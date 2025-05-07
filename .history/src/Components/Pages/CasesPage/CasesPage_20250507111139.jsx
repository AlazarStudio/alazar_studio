import React, { useEffect, useState } from 'react';
import classes from './CasesPage.module.css';
import serverConfig from '../../../serverConfig';
import uploadsConfig from '../../../uploadsConfig';
import CaseHomeCard from '../../ui/HomePage/CaseHomeCard';
import { useNavigate } from 'react-router-dom';

export default function CasesPage() {
  const [caseHomes, setCaseHomes] = useState([]);
  const [categories, setCategories] = useState([]); // 🆕 категории
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false); // Состояние для открытия/закрытия меню категорий
  const [selectedCategory, setSelectedCategory] = useState(null); // Состояние для выбранной категории

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

  // Фильтруем кейсы по выбранной категории
  const filteredCaseHomes = selectedCategory
    ? caseHomes.filter((caseHome) => caseHome.categoryId === selectedCategory)
    : caseHomes;

    console.log(caseHomes);
console.log(categories);


  return (
    <div className={classes.container}>
      <div className={classes.containerCase}>
        <div className={classes.containerCaseTop}>
          <div className={classes.containerCaseTopName}>
            <span>НАШИ</span>
            <span>КЕЙСЫ</span>
          </div>
          <input placeholder="ПОИСК" />
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
              onClick={() => handleCategorySelect(cat.id)} // Обработчик для выбора категории
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
