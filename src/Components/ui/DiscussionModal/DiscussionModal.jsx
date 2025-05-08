import React, { useState } from 'react';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import serverConfig from '../../../serverConfig';
import styles from './DiscussionModal.module.css';

const PurpleCheckbox = styled(Checkbox)({
  color: '#e5097f',
  '&.Mui-checked': {
    color: '#e5097f',
  },
});

export default function DiscussionModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    budget: '',
    message: '',
    agreement: false,
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
      await axios.post(`${serverConfig}/discussions`, formData);
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
      onSuccess?.();
      onClose?.(); // Закрыть модалку после успеха
    } catch (err) {
      console.error(err);
      alert('Ошибка при отправке формы, проверьте правильность заполнения всех полей');
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
       <span className={styles.title}>Оставить заявку</span>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.formContainer}>
          <div className={styles.inputBlock}>
          <div className={styles.inputBlockLeft}>
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
            <div className={styles.inputBlockRight}>
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
          <div className={styles.inputBlockBottom}>
            <button onClick={handleSubmit}>ОТПРАВИТЬ</button>
            <div className={styles.check}>
              <PurpleCheckbox
                checked={formData.agreement}
                onChange={handleCheckbox}
              />
              <span>
                Я согласен с правилами{' '}
                <span>обработки персональных данных</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
