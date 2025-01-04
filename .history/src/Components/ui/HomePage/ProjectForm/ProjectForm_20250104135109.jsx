import React, { useState } from 'react';
import classes from './ProjectForm.module.css';
import { Checkbox } from '@mui/material';
import serverConfig from '../../../../serverConfig';

function ProjectForm({ children, ...props }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });

  const [agree, setAgree] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setAgree(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращение перезагрузки страницы
    if (!agree) {
      alert('Вы должны согласиться с правилами обработки данных');
      return;
    }

    try {
      const response = await fetch(`${serverConfig}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Отправляем только данные формы
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
        });
        setAgree(false);
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
              checked={agree}
              onChange={handleCheckboxChange}
              sx={{
                color: '#fff',
                '&.Mui-checked': {
                  color: '#e5097f',
                },
              }}
            />
            <span>
              Я согласен с правилами{' '}
              <a href="/">обработки персональных данных</a>
            </span>
          </div>
        </div>

        <div className={classes.containerCenterMedia}>
          <div className={classes.containerNameMedia}>
            <span>ОБСУДИТЬ</span>
            <span>ПРОЕКТ</span>
          </div>
          <div className={classes.containerInputMedia}>
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
          <div className={classes.containerBottomMedia}>
            <div className={classes.containerBottomMedia1}>
              <Checkbox
                checked={agree}
                onChange={handleCheckboxChange}
                sx={{
                  color: '#fff',
                  '&.Mui-checked': {
                    color: '#e5097f',
                  },
                }}
              />
              <span>
                Я согласен с правилами{' '}
                <a href="/">обработки персональных данных</a>
              </span>
            </div>
            <button type="submit">ОТПРАВИТЬ</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProjectForm;
