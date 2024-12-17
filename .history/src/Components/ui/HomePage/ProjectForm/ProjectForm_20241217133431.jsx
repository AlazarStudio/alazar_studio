import React from "react";
import classes from './ProjectForm.module.css';

function ProjectForm({ children, ...props }) {
    return ( 
        <>
          <div className={classes.container}>
            <div className={classes.containerName}></div>
            </div> 
        </>
     );
}

export default ProjectForm;