import React, { Component } from 'react';
import classes from './app.module.css';
import MapContainer from './components/mapContainer/mapContainer';

class App extends Component {
  state={
    locations:[],
    errorLoadingData:false
  }

  componentDidMount(){
    fetch('https://api.foursquare.com/v2/venues/search?near=Lagos,Nigeria&client_id=0TTKXNKQVRBEFNZCJM4YK0KU5N2OZF5XPWPEWJBK4YDS0G2P&client_secret=S2MNT5NTVP0BCSON4XBK51VFQKHJKW4UTUSKQGMII5XK1KUT&v=20190320',
          {method:'GET'}).then(response=>response.json()).then(
            response=> {
              if(response.meta.code==200){
                let locations=[]
                let venues=response.response.venues;
                for(let venue of venues) {
                  let details={}
                  details.lat=venue.location.lat;
                  details.lng=venue.location.lng;
                  details.id=venue.id
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

  render() {
    return (
      <div className={classes.container}>
        <MapContainer locations={this.state.locations}/>
      </div>
    );
  }
}

export default App;
