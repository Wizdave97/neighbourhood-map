import React from 'react'
import classes from './listitem.module.css';

const listItem =(props) =>{

  return(
    <li className={classes.listItem}>{props.name}</li>
  )
}
