import React, { Component } from 'react';
import classes from './app.module.css';
import MapContainer from './components/mapContainer/mapContainer';

class App extends Component {
  state={
    locations:[],
    errorLoadingData:false,
    googleMapsLoaded:false,
    google:null,
  }

  componentDidMount(){
    this.onScriptload()
    fetch('https://api.foursquare.com/v2/venues/explore?near=Lagos,Nigeria&client_id=0TTKXNKQVRBEFNZCJM4YK0KU5N2OZF5XPWPEWJBK4YDS0G2P&client_secret=S2MNT5NTVP0BCSON4XBK51VFQKHJKW4UTUSKQGMII5XK1KUT&v=20190320',
          {method:'GET'}).then(response=>response.json()).then(
            response=> {
              if(response.meta.code===200){
                let locations=[]
                let items=response.response.groups[0].items;
                if(items.length===0) return
                for(let item of items) {
                  let details={}
                  details.position={lat:item.venue.location.lat,lng:item.venue.location.lng};
                  details.id=item.id;
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

  onScriptload=()=>{
    const self=this;
    let s =document.createElement('script')
        s.src="https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyB590AsZEOF1dkep0N-vvAJ4PZHfpN_hxw&v=3"
        document.body.appendChild(s)
        s.addEventListener('load',function() {
            self.setState(state=>({
              googleMapsLoaded:!state.googleMapsLoaded,
              google:window.google
            }))
        })
  }

  render() {
    let content;
    if(this.state.errorLoadingData) { window.location.reload() }
    if(!this.state.googleMapsLoaded)   content=(<div className={classes.loader}>Loading...</div>)
    if(this.state.googleMapsLoaded){
      //console.log(this.state.google)
      content=(<div className={classes.container}>
                  <MapContainer googleMapsLoaded={this.state.googleMapsLoaded} google={this.state.google} locations={this.state.locations}/>
              </div>
    )
    }
      return (content)
  }
}

export default App;
