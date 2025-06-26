import React, { useEffect, useState } from 'react';
import classes from './AllCasesPage.module.css';
import serverConfig from '../../../serverConfig';
import CaseHomeCard from '../../ui/HomePage/CaseHomeCard';
import CaseModal from '../../ui/CaseModal/CaseModal';
import { useLocation, useNavigate } from 'react-router-dom';

function transliterate(str) {
  const ru = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
    ' ': '-',
    ъ: '',
    '’': '',
    '“': '',
    '”': '',
    '«': '',
    '»': '',
  };
  return str
    .split('')
    .map((char) => ru[char.toLowerCase()] || char)
    .join('');
}

export default function AllCasesPage() {
  const [cases, setCases] = useState([]);
  const [categories, setCategories] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Задержка поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Загрузка данных
  useEffect(() => {
    const load = async () => {
      const [resCases, resCategories, resDevs] = await Promise.all([
        fetch(`${serverConfig}/cases`),
        fetch(`${serverConfig}/categories`),
        fetch(`${serverConfig}/developers`),
      ]);
      setCases(await resCases.json());
      setCategories(await resCategories.json());
      setDevelopers(await resDevs.json());
    };
    load();
  }, []);

  // Парсинг URL и открытие кейса
  useEffect(() => {
    if (!cases.length || !categories.length) return;

    const path = decodeURIComponent(location.pathname).replace(
      /^\/cases\/?/,
      ''
    );
    const parts = path.split('/').filter(Boolean);
    const [part1, part2] = parts;

    const categorySlug = part2 ? part1 : null;
    const caseSlug = part2 || part1;

    const matchedCategory = categories.find(
      (cat) => transliterate(cat.name.toLowerCase()) === categorySlug
    );
    const matchedCase = cases.find(
      (c) =>
        transliterate(c.title.replace(/["'«»„“]/g, '').toLowerCase()) ===
        caseSlug
    );

    if (matchedCategory) setActiveCategoryId(matchedCategory.id);
    if (matchedCase) {
      setSelectedCase(matchedCase);
      setDrawerVisible(true);
    }
  }, [location.pathname, cases, categories]);

  // Фильтрация
  const filteredCases = (
    activeCategoryId
      ? cases.filter((c) => c.categoryIds.includes(activeCategoryId))
      : cases
  )
    .filter((c) => !c.shop)
    .filter((c) =>
      c.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

  const pseudoRandom = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash % 10000);
  };

  const sortedCases = [
    ...filteredCases
      .filter((c) => c.positionTop)
      .sort((a, b) => a.positionTop - b.positionTop),
    ...filteredCases
      .filter((c) => !c.positionTop)
      .sort((a, b) => pseudoRandom(a.id) - pseudoRandom(b.id)),
  ];

  const handleCategorySelect = (id) => {
    const category = categories.find((cat) => cat.id === id);
    setActiveCategoryId(id);
    navigate(`/cases/${transliterate(category.name.toLowerCase())}`);
  };

  const handleCaseClick = (c) => {
    const slug = transliterate(c.title.replace(/["'«»„“]/g, '').toLowerCase());
    const category = categories.find((cat) => cat.id === activeCategoryId);
    const path = category
      ? `/cases/${transliterate(category.name.toLowerCase())}/${slug}`
      : `/cases/${slug}`;
    navigate(path);
  };

  const handleCloseModal = () => {
    const category = categories.find((cat) => cat.id === activeCategoryId);
    navigate(
      category
        ? `/cases/${transliterate(category.name.toLowerCase())}`
        : `/cases`
    );
    setTimeout(() => {
      setDrawerVisible(false);
      setSelectedCase(null);
    }, 300);
  };

  return (
    <div className={classes.container}>
      <div className={classes.containerCase}>
        <div className={classes.containerCaseTop}>
          <div className={classes.containerCaseTopName}>
            <span>НАШИ</span>
            <span>КЕЙСЫ</span>
          </div>
        </div>
        <div className={classes.searchInput}>
          <input
            type="text"
            placeholder="ПОИСК"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={classes.input}
          />
        </div>
        <div className={classes.categoryMenu}>
          <span
            className={`${classes.categoryItem} ${
              activeCategoryId === null ? classes.active : ''
            }`}
            onClick={() => {
              setActiveCategoryId(null);
              navigate('/cases');
            }}
            data-cursor-hover
            data-cursor-text="Показать"
          >
            Все
          </span>
          {categories.map((cat) => (
            <span
              key={cat.id}
              className={`${classes.categoryItem} ${
                activeCategoryId === cat.id ? classes.active : ''
              }`}
              onClick={() => handleCategorySelect(cat.id)}
              data-cursor-hover
              data-cursor-text="Показать"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      <div className={classes.casesContainer}>
        {sortedCases.map((c) => (
          <div
            key={c.id}
            className={classes.caseBox}
            onClick={() => handleCaseClick(c)}
          >
            <CaseHomeCard caseItem={c} allCategories={categories} />
          </div>
        ))}
      </div>

      <CaseModal
        key={selectedCase?.id}
        open={drawerVisible}
        onClose={handleCloseModal}
        caseItem={selectedCase}
        allDevelopers={developers}
        allCategories={categories}
      />
    </div>
  );
}
