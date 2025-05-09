// src/components/ui/CaseModal/CaseModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import classes from './CaseModal.module.css';
import uploadsConfig from '../../../uploadsConfig';
import DiscussionModal from '../DiscussionModal/DiscussionModal';

export default function CaseModal({ caseId, onClose }) {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHiding, setIsHiding] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
    } else if (type === 'form') {
      setShowMenu(false);
      setShowForm(true);
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
      <button className={classes.closeButton} onClick={handleClose}>
        ×
      </button>

      <div
        className={`${classes.modalContent} ${isHiding ? classes.hide : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
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
                <span className={classes.date}>
                  {caseData.date &&
                    new Date(caseData.date).toLocaleDateString()}
                </span>
              </div>
              <div className={classes.infoRight}>
                <div>
                  {caseData.developers && caseData.developers.length === 1 && (
                    <div className={classes.developersList}>
                      {caseData.developers.map((developer, index) => (
                        <div key={index} className={classes.developer}>
                          <img
                            src={`${uploadsConfig}${developer.img[0]}`}
                            alt={developer.name}
                          />
                          <div className={classes.developerInfo}>
                            <span>{developer.name}</span>
                            <span>{developer.position}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {caseData.developers && caseData.developers.length === 2 && (
                    <div className={classes.developersListAll}>
                      {caseData.developers.map((developer, index) => (
                        <div key={index} className={classes.developerAll}>
                          <img
                            src={`${uploadsConfig}${developer.img[0]}`}
                            alt={developer.name}
                          />
                        </div>
                      ))}
                      <span
                        className={classes.developersListAllSpan}
                        onClick={toggleMenu}
                        ref={buttonRef}
                      >
                        Разработчики проекта 🠋
                      </span>{' '}
                      {showMenu && (
                        <div
                          ref={menuRef}
                          className={`${classes.developersMenu} ${
                            showMenu ? classes.show : ''
                          }`}
                        >
                          {caseData.developers.map((developer, index) => (
                            <div
                              key={index}
                              className={classes.developersMenuEl}
                            >
                              <img
                                src={`${uploadsConfig}${developer.img[0]}`}
                                alt={developer.name}
                              />
                              <div className={classes.developersMenuElInfo}>
                                <span>{developer.name}</span>
                                <span>{developer.position}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={classes.images}>
              {showForm && (
                <DiscussionModal onClose={() => setShowForm(false)} />
              )}

                    <div className={classes.contacts} onClick={(e) => e.stopPropagation()}>
        <span onClick={() => handleContactClick('telegram')}>
          <img src="/images/telegram.svg" />
        </span>
        <span onClick={() => handleContactClick('whatsapp')}>
          <img src="/images/whatsapp.svg" />
        </span>
        <span onClick={() => handleContactClick('form')}>
          <img src="/images/convert.svg" />
        </span>
      </div>

              {caseData.img.map((img, idx) => (
                <img key={idx} src={`${uploadsConfig}${img}`} alt="case" />
              ))}
            </div>
            <div className={classes.developersTitleBottom}>
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
            <div
              className={classes.contactsMobile}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={classes.contactsMobileTitle}>
                <span>СВЯЗАТЬСЯ </span>
                <span>С НАМИ </span>
              </div>
              <div className={classes.contactsMobileIcons}>
                     <span onClick={() => handleContactClick('telegram')}>
          <img src="/images/telegram.svg" />
        </span>
        <span onClick={() => handleContactClick('whatsapp')}>
          <img src="/images/whatsapp.svg" />
        </span>
        <span onClick={() => handleContactClick('form')}>
          <img src="/images/convert.svg" />
        </span>
              </div>
            </div>
          </>
        ) : (
          <p>Кейс не найден</p>
        )}
      </div>
    </div>
  );
}
