// src/components/ui/CaseModal/CaseModal.jsx
import React, { useEffect, useRef,  useState } from 'react';
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
                <button className={classes.connect} onClick={toggleMenu} ref={buttonRef}>Связаться с нами</button>

                {showMenu && (
                  <div className={classes.menu}  ref={menuRef}>
                    <span onClick={() => handleContactClick('telegram')}>
                        
                      Telegram
                    </span>
                    <span onClick={() => handleContactClick('whatsapp')}>
                      WhatsApp
                    </span>
                    <span onClick={() => handleContactClick('email')}>
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
