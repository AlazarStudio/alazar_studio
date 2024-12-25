import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const YandexMap = () => {
  // Настройки карты
  const mapState = {
    center: [44.216075, 42.059470], // Координаты
    zoom: 18, // Уровень масштабирования
  };

  return (
    <YMaps query={{ apikey: '93297c36-79fb-4332-8733-2117e5bd7a8d' }}> {/* Укажите ваш API-ключ */}
      <Map
        defaultState={mapState} // Настройки карты
        width="100%" // Ширина карты
        height="400px" // Высота карты
      >
        {/* Метка на карте */}
        <Placemark
          geometry={[44.216075, 42.059470]} // Координаты метки
          properties={{
            hintContent: 'Моя метка', // Подсказка при наведении
            balloonContent: 'Это Москва', // Информация в "баллоне" при клике
          }}
        />
      </Map>
    </YMaps>
  );
};

export default YandexMap;
