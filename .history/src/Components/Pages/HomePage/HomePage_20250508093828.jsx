// src/components/pages/HomePage/HomePage.jsx
import React, { useEffect, useState } from 'react';
import classes from './HomePage.module.css';
import serverConfig from '../../../serverConfig';
import CaseHomeCard from '../../ui/HomePage/CaseHomeCard';
import CaseModal from '../../ui/CaseModal/CaseModal';
import { useNavigate, useParams } from 'react-router-dom';

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
    э: 'e',
    ю: 'yu',
    я: 'ya',
    ' ': '-',
    ь: '',
    ъ: '',
    ё: 'yo',
  };
  return str
    .split('')
    .map((char) => ru[char.toLowerCase()] || char)
    .join('');
}

export default function HomePage() {
  const [caseHomes, setCaseHomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { categoryTitle } = useParams();
  const navigate = useNavigate();
  const { id: selectedCaseId } = useParams(); // ← читаем ID из URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [casesHomeRes, categoriesRes] = await Promise.all([
          fetch(`${serverConfig}/casesHome`),
          fetch(`${serverConfig}/categories`),
        ]);
        setCaseHomes(await casesHomeRes.json());
        setCategories(await categoriesRes.json());
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
      }
    };
    fetchData();
  }, []);

  const filteredCaseHomes = categoryTitle
    ? caseHomes.filter((caseHome) =>
        caseHome.categories.some(
          (category) =>
            transliterate(category.title.toLowerCase()) ===
            categoryTitle.toLowerCase()
        )
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
          <img
            src="/images/Arrow 1.png"
            onClick={() => navigate('cases')}
            alt="Arrow"
          />
        </div>

        <div className={classes.categoryMenu}>
          {categories.map((cat) => (
            <span
              key={cat.id}
              className={classes.categoryItem}
              onClick={() =>
                navigate(`/${transliterate(cat.title.toLowerCase())}`)
              }
            >
              {cat.title}
            </span>
          ))}
        </div>
      </div>

      <CaseHomeCard
        caseHomes={filteredCaseHomes}
        onClickCase={(id) => navigate(`/case/${id}`)}
      />

      {selectedCaseId && (
        <CaseModal
          caseId={selectedCaseId}
          onClose={() => navigate(-1)} // возвращаемся назад
        />
      )}
    </div>
  );
}
