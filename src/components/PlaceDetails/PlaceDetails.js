export const placeDetailsService= (name)=>{
  const placeDetailService=new window.google.maps.places.PlacesService(window.map)
        return new Promise((resolve,reject)=>{
          placeDetailService.textSearch({query:name},function(result,status){
            if(status==='OK'){

              placeDetailService.getDetails({placeId:result[0].place_id,fields:['opening_hours','photo']},function(results,status){
                if(status==='OK'){

                  resolve( {opening_hours:results.opening_hours,photos:results.photos})
                }
                else resolve('')
              })
            }
        })
      })
  }
