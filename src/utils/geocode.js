const request=require("request")

const geocode=(address, callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYW1hbnJ0MzYwIiwiYSI6ImNreG9qNGR2NjB4Ynkyb3A3NGh1YWFpNHMifQ.WUtB4p32wsfbZha4Z29eNg&limit=1"
request({url, json:true}, (error, response)=>{
    if(error){
        callback("Unable to connect to location services!", undefined)
    }else if(response.body.features.length === 0){
callback("Unable to find  location. Try  another search.", undefined)
    }else{
        callback(undefined, {
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
        })
    }
})
}

module.exports=geocode