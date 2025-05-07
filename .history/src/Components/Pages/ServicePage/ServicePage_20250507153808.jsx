import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import classes from './ServicePage.module.css';

function ServicePage({ children, ...props }) {
  const PurpleCheckbox = styled(Checkbox)({
    color: '#9c27b0',
    '&.Mui-checked': {
      color: '#e5097f',
    },
  });

  return (
    <>
      <div className={classes.container}>
        <div className={classes.containerTop}>
          {/* <img src="/images/serviceLeft.png"  className={classes.containerTopImg}/> */}
          <div className={classes.containerTopService}>
            <div className={classes.containerTopServiceTitle}>
              <span>НАШИ</span>
              <span>УСЛУГИ</span>
            </div>
            <div className={classes.containerTopServiceType}>Дизайн</div>
            <div className={classes.containerTopServiceElements}>
              <div className={classes.containerTopServiceElementsLeft}>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>Логотип</span>
                </div>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>Фирменный стиль</span>
                </div>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>Брендбук</span>
                </div>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>
                    Создание баннеров, билбордов, афиш и других рекламных
                    материалов.
                  </span>
                </div>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>
                    Верстка каталогов, книг, меню и других печатных материалов
                  </span>
                </div>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>Разработка дизайна буклетов и листовок</span>
                </div>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>Разработка презентации</span>
                </div>
              </div>

              <div className={classes.containerTopServiceElementsRight}>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>Дизайн упаковки</span>
                </div>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>Брендирование мероприятия</span>
                </div>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>Разработка макетов полиграфии</span>
                </div>
                <span className={classes.grayText}>
                  грамоты, сертификаты, визитки, пригласительные, пакеты, ручки,
                  бейджи, блокноты, магниты и т.п
                </span>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>Социальные сети</span>
                </div>
                <span className={classes.grayText}>
                  посты, сторис, визитные карточки профилей, обложки для каналов
                  или групп, баннеры{' '}
                </span>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>UX/UI </span>
                </div>
                <span className={classes.grayText}>
                  дизайн сайтов, приложений и графических интерфейсов
                </span>
              </div>
            </div>

            <div className={classes.containerTopServiceType}>Разработка</div>
            <div className={classes.containerTopServiceElementsProg}>
              <div className={classes.containerTopServiceElementsLeft}>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>Лендинги на платформе Tilda</span>
                </div>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>Приложения IOS/Android</span>
                </div>
              </div>
              <div className={classes.containerTopServiceElementsRight}>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>Копоративные сайты</span>
                </div>
                <div className={classes.containerTopServiceElementsItem}>
                  <img src="/images/Ellipse 28.png" />
                  <span>АСУ для корпораций</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.containerBottom}>
          <div className={classes.containerTopServiceTitle}>
            <span>ОБСУДИТЬ</span>
            <span>ПРОЕКТ</span>
          </div>
          <div className={classes.inputBlock}>
            <div className={classes.inputBlockLeft}>
              <input placeholder="Ваше имя" type="" />
              <input placeholder="Телефон" type="" />
              <input placeholder="E-mail" type="" />
            </div>
            <div className={classes.inputBlockRight}>
              <input placeholder="Компания" type="" />
              <input placeholder="Бюджет" type="" />
              <input placeholder="Сообщение" type="" />
            </div>
          </div>
          <div className={classes.inputBlockBottom}>
            <button>ОТПРАВИТЬ</button>
            <PurpleCheckbox
              checkedIcon={
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" fill="#9c27b0" />
                  <polyline
                    points="9 12.5 11 14.5 15 10.5"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              }
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    stroke="#9c27b0"
                    strokeWidth="2"
                  />
                </svg>
              }
            />

            <span>
              Я согласен с правилами <span>обработки персональных данных</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicePage;
