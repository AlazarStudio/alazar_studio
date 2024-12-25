import React, { useRef, useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const YandexMap = () => {
  const mapRef = useRef(null); // Ссылка на карту
  const [ymapsInstance, setYmapsInstance] = useState(null);

  // Координаты начальной и конечной точек
  const userLocation = [44.216075, 42.059470]; // Начальная точка
  const destination = [44.224056, 42.052444]; // Конечная точка

  useEffect(() => {
    if (ymapsInstance && mapRef.current) {
      const map = mapRef.current;

      // Проверяем доступность multiRouter
      if (ymapsInstance.multiRouter) {
        const multiRoute = new ymapsInstance.multiRouter.MultiRoute(
          {
            referencePoints: [userLocation, destination],
          },
          {
            boundsAutoApply: true, // Автоматическое масштабирование карты
          }
        );

        map.geoObjects.add(multiRoute); // Добавляем маршрут на карту

        return () => {
          map.geoObjects.remove(multiRoute); // Удаляем маршрут при размонтировании
        };
      } else {
        console.error("multiRouter не доступен в API Яндекс.Карт");
      }
    }
  }, [ymapsInstance]);

  return (
    <YMaps query={{ apikey: "93297c36-79fb-4332-8733-2117e5bd7a8d" }}>
      <Map
        defaultState={{
          center: userLocation,
          zoom: 14,
        }}
        width="100%"
        height="500px"
        instanceRef={(ref) => {
          if (ref) mapRef.current = ref;
        }}
        onLoad={(ymaps) => setYmapsInstance(ymaps)} // Сохраняем объект Yandex.Maps API
      >
        {/* Метка начальной точки */}
        <Placemark
          geometry={userLocation}
          properties={{
            hintContent: "Нажмите для маршрута",
            balloonContent: "Начальная точка маршрута",
          }}
        />
      </Map>
    </YMaps>
  );
};

export default YandexMap;
