import React  from 'react';
import classes from './app.module.css';
import MapContainer from './components/mapContainer/mapContainer';
import ListView from './components/ListView/ListView';
import { createInfoWindow } from './components/InfoWindow';
import { placeDetailsService } from './components/PlaceDetails/PlaceDetails';
let infoWindow;
let currentMarker;
class App extends React.PureComponent {
  state={
    locations:[],
    errorLoadingData:false,
    googleMapsLoaded:false,
    google:null,
    menu:false,
    query:''
  }

  componentDidMount(){
    this.onScriptload()
    //Fetch location details from Foursquare Database and add it to the app State
    fetch('https://api.foursquare.com/v2/venues/explore?near=London,UK&client_id=0TTKXNKQVRBEFNZCJM4YK0KU5N2OZF5XPWPEWJBK4YDS0G2P&client_secret=S2MNT5NTVP0BCSON4XBK51VFQKHJKW4UTUSKQGMII5XK1KUT&v=20190320',
          {method:'GET'}).then(response=>response.json()).then(
            response=> {
              if(response.meta.code===200){
                let locations=[]
                let items=response.response.groups[0].items;
                if(items.length===0) return
                for(let item of items) {
                  let details={}
                  details.position={lat:item.venue.location.lat,lng:item.venue.location.lng};
                  details.id=item.venue.id;
                  details.name=item.venue.name;
                  locations.push(details)
                }
                this.setState({
                  locations:locations
                })
              }
            }
          ).catch(error=> this.setState(state=>({
            errorLoadingData:!state.errorLoadingData
          })))
  }
  // this function loads the google maps JavaScript API and adds it to the state and the global window object
  onScriptload=()=>{
    const self=this;
    let s =document.createElement('script')
        s.src="https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyB590AsZEOF1dkep0N-vvAJ4PZHfpN_hxw&v=3"
        document.body.appendChild(s)
        s.addEventListener('load',function() {
            infoWindow=createInfoWindow();

            self.setState(state=>({
              googleMapsLoaded:!state.googleMapsLoaded,
              google:window.google
            }))
        })
  }
  updateQuery =(query)=>{
    this.setState({
      query:query
    })
  }
  moreInfo =(id)=>{

    for(let marker of window.markers){
      marker.setAnimation(null)
      if(marker.id===id){
        if(currentMarker===marker) return
        placeDetailsService(marker.title).then(results=>{
          let html=`${marker.title}<br>`;
          if(results) {
            if(results.opening_hours){
              html+=`<div>
                ${results.opening_hours.open_now?'Open Now<br>':'Closed<br>'}
                ${results.opening_hours.weekday_text[0]}<br>
                ${results.opening_hours.weekday_text[1]}<br>
                ${results.opening_hours.weekday_text[2]}<br>
                ${results.opening_hours.weekday_text[3]}<br>
                ${results.opening_hours.weekday_text[4]}<br>
                ${results.opening_hours.weekday_text[5]}<br>
              </div>`
            }
            if(results.photos){
              html+=`<img src='${results.photos[0].getUrl({maxHeight:100,maxWidth:200})}'>`
            }
            infoWindow.setContent(html)
          }
          else {
            infoWindow.setContent(`${marker.title}`)
            console.log(results)
          }
          infoWindow.open(window.map, marker)
          marker.setAnimation(window.google.maps.Animation.BOUNCE)
        }).catch(err=>{
            infoWindow.setContent(`${marker.title}`)
        })
        currentMarker=marker;
        infoWindow.addListener('closeclick',function(){
          marker.setAnimation(null)
        })
      }
    }
  }

  render() {
    let matcher= new RegExp(`${this.state.query}`,'gi');
    let matchingLocations;
    if(this.state.query) {
      matchingLocations=this.state.locations.filter(location=>{
        return matcher.test(location.name)
      });
    }
    else{
      matchingLocations=this.state.locations
    }
    let content;
    if(this.state.errorLoadingData && !this.state.googleMapsLoaded) content=(<div><h4>Network error check your connection and refresh{setTimeout(()=>{window.location.reload()},3000)}</h4></div>)
    else if(!this.state.googleMapsLoaded)   content=(<div className={classes.loader}>Loading...</div>)
    else if(this.state.googleMapsLoaded){
      //console.log(this.state.google)
      content=(<div className={classes.container}>
                  <ListView locations={matchingLocations} query={this.state.query} onQueryUpdate={this.updateQuery} moreInfo={this.moreInfo}/>
                  <MapContainer googleMapsLoaded={this.state.googleMapsLoaded} google={this.state.google} locations={matchingLocations}/>
              </div>
    )
    }
      return (content)
  }
}

export default App;
