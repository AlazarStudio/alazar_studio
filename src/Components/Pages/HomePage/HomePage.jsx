import React, { useEffect, useRef, useState } from 'react';
import classes from './HomePage.module.css';
import serverConfig from '../../../serverConfig';
import CaseHomeCard from '../../ui/HomePage/CaseHomeCard';
import CaseModal from '../../ui/CaseModal/CaseModal';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoParticles from '../../ui/HomePage/LogoParticles/LogoParticles';

function transliterate(str) {
  const ru = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z',
    и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's',
    т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ы: 'y',
    ь: "'", э: 'e', ю: 'yu', я: 'ya', ' ': '-', ъ: '',
  };
  return str.split('').map((char) => ru[char.toLowerCase()] || char).join('');
}

export default function HomePage() {
  const [cases, setCases] = useState([]);
  const [categories, setCategories] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [caseSlugFromURL, setCaseSlugFromURL] = useState(null);

  const scrollYRef = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = decodeURIComponent(location.pathname).slice(1);
    const parts = path.split('/').filter(Boolean);
    const slug = parts.length === 2 ? parts[1] : parts[0] || null;
    setCaseSlugFromURL(slug);
  }, [location.pathname]);

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

  useEffect(() => {
    if (!cases.length || !caseSlugFromURL) return;

    const timer = setTimeout(() => {
      const foundCase = cases.find(
        (c) =>
          transliterate(c.title.toLowerCase().replace(/["'«»„“]/g, '')) ===
          caseSlugFromURL.toLowerCase()
      );
      if (foundCase) {
        setSelectedCase(foundCase);
        setDrawerVisible(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [cases, caseSlugFromURL]);

  const handleCategorySelect = (id) => {
    const category = categories.find((cat) => cat.id === id);
    if (!category) return;
    scrollYRef.current = window.scrollY;
    setActiveCategoryId(id);
    navigate(`/${transliterate(category.name.toLowerCase())}`);
  };

  const handleCaseClick = (c) => {
    const cleanTitle = c.title.replace(/["'«»„“]/g, '');
    const caseSlug = transliterate(cleanTitle.toLowerCase());
    const category = categories.find((cat) => cat.id === activeCategoryId);

    const targetPath = category
      ? `/${transliterate(category.name.toLowerCase())}/${caseSlug}`
      : `/${caseSlug}`;

    scrollYRef.current = window.scrollY;
    setSelectedCase(c);
    setDrawerVisible(true);
    navigate(targetPath);
  };

  const handleCloseModal = () => {
    const category = categories.find((cat) => cat.id === activeCategoryId);
    if (category) navigate(`/${transliterate(category.name.toLowerCase())}`);
    else navigate(`/`);

    setTimeout(() => {
      setDrawerVisible(false);
      setSelectedCase(null);
    }, 300);
  };

  const filteredCases = (
    activeCategoryId
      ? cases.filter((c) => c.categoryIds.includes(activeCategoryId))
      : cases
  ).filter((c) => !c.shop);

  return (
    <div className={classes.container}>
      <div className={classes.containerLogoCanvas}>
        <LogoParticles scaleX={1} scaleY={1.4} />
      </div>

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
            data-cursor-hover
            data-cursor-text="Перейти"
          />
        </div>

        <div className={classes.categoryMenu}>
          <span
            className={`${classes.categoryItem} ${
              activeCategoryId === null ? classes.active : ''
            }`}
            data-cursor-hover
            data-cursor-text="Показать"
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
              data-cursor-hover
              data-cursor-text="Показать"
              onClick={() => handleCategorySelect(cat.id)}
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      <div className={classes.casesContainer}>
        {filteredCases.map((c) => (
          <div
            key={c.id}
            className={`${classes.caseBox}`}
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