import React from 'react';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import classes from './ServicePage.module.css';

function ServicePage({ children, ...props }) {
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
            <label className="checkbox-container">
              <input type="checkbox" className="checkbox" />
              <svg
                className="circle-svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="9" className="circle-bg" />
                <polyline
                  points="9 12.5 11 14.5 15 10.5"
                  className="checkmark"
                />
              </svg>
            </label>

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
