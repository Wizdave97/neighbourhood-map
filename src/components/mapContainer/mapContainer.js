import React, { Component } from 'react';
import classes from './mapcontainer.module.css';
import Map from '../map/Map';

const bounds=new window.google.maps.LatLngBounds();
class MapContainer extends Component {

  createMarker = (location ) =>{
    let map=window.map
    let marker= new window.google.maps.Marker({
      position:{lat:location.lat,lng:location.lng},
      title:'react marker',
      id:location.id,
      animation:window.google.maps.Animation.DROP
    })
    bounds.extend(marker.position);
    return marker;
  }

  componentDidMount(){

  }
  componentDidUpdate(){
    const markers=[];
        if(this.props.locations){
          for(let location of this.props.locations){
            markers.push(this.createMarker(location));
          }

            for(let i=0;i<markers.length;i++){
              setTimeout(()=>{
                  markers[i].setMap(window.map)
              },i*300)
            }
          window.map.fitBounds(bounds)
        }
  }


  render() {



    return(
      <div  id="map" className={classes.map}>
        <Map id={"map"} map={classes.map}/>
      </div>
    )
  }
}


export default MapContainer;
