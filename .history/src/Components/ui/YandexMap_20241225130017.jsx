import React, { useState } from 'react';
import { YMaps, Map, Placemark, MultiRoute } from '@pbe/react-yandex-maps';

const YandexMapWithRoute = () => {
  const [routeCoordinates, setRouteCoordinates] = useState(null);

  // Настройки карты
  const mapState = {
    center: [44.216075, 42.059470], // Координаты центра карты
    zoom: 14, // Уровень масштабирования
  };

  // Координаты начальной и конечной точек
  const userLocation = [44.216075, 42.059470]; // Позиция метки
  const destination = [44.224056, 42.052444]; // Конечная точка маршрута

  return (
    <YMaps query={{ apikey: '93297c36-79fb-4332-8733-2117e5bd7a8d' }}> {/* Укажите ваш API-ключ */}
      <Map
        defaultState={mapState}
        width="100%"
        height="500px"
      >
        {/* Метка с событием нажатия */}
        <Placemark
          geometry={userLocation}
          properties={{
            hintContent: 'Нажмите, чтобы построить маршрут',
          }}
          options={{
            preset: 'islands#redIcon',
          }}
          onClick={() => setRouteCoordinates([userLocation, destination])} // Задает координаты маршрута
        />

        {/* Отображение маршрута */}
        {routeCoordinates && (
          <MultiRoute
            options={{
              routeActiveStrokeWidth: 4,
              routeActiveStrokeColor: '#81212D',
            }}
            referencePoints={routeCoordinates} // Начальная и конечная точки
          />
        )}
      </Map>
    </YMaps>
  );
};

export default YandexMapWithRoute;
