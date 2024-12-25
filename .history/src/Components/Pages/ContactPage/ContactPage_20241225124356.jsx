import React from 'react';
import classes from './ContactPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function ContactPage({ children, ...props }) {
  const position = { lat: 51.505, lng: -0.09 }; // Координаты метки

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
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
            <LoadScript googleMapsApiKey="YOUR_API_KEY">
              {' '}
              {/* Замените на ваш ключ */}
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={position}
                zoom={13}
              >
                <Marker position={position} />
              </GoogleMap>
            </LoadScript>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default ContactPage;
