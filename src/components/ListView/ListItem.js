import React from 'react'
import classes from './listitem.module.css';

const listItem =(props) =>{

  return(
    <li className={classes.listitem} tabIndex="0" onClick={()=> props.moreInfo(props.id)}>{props.location.name}</li>
  )
}
export default listItem;
