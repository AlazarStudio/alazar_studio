import React from 'react';
import classes from './ContactPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

function ContactPage({ children, ...props }) {
  const mapState = {
    center: [44.216075, 42.05947], // Координаты центра карты (Москва)
    zoom: 15,
  };

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <div className={classes.containerTitle}>
              <span>НАШИ</span>
              <span>КОНТАКТЫ</span>
            </div>
            <div className={classes.containerAddress}>
              <span>Адрес</span>
              <span>КЧР, г.Черкесск, ул.Октябрьская, д.264</span>
            </div>
            <div className={classes.containerNumber}>
              <span>НОМЕР</span>
              <span>+7 928 399-53-84</span>
            </div>
            <div className={classes.containerLinks}>
              <button
                onClick={() => window.open('https://t.me/USERNAME', '_blank')}
              >
                TELEGRAM
                <img src="/images/tg.png" />
              </button>
              <button
                onClick={() =>
                  window.open('https://instagram.com/USERNAME', '_blank')
                }
              >
                INSTAGRAM
                <img src="/images/insta.png" />
              </button>
            </div>
            <div className={classes.containerEmail}>
              <span>E-MAIL</span>
              <span>info@alazarstudio.ru</span>
            </div>
          </div>
          <div className={classes.card}>
            <YMaps query={{ apikey: '93297c36-79fb-4332-8733-2117e5bd7a8d' }}>
              {' '}
              {/* Вставьте свой ключ */}
              <Map defaultState={mapState} width="100%" height="400px">
                <Placemark
                  geometry={[55.751574, 37.573856]}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref:
                      'https://cdn-icons-png.flaticon.com/512/1673/1673221.png', // Ссылка на значок
                    iconImageSize: [30, 30], // Размер значка
                    iconImageOffset: [-15, -15], // Смещение значка
                  }}
                  properties={{
                    hintContent: 'Моя метка',
                    balloonContent: 'Это Москва',
                  }}
                />
              </Map>
            </YMaps>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default ContactPage;
