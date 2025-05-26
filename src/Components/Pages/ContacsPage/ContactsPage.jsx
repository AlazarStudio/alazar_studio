import React from 'react';
import classes from './ContactsPage.module.css';
import DiscussionProject from '../../ui/DiscussionProject/DiscussionProject';

export default function ContactsPage() {
  return (
    <div className={classes.container}>
      <div className={classes.containerTop}>
        <div className={classes.containerTopBox}>
          <div className={classes.title}>КОНТАКТЫ</div>
          <div className={classes.info}>
            <span>АДРЕС</span>
            <span>ул. Октябрьская 264, г. Черкесск</span>
          </div>
          <div className={classes.info}>
            <span>НОМЕР</span>
            <span>+7 928 399-53-54</span>
          </div>
          <div className={classes.massenger}>
            <div className={classes.massengerEl}>
              <span>TELEGRAM</span> <img src="/images/tg4.svg" />
            </div>
            <div className={classes.massengerEl}>
              <span>INSTAGRAM</span> <img src="/images/inst4.svg" />
            </div>
            <div className={classes.massengerEl}>
              <span>ВКОНТАКТЕ</span> <img src="/images/vk4.svg" />
            </div>
          </div>
          <div className={classes.info}>
            <span>E-MAIL</span>
            <span>info@alazarstudio.ru</span>
          </div>
        </div>
      </div>
      <div className={classes.containerCenter}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <a
            href="https://yandex.ru/maps/org/alazar_studio/75256571169/?utm_medium=mapframe&utm_source=maps"
            style={{
              color: '#eee',
              fontSize: '12px',
              position: 'absolute',
              top: '0px',
            }}
          >
            Alazar Studio
          </a>
          <a
            href="https://yandex.ru/maps/1104/cherkessk/category/it_company/184106174/?utm_medium=mapframe&utm_source=maps"
            style={{
              color: '#eee',
              fontSize: '12px',
              position: 'absolute',
              top: '14px',
            }}
          >
            IT-компания в Черкесске
          </a>
          <a
            href="https://yandex.ru/maps/1104/cherkessk/category/3d_printing_equipment/10368756248/?utm_medium=mapframe&utm_source=maps"
            style={{
              color: '#eee',
              fontSize: '12px',
              position: 'absolute',
              top: '28px',
            }}
          >
            Оборудование для 3D-печати в Черкесске
          </a>
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=42.059418%2C44.216094&mode=search&oid=75256571169&ol=biz&utm_source=ntp_chrome&z=15.83"
            width="100%"
            height="600"
            allowFullScreen={true}
            style={{ position: 'relative' }}
          ></iframe>
        </div>
      </div>
      <DiscussionProject />
    </div>
  );
}
