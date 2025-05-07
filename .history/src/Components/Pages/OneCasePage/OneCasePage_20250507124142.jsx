import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import serverConfig from '../../../serverConfig'; // Ваш серверный конфиг
import classes from './OneCasePage.module.css'; // Стили для страницы кейса
import uploadsConfig from '../../../uploadsConfig'; // Конфиг для загрузок

export default function OneCasePage() {
  const { categoryTitle, id } = useParams(); // Получаем categoryTitle и id из URL
  const [caseData, setCaseData] = useState(null); // Для хранения данных о кейсе
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Ошибка, если что-то пойдет не так

  useEffect(() => {
    const fetchCaseData = async () => {
      setLoading(true);
      try {
        // Замените URL на ваш серверный эндпоинт для получения данных по ID кейса
        const response = await fetch(`${serverConfig}/casesHome/${id}`);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        const data = await response.json();
        setCaseData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseData();
  }, [id]); // Загрузка данных при изменении ID

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={classes.container}>
      {caseData ? (
        <div className={classes.caseDetails}>
          <span className={classes.caseDetailsTitle}>{caseData.name}</span>
          <div className={classes.caseImages}>
            {caseData.img && caseData.img.length > 0 ? (
              caseData.img.map((img, index) => (
                <div key={index} className={classes.caseImage}>
                  <img
                    src={`${uploadsConfig}${img}`}
                    alt={`${caseData.name} - изображение ${index + 1}`}
                  />
                </div>
              ))
            ) : (
              <p>Изображения не найдены.</p>
            )}
          </div>
          <div className={classes.caseDescription}>
            <p>{caseData.description}</p>
          </div>

          {/* Блок с разработчиками */}
          <div className={classes.developersSection}>
            <div className={classes.developersTitle}>
              <span>РАЗРАБОТЧИКИ</span>
              <span>ПРОЕКТА</span>
            </div>
            {caseData.developers && caseData.developers.length > 0 ? (
              <ul className={classes.developersList}>
                {caseData.developers.map((developer, index) => (
                  <li key={index} className={classes.developer}>
                    {developer.name} 
                    {developer.position}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Информация о разработчиках не доступна.</p>
            )}
          </div>

        </div>
      ) : (
        <div>Кейс не найден</div>
      )}
    </div>
  );
}
