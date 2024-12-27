import React, { useEffect, useState } from 'react';
import classes from './CasesMenu.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import serverConfig from '../../../serverConfig';

function CasesMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const isShopPage = location.pathname.includes('/shop');


  const [currentPage, setCurrentPage] = useState(0);

  const [news, setNews] = useState([]);
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





  // const handleNewsClick = (id) => {
  //   navigate(`/categories/${id}`); // Перенаправляем на страницу с деталями новости
  // };



  return (
    <div className={classes.container}>
      <div className={classes.containerTop}>
        <span>НАШИ</span> <span>КЕЙСЫ</span>
      </div>
      <div className={classes.containerBottom}>
        {categories.map((el) => (
          <button
            key={el.id}
            onClick={() =>
              navigate(isShopPage ? `/shop/${el.id}` : `/cases/${el.id}`)
            }
          >
            {el.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CasesMenu;
