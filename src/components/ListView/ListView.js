import React from 'react';
import classes from './listview.module.css';
import SearchInput from './searchInput/SearchInput';
import ListItem from './ListItem';

const listView = (props) =>{

  return(
    <div className={classes.listContainer}>
      <SearchInput query={props.query} onQueryUpdate={props.onQueryUpdate}/>
      <ul className={classes.list}>{
          props.locations.map((location,index)=>{
            return(<ListItem location={location} key={location.id} id={location.id} moreInfo={props.moreInfo}/>)
          })
        }</ul>
    </div>
  )
}
export default listView;
