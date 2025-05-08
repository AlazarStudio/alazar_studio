// src/components/ui/CaseModal/CaseModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import classes from './CaseModal.module.css';
import uploadsConfig from '../../../uploadsConfig';

export default function CaseModal({ caseId, onClose }) {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHiding, setIsHiding] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleContactClick = (type) => {
    if (type === 'telegram') {
      window.open('https://t.me/alazarstudio', '_blank');
    } else if (type === 'whatsapp') {
      window.open('https://wa.me/+79283995384', '_blank');
    } else if (type === 'email') {
      window.location.href = 'mailto:info@alazarstudio.ru';
    }
  };

  useEffect(() => {
    if (!showMenu) return;

    const handleOutsideClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showMenu]); // теперь следим только при активном меню

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/casesHome/${caseId}`
        );
        const data = await res.json();
        setCaseData(data);
      } catch (err) {
        console.error('Ошибка загрузки кейса:', err);
      } finally {
        setLoading(false);
      }
    };

    if (caseId) fetchCase();
  }, [caseId]);

  const handleClose = () => {
    setIsHiding(true); // активируем анимацию исчезновения
    setTimeout(() => {
      onClose(); // вызываем родительское закрытие
    }, 400); // время должно совпадать с duration анимации
  };

  return (
    <div className={classes.modalOverlay} onClick={handleClose}>
      <div
        className={`${classes.modalContent} ${isHiding ? classes.hide : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={classes.closeButton} onClick={handleClose}>
          ×
        </button>

        {loading ? (
          <p>Загрузка...</p>
        ) : caseData ? (
          <>
            <div className={classes.info}>
              <div className={classes.infoLeft}>
                <span className={classes.title}>{caseData.name}</span>
                <div className={classes.categoriesList}>
                  {caseData.categories.map((el) => (
                    <span key={el.id} className={classes.category}>
                      {el.title}
                    </span>
                  ))}
                </div>
              </div>
              <div className={classes.infoRight}>
                <div>
                  <div className={classes.developersTitle}>
                    <span>РАЗРАБОТЧИКИ</span>
                    <span>ПРОЕКТА</span>
                  </div>
                  <div className={classes.developersList}>
                    {caseData.developers.map((developer, index) => (
                      <div key={index} className={classes.developer}>
                        <img
                          src={`${uploadsConfig}${developer.img[0]}`}
                          alt={developer.name}
                        />
                        <div className={classes.developerInfo}>
                          <span>{developer.name} </span>
                          <span>{developer.position} </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className={classes.connect}
                  onClick={toggleMenu}
                  ref={buttonRef}
                >
                  Связаться с нами
                </button>

                {showMenu && (
                  <div
                    className={`${classes.menu} ${
                      showMenu ? classes.menuActive : classes.menuHide
                    }`}
                    ref={menuRef}
                  >
                    <span onClick={() => handleContactClick('telegram')}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#0088cc"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.99979 15.2L9.70514 19.3497C10.1385 19.3497 10.3273 19.1582 10.5526 18.9405L12.7785 16.8614L17.051 19.9396C17.8395 20.3728 18.3971 20.1472 18.606 19.2484L21.9543 4.31383L21.955 4.3131C22.1979 3.20818 21.4968 2.74439 20.7365 3.04155L2.81532 10.1855C1.73863 10.6263 1.74901 11.2349 2.6332 11.4972L7.34998 12.8804L17.1535 6.69872C17.6031 6.42269 18.0142 6.57756 17.6796 6.87656L9.99979 15.2Z" />
                      </svg>
                      Telegram
                    </span>
                    <span onClick={() => handleContactClick('whatsapp')}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#25D366"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.0043 2.00391C6.478 2.00391 2.00391 6.478 2.00391 12.0043C2.00391 13.9681 2.59799 15.7851 3.63346 17.2941L2.00391 22L6.81669 20.4064C8.25977 21.2424 9.99566 21.7351 11.8521 21.7351C17.3784 21.7351 21.8525 17.261 21.8525 11.7347C21.8525 6.20838 17.3784 2.00391 12.0043 2.00391ZM12.0043 19.7351C10.5084 19.7351 9.08926 19.3212 7.90748 18.5793L7.6363 18.4031L5.17025 19.2355L5.99812 16.7594L5.82663 16.4855C4.95179 15.0605 4.51884 13.4018 4.51884 11.7347C4.51884 7.69598 7.96549 4.24933 12.0043 4.24933C16.0431 4.24933 19.4898 7.69598 19.4898 11.7347C19.4898 15.7735 16.0431 19.7351 12.0043 19.7351Z" />
                        <path d="M16.3474 13.3706L14.3922 12.3789C14.1135 12.2407 13.7966 12.2308 13.5072 12.3523C13.2178 12.4737 12.984 12.7159 12.8573 13.0284C12.7252 13.3541 12.4055 13.6255 12.086 13.6753C11.7234 13.7336 11.2311 13.5889 10.5692 13.0471C9.72152 12.3603 9.35604 11.7892 9.08889 11.2774C8.97999 11.0663 9.05626 10.8609 9.20698 10.7199C9.29077 10.6407 9.35897 10.5425 9.40807 10.4317C9.46182 10.3097 9.48163 10.1762 9.46421 10.0429C9.44679 9.90952 9.39282 9.78062 9.30847 9.66867L8.274 8.29688C8.15177 8.1301 7.97134 8.02598 7.77434 8.00458C7.57734 7.98318 7.37917 8.04532 7.22513 8.17615C6.54015 8.75604 6.20864 9.49989 6.275 10.2969C6.34136 11.0939 6.74507 12.1463 8.11467 13.3133C9.82184 14.8329 11.2697 15.2642 12.5026 14.9993C13.3012 14.8311 13.9984 14.3123 14.4743 13.5181C14.6003 13.3076 14.6807 13.0652 14.6568 12.8176C14.6486 12.7357 14.6822 12.6562 14.7463 12.6063C14.8104 12.5563 14.8973 12.5438 14.9744 12.5747L16.7398 13.3494C16.8264 13.3876 16.9235 13.3972 17.0167 13.3771C17.1098 13.357 17.1946 13.3083 17.2574 13.2383C17.3202 13.1682 17.3586 13.0809 17.3661 12.9882C17.3736 12.8955 17.35 12.8034 17.2984 12.7256C17.2468 12.6477 17.1692 12.5871 17.0776 12.5535C16.986 12.5199 16.8852 12.5153 16.7923 12.5402L16.3474 13.3706Z" />
                      </svg>
                      WhatsApp
                    </span>
                    <span onClick={() => handleContactClick('email')}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#EA4335"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6L12 11L4 6H20ZM4 18V8L12 13L20 8L20.002 18H4Z" />
                      </svg>
                      E-Mail
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className={classes.images}>
              {caseData.img.map((img, idx) => (
                <img key={idx} src={`${uploadsConfig}${img}`} alt="case" />
              ))}
            </div>
            <div className={classes.developersTitle}>
              <span>РАЗРАБОТЧИКИ</span>
              <span>ПРОЕКТА</span>
            </div>
            <div className={classes.developersListBottom}>
              {caseData.developers.map((developer, index) => (
                <div key={index} className={classes.developerBottom}>
                  <img
                    src={`${uploadsConfig}${developer.img[0]}`}
                    alt={developer.name}
                  />
                  <div className={classes.developerInfo}>
                    <span>{developer.name} </span>
                    <span>{developer.position} </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Кейс не найден</p>
        )}
      </div>
    </div>
  );
}
