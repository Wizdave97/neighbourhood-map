
export const createMarker =(props)=>{
  let marker= new window.google.maps.Marker({
    position:props.position,
    id:props.id,
    title:props.name,
    animation:window.google.maps.Animation.DROP
  })
  return marker
}
