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
      <div className={classes.contacts} onClick={(e) => e.stopPropagation()}>
        <span onClick={() => handleContactClick('telegram')}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#0088cc"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.99979 15.2L9.70514 19.3497C10.1385 19.3497 10.3273 19.1582 10.5526 18.9405L12.7785 16.8614L17.051 19.9396C17.8395 20.3728 18.3971 20.1472 18.606 19.2484L21.9543 4.31383C22.1979 3.20818 21.4968 2.74439 20.7365 3.04155L2.81532 10.1855C1.73863 10.6263 1.74901 11.2349 2.6332 11.4972L7.34998 12.8804L17.1535 6.69872C17.6031 6.42269 18.0142 6.57756 17.6796 6.87656L9.99979 15.2Z" />
          </svg>
        </span>
        <span onClick={() => handleContactClick('whatsapp')}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#25D366"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.52 3.48A11.938 11.938 0 0 0 12.005 0C5.37 0 .009 5.36 0 11.995c0 2.114.553 4.19 1.6 6.02L0 24l6.182-1.62a11.985 11.985 0 0 0 5.82 1.48h.003c6.63 0 12-5.37 12-12 0-3.192-1.243-6.2-3.48-8.52zM12.005 22.004h-.003c-1.74 0-3.44-.46-4.945-1.328l-.355-.207-3.67.963.985-3.58-.23-.367a9.962 9.962 0 0 1-1.553-5.49c.008-5.51 4.487-9.988 9.998-9.988a9.932 9.932 0 0 1 7.08 2.937 9.935 9.935 0 0 1 2.937 7.068c0 5.512-4.488 10-10 10z" />
            <path d="M17.46 14.58l-2.41-1.21c-.33-.16-.72-.09-.98.18l-.73.74a7.4 7.4 0 0 1-3.89-3.88l.74-.74c.25-.25.33-.63.18-.97l-1.21-2.41c-.18-.36-.63-.51-.98-.36l-1.57.63c-.34.14-.56.47-.56.84a9.46 9.46 0 0 0 9.45 9.45c.37 0 .7-.22.84-.56l.63-1.57c.15-.35 0-.8-.36-.98z" />
          </svg>
        </span>
        <span onClick={() => handleContactClick('email')}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#EA4335"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6L12 11L4 6H20ZM4 18V8L12 13L20 8L20.002 18H4Z" />
          </svg>
        </span>
        <span onClick={() => handleContactClick('form')}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            color="fff"
            style={{ fill: '#fff' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM21.41 6.34c.38-.38.38-1.01 0-1.39l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.85z" />
          </svg>
        </span>
      </div>
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
                  <div className={classes.contactsMobile} onClick={(e) => e.stopPropagation()}>
        <div className={classes.contactsMobileTitle}>
          <span>СВЯЗАТЬСЯ </span>
          <span>С НАМИ </span>
        </div>
        <div className={classes.contactsMobileIcons}>
        <span onClick={() => handleContactClick('telegram')}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#0088cc"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.99979 15.2L9.70514 19.3497C10.1385 19.3497 10.3273 19.1582 10.5526 18.9405L12.7785 16.8614L17.051 19.9396C17.8395 20.3728 18.3971 20.1472 18.606 19.2484L21.9543 4.31383C22.1979 3.20818 21.4968 2.74439 20.7365 3.04155L2.81532 10.1855C1.73863 10.6263 1.74901 11.2349 2.6332 11.4972L7.34998 12.8804L17.1535 6.69872C17.6031 6.42269 18.0142 6.57756 17.6796 6.87656L9.99979 15.2Z" />
          </svg>
        </span>
        <span onClick={() => handleContactClick('whatsapp')}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#25D366"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.52 3.48A11.938 11.938 0 0 0 12.005 0C5.37 0 .009 5.36 0 11.995c0 2.114.553 4.19 1.6 6.02L0 24l6.182-1.62a11.985 11.985 0 0 0 5.82 1.48h.003c6.63 0 12-5.37 12-12 0-3.192-1.243-6.2-3.48-8.52zM12.005 22.004h-.003c-1.74 0-3.44-.46-4.945-1.328l-.355-.207-3.67.963.985-3.58-.23-.367a9.962 9.962 0 0 1-1.553-5.49c.008-5.51 4.487-9.988 9.998-9.988a9.932 9.932 0 0 1 7.08 2.937 9.935 9.935 0 0 1 2.937 7.068c0 5.512-4.488 10-10 10z" />
            <path d="M17.46 14.58l-2.41-1.21c-.33-.16-.72-.09-.98.18l-.73.74a7.4 7.4 0 0 1-3.89-3.88l.74-.74c.25-.25.33-.63.18-.97l-1.21-2.41c-.18-.36-.63-.51-.98-.36l-1.57.63c-.34.14-.56.47-.56.84a9.46 9.46 0 0 0 9.45 9.45c.37 0 .7-.22.84-.56l.63-1.57c.15-.35 0-.8-.36-.98z" />
          </svg>
        </span>
        <span onClick={() => handleContactClick('email')}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#EA4335"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6L12 11L4 6H20ZM4 18V8L12 13L20 8L20.002 18H4Z" />
          </svg>
        </span>
        <span onClick={() => handleContactClick('form')}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            color="fff"
            style={{ fill: '#000' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM21.41 6.34c.38-.38.38-1.01 0-1.39l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.85z" />
          </svg>
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
