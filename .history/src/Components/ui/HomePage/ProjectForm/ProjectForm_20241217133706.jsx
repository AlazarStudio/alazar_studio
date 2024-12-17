import React from 'react';
import classes from './ProjectForm.module.css';

function ProjectForm({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.containerName}>
          <span>ОБСУДИТЬ</span>
          <span>ПРОЕКТ</span>
        </div>
        <div className={classes.containerInput}>
          <div className={classes.containerInputLeft}>
            <input type='text' placeholder='Ваше имя'/>
            <input type='text' placeholder='Телефон'/>
            <input type='email' placeholder='Ваше имя'/>
          </div>
          <div className={classes.containerInputRight}></div>
        </div>
      </div>
    </>
  );
}

export default ProjectForm;
