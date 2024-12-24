import React from 'react';
import classes from './ProjectForm.module.css';
import { Checkbox } from '@mui/material';

function ProjectForm({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.containerCenter}>
          <div className={classes.containerName}>
            <span>ОБСУДИТЬ</span>
            <span>ПРОЕКТ</span>
          </div>
          <div className={classes.containerInput}>
            <div className={classes.containerInputLeft}>
              <input type="text" placeholder="Ваше имя" />
              <input type="text" placeholder="Телефон" />
              <input type="email" placeholder="E-mail" />
            </div>
            <div className={classes.containerInputRight}>
              <input type="text" placeholder="Компания" />
              <input type="text" placeholder="Бюджет" />
              <input type="text" placeholder="Сообщение" />
            </div>
          </div>
          <div className={classes.containerBottom}>
            <button type="button">ОТПРАВИТЬ</button>
            <Checkbox
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

        <div className={classes.containerCenterMedia}>
          <div className={classes.containerNameMedia}>
            <span>ОБСУДИТЬ</span>
            <span>ПРОЕКТ</span>
          </div>
          <div className={classes.containerInputMedia}>
            <input type="text" placeholder="Ваше имя" />
            <input type="text" placeholder="Телефон" />
            <input type="email" placeholder="E-mail" />
            <input type="text" placeholder="Компания" />
            <input type="text" placeholder="Бюджет" />
            <input type="text" placeholder="Сообщение" />
          </div>
          <div className={classes.containerBottomMedia}>
            <div>
              <Checkbox
                sx={{
                  color: '#fff', // Цвет чекбокса
                  '&.Mui-checked': {
                    color: '#e5097f', // Цвет при активном состоянии
                  },
                }}
              />
               <div></div>
              <span>
                Я согласен с правилами{' '}
                <a href="/">обработки персональных данных</a>
              </span>
            </div>
            <button type="button">ОТПРАВИТЬ</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectForm;
