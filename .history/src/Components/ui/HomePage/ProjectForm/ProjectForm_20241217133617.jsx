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
            <i
          </div>
          <div className={classes.containerInputRight}></div>
        </div>
      </div>
    </>
  );
}

export default ProjectForm;
