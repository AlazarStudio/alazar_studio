import React, { useEffect, useState } from 'react';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

import CasesMenu from '../../ui/CasesPage/CasesMenu';
import DrPhone from '../../ui/CasesPage/DrPhone/DrPhone';
import VeloMoto from '../../ui/CasesPage/VeloMoto/VeloMoto';
import Advocate from '../../ui/CasesPage/Advocate/Advocate';
import Attraction from '../../ui/CasesPage/Attraction/Attraction';
import Business from '../../ui/CasesPage/Business/Business';
import { useNavigate, useParams } from 'react-router-dom';
import serverConfig from '../../../serverConfig';
import axios from 'axios';

function CasesPage() {
  const { id } = useParams();
  const categoryId = parseInt(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загрузка категорий
        const categoriesResponse = await fetch(`${serverConfig}/categories`);
        const categoriesData = await categoriesResponse.json();
        console.log('Loaded categories:', categoriesData); // Логируем полученные данные
        setCategories(categoriesData);

        //Загрузка товаров
        const productsResponse = await fetch(`${serverConfig}/products`);
        const productsData = await productsResponse.json();
        console.log('Loaded products:', productsData); // Логируем полученные данные
        setProducts(productsData);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProductsByCategory = (categoryId) => {
    return products.filter((product) => product.categoryId === categoryId);
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc'); // Состояние для порядка сортировки

  const productsInCategory = getProductsByCategory(selectedCategoryId);

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
    setCurrentPage(0);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(0); // Сбрасываем страницу при изменении сортировки
  };

  const offset = currentPage * itemsPerPage;

  // Сортировка продуктов
  const sortedProducts = [...productsInCategory].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price; // По возрастанию цены
    } else {
      return b.price - a.price; // По убыванию цены
    }
  });



  const goToProductPage = (productId) => {
    navigate(`/product/${productId}`);
  };
  return (
    <CenterBlock>
      <WidthBlock>
        <CasesMenu />
        <DrPhone />
        <VeloMoto />
        <Advocate />
        <Attraction />
        <Business />
      </WidthBlock>
    </CenterBlock>
  );
}

export default CasesPage;
