import React from 'react';
import classes from './Cases.module.css';
import { useNavigate } from 'react-router-dom';

function Cases({ children, ...props }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isShopPage = location.pathname.includes('/shop');

  const [currentPage, setCurrentPage] = useState(0);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загрузка товаров
        const categoriesResponse = await fetch(`${serverConfig}/categories`);
        const categoriesData = await categoriesResponse.json();
        console.log('Loaded categories:', categoriesData); // Логируем полученные данные
        setCategories(categoriesData);

        // Загрузка других данных, если необходимо
        // const busSolutionsResponse = await fetch('https://your-api-endpoint.com/solutions');
        // const busSolutionsData = await busSolutionsResponse.json();
        // setBusSolutions(busSolutionsData);

        // const newsResponse = await fetch(`${serverConfig}/news`);
        // const newsData = await newsResponse.json();
        // setNews(newsData);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.containerTop}>
          <div>
            <span>НАШИ</span> <span>КЕЙСЫ</span>
          </div>
          <img
            src="/images/Arrow1.png"
            alt=""
            onClick={() => navigate('/cases')}
          />
        </div>
        <div className={classes.containerBottom}>
          <button>ЛОГОТИП И ФИРСТИЛЬ</button>
          <button>WEB-ДИЗАЙН</button>
          <button>МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ</button>
          <button>ПРЕЗЕНТАЦИИ</button>
          <button>РЕКЛАМНАЯ ПРОДУКЦИЯ</button>
          <button>ВИДЕО</button>
        </div>
      </div>
    </>
  );
}

export default Cases;
