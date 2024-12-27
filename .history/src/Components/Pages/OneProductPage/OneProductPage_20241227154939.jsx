import React, { useEffect, useState } from 'react';
import classes from './OneProductPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import serverConfig from '../../../serverConfig';

function OneProductPage({ children, ...props }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null); // Товар по ID
  const [products, setProducts] = useState([]); // Все товары
  const [mainImg, setMainImg] = useState(''); // Изображение товара
  const [mainDescription, setMainDescription] = useState(''); // Здесь будет описание или характеристики
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получение данных с сервера
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запрос на один товар
        const productResponse = await axios.get(
          `${serverConfig}/products/${productId}`
        );
        const fetchedProduct = productResponse.data;

        // Запрос на все товары
        const allProductsResponse = await axios.get(`${serverConfig}/products`);
        const allProducts = allProductsResponse.data;

        // Установка состояний
        setProduct(fetchedProduct);
        setProducts(allProducts);

        // Если у товара только одно изображение, показываем его сразу
        if (fetchedProduct.img && fetchedProduct.img.length > 0) {
          setMainImg(
            fetchedProduct.img.length === 1
              ? fetchedProduct.img[0]
              : fetchedProduct.img[1]
          );
        }

        setMainDescription(fetchedProduct.description); // По умолчанию показываем описание
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError('Не удалось загрузить данные.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <CenterBlock>
        <WidthBlock>
          <h1>Загрузка...</h1>
        </WidthBlock>
      </CenterBlock>
    );
  }

  if (error) {
    return (
      <CenterBlock>
        <WidthBlock>
          <h1>{error}</h1>
        </WidthBlock>
      </CenterBlock>
    );
  }

  if (!product) {
    return (
      <CenterBlock>
        <WidthBlock>
          <h1>Продукт не найден</h1>
        </WidthBlock>
      </CenterBlock>
    );
  }

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <div className={classes.containerTop}>
              <div className={classes.containerTopLeft}>
                <span>{</span>
                <span>LUNA</span>
                <span>Салон красоты</span>
              </div>
              <div className={classes.containerTopRight}>
                <img src="/images/test.png" />
              </div>
            </div>
            <div className={classes.containerBottom}>
              <span>ЛОГОТИП И ФИРСТИЛЬ</span>
              <span>ЛОГОТИП И ФИРСТИЛЬ</span>
              <span>ЛОГОТИП И ФИРСТИЛЬ</span>
              <span>ЛОГОТИП И ФИРСТИЛЬ</span>
              <span>ЛОГОТИП И ФИРСТИЛЬ</span>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneProductPage;
