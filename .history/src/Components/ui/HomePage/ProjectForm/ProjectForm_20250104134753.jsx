import React, { useState } from 'react';
import classes from './ProjectForm.module.css';
import { Checkbox } from '@mui/material';

function ProjectForm({ children, ...props }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    budget: '',
    message: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!formData.agree) {
      alert('Вы должны согласиться с правилами обработки данных');
      return;
    }

    try {
      const response = await fetch('https://your-server-endpoint.com/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Данные успешно отправлены!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          company: '',
          budget: '',
          message: '',
          agree: false,
        });
      } else {
        alert('Ошибка при отправке данных. Попробуйте еще раз.');
      }
    } catch (error) {
      alert('Произошла ошибка: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.container}>
        <div className={classes.containerCenter}>
          <div className={classes.containerName}>
            <span>ОБСУДИТЬ</span>
            <span>ПРОЕКТ</span>
          </div>
          <div className={classes.containerInput}>
            <div className={classes.containerInputLeft}>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Телефон"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={classes.containerInputRight}>
              <input
                type="text"
                name="company"
                placeholder="Компания"
                value={formData.company}
                onChange={handleChange}
              />
              <input
                type="text"
                name="budget"
                placeholder="Бюджет"
                value={formData.budget}
                onChange={handleChange}
              />
              <input
                type="text"
                name="message"
                placeholder="Сообщение"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={classes.containerBottom}>
            <button type="submit">ОТПРАВИТЬ</button>
            <Checkbox
              checked={formData.agree}
              name="agree"
              onChange={handleChange}
              sx={{
                color: '#fff', // Цвет чекбокса
                '&.Mui-checked': {
                  color: '#e5097f', // Цвет при активном состоянии
                },
              }}
            />
            <span>
              Я согласен с правилами{' '}
              <a href="/">обработки персональных данных</a>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProjectForm;
