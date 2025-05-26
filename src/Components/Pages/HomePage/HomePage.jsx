// src/components/pages/HomePage/HomePage.jsx
import React, { useEffect, useState } from 'react';
import classes from './HomePage.module.css';
import serverConfig from '../../../serverConfig';
import CaseHomeCard from '../../ui/HomePage/CaseHomeCard';
import CaseModal from '../../ui/CaseModal/CaseModal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
    ь: "'",
    э: 'e',
    ю: 'yu',
    я: 'ya',
    ' ': '-',
    ь: "'",
    ъ: '',
    ё: 'yo',
  };
  return str
    .split('')
    .map((char) => ru[char.toLowerCase()] || char)
    .join('');
}

export default function HomePage() {
  const [cases, setCases] = useState([]);
  const [categories, setCategories] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const encodeSlug = (str) => str.replace(/\s+/g, '-');
  const decodeSlug = (str) => str.replace(/-/g, ' ');

  // Загрузка данных
  useEffect(() => {
    Promise.all([
      fetch(`${serverConfig}/cases`).then((res) => res.json()),
      fetch(`${serverConfig}/categories`).then((res) => res.json()),
      fetch(`${serverConfig}/developers`).then((res) => res.json()),
    ]).then(([caseData, categoryData, developerData]) => {
      setCases(caseData);
      setCategories(categoryData);
      setDevelopers(developerData);
    });
  }, []);

  // Анализ pathname → category / case
useEffect(() => {
  if (!categories.length || !cases.length) return;

  const path = decodeURIComponent(location.pathname).slice(1);
  const parts = path.split('/').filter(Boolean);
  const [part1, part2] = parts;

  const category = categories.find(
    (cat) => transliterate(cat.name.toLowerCase()) === part1?.toLowerCase()
  );
  const caseFromFirst = cases.find(
    (c) => transliterate(c.title.toLowerCase()) === part1?.toLowerCase()
  );
  const caseFromSecond = cases.find(
    (c) => transliterate(c.title.toLowerCase()) === part2?.toLowerCase()
  );

  if (category && activeCategoryId !== category.id) {
    setActiveCategoryId(category.id);
  }

  const targetCase = caseFromSecond || caseFromFirst;

  if (targetCase) {
    setSelectedCase(targetCase);
    setDrawerVisible(true); // теперь drawer открывается ТОЛЬКО здесь
  }
}, [location.pathname, categories, cases]);


  const filteredCases = activeCategoryId
    ? cases.filter((c) => c.categoryIds.includes(activeCategoryId))
    : cases;

  const handleCategorySelect = (id) => {
    const category = categories.find((cat) => cat.id === id);
    if (!category) return;

    // СРАЗУ ставим активную категорию
    setActiveCategoryId(id);

    // Навигация нужна только если хотим синхронизировать URL
    navigate(`/${transliterate(category.name.toLowerCase())}`);
  };

  const handleCaseClick = (c) => {
    const caseSlug = transliterate(c.title.toLowerCase());
    const category = categories.find((cat) => cat.id === activeCategoryId);
    const currentPath = decodeURIComponent(location.pathname);

    const targetPath = category
      ? `/${transliterate(category.name.toLowerCase())}/${caseSlug}`
      : `/${caseSlug}`;

    if (currentPath !== targetPath) {
      navigate(targetPath); // URL обновится, useEffect сработает
    } else {
      // если URL не меняется, принудительно обнови state
      setSelectedCase(c);
      setDrawerVisible(true);
    }
  };

 const handleCloseModal = () => {
  const category = categories.find((cat) => cat.id === activeCategoryId);

  // Сначала навигируем на URL без кейса
  if (category) {
    navigate(`/${transliterate(category.name.toLowerCase())}`);
  } else {
    navigate(`/`);
  }

  // После этого скрываем модалку и сбрасываем selectedCase
  setTimeout(() => {
    setDrawerVisible(false);
    setSelectedCase(null);
  }, 300); // длительность анимации
};


  const pseudoRandom = (id) => {
    const str = String(id);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash % 10000);
  };

  const pinnedCases = filteredCases
    .filter((c) => c.positionTop && !isNaN(Number(c.positionTop)))
    .sort((a, b) => Number(a.positionTop) - Number(b.positionTop));

  const unpinnedCases = filteredCases
    .filter((c) => !c.positionTop || isNaN(Number(c.positionTop)))
    .sort((a, b) => pseudoRandom(a.id) - pseudoRandom(b.id));

  const finalCases = [...pinnedCases, ...unpinnedCases];

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
          <img
            src="/images/Arrow 1.png"
            onClick={() => navigate('cases')}
            alt="Arrow"
          />
        </div>

        <div className={classes.categoryMenu}>
          <span
            className={`${classes.categoryItem} ${
              activeCategoryId === null ? classes.active : ''
            }`}
            onClick={() => {
              setActiveCategoryId(null);
              navigate('/');
            }}
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
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>
      <div className={classes.casesContainer}>
        {finalCases.map((c) => (
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
