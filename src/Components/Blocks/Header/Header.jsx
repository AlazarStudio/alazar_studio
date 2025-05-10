import React, { useEffect, useState } from 'react';
import classes from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import serverConfig from '../../../serverConfig';

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
  };
  return str
    .split('')
    .map((char) => ru[char.toLowerCase()] || char)
    .join('');
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${serverConfig}/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Ошибка загрузки категорий:', err);
      }
    };

    fetchCategories();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={classes.container}>
      <div
        className={`${classes.containerNav} ${
          isScrolled ? classes.scrolled : ''
        }`}
      >
        <ul>
          <li>
            <img
              src="/images/headerLogo.png"
              alt="Логотип"
              className={classes.logo}
              onClick={() => navigate('/')}
            />
          </li>
          <li>
            <Link to="/">ВСЕ</Link>
          </li>

          {categories.map((cat) => (
            <li key={cat.id}>
              <Link to={`/${transliterate(cat.title.toLowerCase())}`}>
                {cat.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Мобильная версия */}
      <div
        className={`${classes.containerNavMobile} ${
          isScrolled ? classes.scrolled : ''
        }`}
      >
        <img
          src="/images/LogoAlazarM.png"
          alt="Логотип"
          className={classes.logoMobile}
          onClick={() => navigate('/')}
        />

        {/* Иконка меню, по клику открывается меню */}
        <img
          src="/images/headerMobil.png"
          alt="Меню"
          className={classes.menuIcon}
          onClick={toggleMenu}
        />

        {/* Блок с меню */}
        <div
          className={`${classes.menu} ${isMenuOpen ? classes.open : ''}`}
          onClick={closeMenu}
        >
          <ul>
            <li>
              <Link to="/">ВСЕ</Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link to={`/${transliterate(cat.title.toLowerCase())}`}>
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
