const request = require("request");


const forecast=(lati,longi,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=9d3e2a2a110afcc2a19c74b7d10649e5&query="+lati+","+longi+"&units=m"
request({url, json:true},(error, {body})=>{
    if(error){
         callback("Unable to connect to the weather services!", undefined)
    }else if (body.error){
        callback("Unable to find location.", undefined)
    }else{
        callback(undefined,"Temperature : "+body.current.weather_descriptions[0]+",It is currently "+body.current.temperature+" degress out. It feels like "+body.current.feelslike+" degress out and humidity is "+body.current.humidity+"%.")
    }  
})
}

module.exports=forecast