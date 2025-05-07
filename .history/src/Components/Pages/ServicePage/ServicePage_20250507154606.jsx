import React, { useState } from 'react';
import axios from 'axios'; // если ещё не установлен: npm i axios
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import classes from './ServicePage.module.css';
import serverConfig from '../../../serverConfig';

function ServicePage({ children, ...props }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    budget: '',
    message: '',
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    setFormData((prev) => ({ ...prev, agreement: e.target.checked }));
  };

  const handleSubmit = async () => {
    if (!formData.agreement) {
      alert('Подтвердите согласие на обработку данных');
      return;
    }

    try {
      const { name, phone, email, company, budget, message } = formData;
      await axios.post(`${serverConfig}/fee`, {
        name,
        phone,
        email,
        company,
        budget,
        message,
      });
      alert('Данные отправлены успешно!');
      setFormData({
        name: '',
        phone: '',
        email: '',
        company: '',
        budget: '',
        message: '',
        agreement: false,
      });
    } catch (err) {
      console.error(err);
      alert('Ошибка при отправке формы');
    }
  };

  const PurpleCheckbox = styled(Checkbox)({
    color: '#e5097f',
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
              <input
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Телефон"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={classes.inputBlockRight}>
              <input
                name="company"
                placeholder="Компания"
                value={formData.company}
                onChange={handleChange}
              />
              <input
                name="budget"
                placeholder="Бюджет"
                value={formData.budget}
                onChange={handleChange}
              />
              <input
                name="message"
                placeholder="Сообщение"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={classes.inputBlockBottom}>
            <button onClick={handleSubmit}>ОТПРАВИТЬ</button>

            <PurpleCheckbox
              checked={formData.agreement}
              onChange={handleCheckbox}
              checkedIcon={
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" fill="#e5097f" />
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
                    stroke="#e5097f"
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
