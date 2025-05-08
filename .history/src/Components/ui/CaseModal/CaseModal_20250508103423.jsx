// src/components/ui/CaseModal/CaseModal.jsx
import React, { useEffect, useState } from 'react';
import classes from './CaseModal.module.css';
import uploadsConfig from '../../../uploadsConfig';

export default function CaseModal({ caseId, onClose }) {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className={classes.modalOverlay} onClick={onClose}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
     
        {loading ? (
          <p>Загрузка...</p>
        ) : caseData ? (
          <>
          <div className={classes.info}>
             <span className={classes.title}>{caseData.name}</span>
            <div className={classes.developersList}>
          
            {caseData.developers.map((developer, index) => (
              <div key={index} className={classes.developer}>
                <img
                  src={`${uploadsConfig}${developer.img[0]}`}
                  alt={developer.name}
                />
                {/* <div className={classes.developerInfo}>
                  <span>{developer.name} </span>
                  <span>{developer.position} </span>
                </div> */}
              </div>
            ))}
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
