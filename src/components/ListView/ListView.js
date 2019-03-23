import React from 'react';
import classes from './listview.module.css';
import SearchInput from './searchInput/SearchInput';

const listView = (props) =>{

  return(
    <div className={classes.listContainer}>
      <SearchInput query={props.query} onQueryUpdate={props.onQueryUpdate}/>
      <ul className={classes.list}></ul>
    </div>
  )
}
export default listView;
