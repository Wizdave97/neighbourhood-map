import React from 'react';
import classes from './searchInput.module.css';

const search = (props) =>{

  return(
      <div className={classes.searchContainer}>
          <input className={classes.search} type="text" value="" placeholder="Search a location in lagos" />

      </div>
  )
}
export default search;
