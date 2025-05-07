import React, { useEffect, useState } from 'react';
import classes from './CasesPage.module.css';
import serverConfig from '../../../serverConfig';
import CaseHomeCard from '../../ui/HomePage/CaseHomeCard';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

// Функция для транслитерации
function transliterate(str) {
  const ru = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z",
    и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
    с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch",
    ы: "y", э: "e", ю: "yu", я: "ya", " ": "-", ь: "", ъ: "", "ё": "yo"
  };
  return str.split('').map(char => ru[char.toLowerCase()] || char).join('');
}

export default function CasesPage() {
  const [caseHomes, setCaseHomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { categoryTitle } = useParams(); // Получаем название категории из URL

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

  // Обновляем URL с параметрами поиска и категории
  const updateUrl = (search, categoryTitle) => {
    const queryParams = new URLSearchParams(location.search);
    if (search) queryParams.set('search', search);
    if (categoryTitle) queryParams.set('category', categoryTitle);
    
    // Обновляем URL без перехода на другую страницу
    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  // Обработчик для поиска
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Обновляем URL с параметром поиска
    updateUrl(query, selectedCategory);
  };

  // Обработчик для выбора категории
  const handleCategorySelect = (categoryId, categoryTitle) => {
    setSelectedCategory(categoryId);
    // Обновляем URL с транслитерированным параметром категории
    navigate(`/cases/${transliterate(categoryTitle.toLowerCase())}`);
    updateUrl(searchQuery, categoryTitle);
    setIsCategoryMenuOpen(false); // Закрываем меню после выбора
  };

  // Фильтруем кейсы, чтобы показать только те, которые относятся к выбранной категории и соответствуют запросу поиска
  const filteredCaseHomes = caseHomes.filter((caseHome) => {
    const matchesCategory = selectedCategory
      ? caseHome.categories.some((category) => category.id === selectedCategory)
      : true;

    const matchesSearchQuery = caseHome.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearchQuery;
  });

  // Извлекаем параметры из URL при монтировании компонента
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    const category = params.get('category');
    
    setSearchQuery(search);

    if (category) {
      // Ищем категорию с соответствующим названием
      const categoryFromUrl = categories.find(cat => transliterate(cat.title.toLowerCase()) === category);
      if (categoryFromUrl) {
        setSelectedCategory(categoryFromUrl.id);
      }
    }
  }, [location.search, categories]);

  return (
    <div className={classes.container}>
      <div className={classes.containerCase}>
        <div className={classes.containerCaseTop}>
          <div className={classes.containerCaseTopName}>
            <span>НАШИ</span>
            <span>КЕЙСЫ</span>
          </div>
          <input
            type="text"
            placeholder="ПОИСК"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button onClick={() => setIsCategoryMenuOpen(prev => !prev)}>НАПРАВЛЕНИЕ</button>
        </div>

        {/* Категории */}
        <div className={classes.categoryMenu}>
          {categories.map((cat) => (
            <span
              key={cat.id}
              className={classes.categoryItem}
              onClick={() => navigate(`/cases/${transliterate(cat.title.toLowerCase())}`)} // Обработчик для выбора категории
            >
              {cat.title}
            </span>
          ))}
        </div>

        {/* Мобильное меню с категориями */}
        <div className={`${classes.categoryMenuMobil} ${isCategoryMenuOpen ? classes.open : ''}`}>
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

      {/* Отображаем фильтрованные кейсы */}
      <CaseHomeCard caseHomes={filteredCaseHomes} />
    </div>
  );
}
