export const createStreetView= (props) =>{
  let streetViewService= new window.google.maps.StreetViewService();
  streetViewService.getPanorama({location:props.position,radius:50},function(data,status){
    if(status==='OK') {
      let panorama= new window.google.maps.StreetViewPanorama(document.getElementById('pano'))
      panorama.setPano(data.location.pano)
      panorama.setPov({
        heading:window.google.maps.geometry.spherical.computeHeading(data.location.latLng,props.position),
        pitch:30
      })
      panorama.setVisible(true);
    }
    else document.getElementById('pano').textContent='No Street View found';
  })
}
