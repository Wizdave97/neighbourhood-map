import React, { Component } from 'react';
import classes from './mapcontainer.module.css';
import Map from '../map/Map';
import { createMarker } from '../Marker/Marker';
import { createInfoWindow } from '../InfoWindow';
import { createStreetView } from '../streetView/StreetView';




const markers=[]
class MapContainer extends Component {
  state={
    bounds:new this.props.google.maps.LatLngBounds()

  }

  componentDidMount(){

  }
  componentDidUpdate(){
    this.createMarkers();
    this.renderMarkers();
    this.populateInfoWindow();
  }
  createMarkers = () =>{
    let marker;
    for(let location of this.props.locations){
      marker=createMarker(location)
      markers.push(marker)
      this.state.bounds.extend(marker.position)
      }

    }
    renderMarkers=()=>{
      for(let i=0;i<markers.length;i++ ){
        setTimeout(()=>{
          markers[i].setMap(window.map)
        },i*300)
      }
    window.map.fitBounds(this.state.bounds);

    }
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
          infoWindow.setContent(this.title+'<div id="pano" ></div>')
          createStreetView(this);
          infoWindow.open(window.map,this)
          this.setAnimation(window.google.maps.Animation.BOUNCE)
          infoWindow.addListener('closeclick',function(){
            infoWindow.marker=null
            self.setAnimation(null)
          })
          currentMarker=this;
        })}
      }


  render() {

    return(
      <div  className={classes.map}>
        <Map id={"map"} googleMapsLoaded={this.props.googleMapsLoaded} map={classes.map} google={this.props.google}/>
      </div>
    )
  }
}


export default MapContainer;
