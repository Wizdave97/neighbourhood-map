import React from 'react';
import classes from './listview.module.css';
import SearchInput from './searchInput/SearchInput';
import ListItem from './ListItem';

const listView = (props) =>{
  function closeList(){
    let listView=document.querySelector('#list-container');
    listView.style.width="0";
  }
  return(
    <div id="list-container" className={classes.listContainer}>
      <input type="button" className={classes.closeButton} value="Close" onClick={()=>closeList()}/>
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
