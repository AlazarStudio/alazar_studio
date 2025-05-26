import React, { useEffect, useState } from 'react';
import classes from '../AboutPage/AboutPage.module.css';
import DiscussionProject from '../../ui/DiscussionProject/DiscussionProject';
import serverConfig from '../../../serverConfig';
import uploadsConfig from '../../../uploadsConfig';

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [developers, setDevelopers] = useState([]);

  // Загрузка данных
  useEffect(() => {
    Promise.all([
      fetch(`${serverConfig}/developers`).then((res) => res.json()),
    ]).then(([developerData]) => {
      setDevelopers(developerData);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // вызываем при монтировании
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const socialIcons = {
    telegram: '/images/socials/telegram.svg',
    instagram: '/images/socials/instagram.svg',
    whatsapp: '/images/socials/whatsapp.svg',
    vk: '/images/socials/vk.svg',
    tiktok: '/images/socials/tiktok.svg',
    behance: '/images/socials/behance.svg',
    pinterest: '/images/socials/pinterest.svg',
    artstation: '/images/socials/artstation.svg',
  };

  return (
    <div className={classes.box}>
      <div className={classes.container}>
        <div className={classes.container1}>
          <span>КЛЮЧЕВЫЕ</span>
          <span>НАПРАВЛЕНИЯ</span>
          <div className={classes.container1Block}>
            <div className={classes.container1BlockLeft}>
              <span>
                <img src="/images/Ellipse 25.png" />
                Разработка сайтов
              </span>
              <span>
                <img src="/images/Ellipse 25.png" />
                Техническая и дизайн-поддержка
              </span>
              <span>
                <img src="/images/Ellipse 25.png" />
                SEO-продвижение
              </span>
            </div>
            <div className={classes.container1BlockRight}>
              <span>
                <img src="/images/Ellipse 25.png" />
                Графический дизайн
              </span>
              <span>
                <img src="/images/Ellipse 25.png" />
                Работа с нейросетями
              </span>
              <span>
                <img src="/images/Ellipse 25.png" />
                Видеомонтаж
              </span>
            </div>
          </div>
        </div>
        <div className={classes.container2}>
          <div className={classes.container2Box}>
            {!isMobile && (
              <div className={classes.container2Left}>
                <img src="/images/Vector (3).png" alt="icon" />
              </div>
            )}

            {isMobile && (
              <div className={classes.container2Left}>
                <img src="/images/Vector (4).png" alt="icon" />
                <img src="/images/Vector (5).png" alt="icon" />
              </div>
            )}
            <div className={classes.container2Text}>
              <div className={classes.container2Center}>
                <div className={classes.container2El}>
                  <span>3 МЕСЯЦА</span>
                  <span>
                    необходимо для выпуска первой стабильной версии проекта
                  </span>
                </div>
                <div className={classes.container2El}>
                  <span>3 ДНЯ</span>
                  <span>достаточно, чтобы точно оценить стоимость проекта</span>
                </div>
                <div className={classes.container2El}>
                  <span>7 ДНЕЙ</span>
                  <span>среднее время создания основного эскиза проекта</span>
                </div>
              </div>
              <div className={classes.container2Right}>
                <div className={classes.container2El}>
                  <span>2 ЧАСА</span>
                  <span>среднее время реагирования </span>
                </div>
                <div className={classes.container2El}>
                  <span>4-6</span>
                  <span>
                    специалистов участвует в разработке вашего проекта.
                    Руководитель проекта, дизайнеры, разработчики, тестировщик
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.container3}>
          <div className={classes.container3Box}>
            <div className={classes.title}>
              <span>НАША</span>
              <span>КОМАНДА</span>
            </div>
            <div className={classes.devBlock}>
              {developers.map((dev) => (
                <div key={dev.id} className={classes.devBlockEl}>
                  <img
                    src={`${uploadsConfig}/uploads/${dev.avatar}`}
                    alt="avatar"
                    className={classes.avatar}
                  />
                  <img
                    src="/images/Polygon 1.png"
                    className={classes.poligon}
                  />

                  <div className={classes.devBlockRight}>
                    <span className={classes.name}>{dev.name}</span>
                    <span className={classes.position}>{dev.position}</span>
                    <div className={classes.connect}>
                      {dev.telegram && (
                        <span>
                          <img src="/images/tg.png" alt="" />
                          {dev.telegram}
                        </span>
                      )}
                      {dev.instagram && (
                        <span>
                          <img src="/images/inst4.svg" alt="" />
                          {dev.instagram}
                        </span>
                      )}
                      {dev.whatsapp && (
                        <span>
                          <img src="/images/whatsApp.png" alt="" />
                          {dev.whatsapp}
                        </span>
                      )}
                      {dev.vk && (
                        <span>
                          <img src="/images/vk (1).png" alt="" />
                          {dev.vk}
                        </span>
                      )}
                      {dev.tiktok && (
                        <span>
                          <img src="/images/tiktok.png" alt="" />
                          {dev.tiktok}
                        </span>
                      )}
                      {dev.behance && (
                        <span>
                          <img src="/images/" alt="" />
                          {dev.behance}
                        </span>
                      )}
                      {dev.pinterest && (
                        <span>
                          <img src="/images/" alt="" />
                          {dev.pinterest}
                        </span>
                      )}
                      {dev.artstation && (
                        <span>
                          <img src="/images/artstation.png" alt="" />
                          {dev.artstation}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DiscussionProject />
      </div>
    </div>
  );
}
