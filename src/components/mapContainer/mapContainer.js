import React  from 'react';
import classes from './mapcontainer.module.css';
import Map from '../map/Map';
import { createMarker } from '../Marker/Marker';
import { createInfoWindow } from '../InfoWindow';
import { createStreetView } from '../streetView/StreetView';
import Menu from '../../menu.svg';




const markers=[]
class MapContainer extends React.PureComponent {
  state={
    bounds:new this.props.google.maps.LatLngBounds()

  }

  componentDidMount(){

  }
  componentDidUpdate(){
    if(markers.length===0){
      this.createMarkers();
      this.populateInfoWindow();
    }
    this.renderMarkers();
  }

  createMarkers = () =>{
    let marker;
    for(let location of this.props.locations){
      marker=createMarker(location)
      markers.push(marker)
      this.state.bounds.extend(marker.position)
      }
      window.markers=markers;
    }
    renderMarkers=()=>{
      if(markers.length!==0){
        for(let marker of markers){
          marker.setMap(null)
        }
      }
      // THis ensures only markers that match the search query are rendered
      let currentLocationNames=[];
      for(let place of this.props.locations ){
        currentLocationNames.push(place.name)
      }
      //console.log(currentLocationNames)
      for(let i=0;i<markers.length;i++ ){
        if(currentLocationNames.includes(markers[i].title)){
          setTimeout(()=>{
            markers[i].setMap(window.map)
          },i*300)
        }
        else{  continue }
      }
    window.map.fitBounds(this.state.bounds);
    }
    // Creates the infoWindow object and populates it with the streetView Panorama
    populateInfoWindow =() =>{
      let currentMarker=null
      const infoWindow=createInfoWindow();
      for(let marker of markers) {
        marker.addListener('click', function() {
          if(currentMarker===this) return
          for(let marker of markers){
            if(marker!==this) marker.setAnimation(null)
          }
          const self=this;
          infoWindow.marker=this
          infoWindow.setContent(`<div>${this.title}<div id="pano" ></div><div>`)
          createStreetView(this);
          infoWindow.open(window.map,this)
          this.setAnimation(window.google.maps.Animation.BOUNCE)
          infoWindow.addListener('closeclick',function(){
            infoWindow.marker=null
            currentMarker=null;
            self.setAnimation(null)
          })
          currentMarker=this;
        })}
      }
      openList=()=>{
        let listView=document.querySelector('#list-container');
        listView.style.width="50%";
      }


  render() {

    return(
      <div  className={classes.map}>
        <div className={classes.menu} onClick={()=>this.openList()}><img src={Menu} alt="menu icon"/></div>
        <Map id={"map"} googleMapsLoaded={this.props.googleMapsLoaded} map={classes.map} google={this.props.google}/>
      </div>
    )
  }
}


export default MapContainer;
