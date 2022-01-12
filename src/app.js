const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode  = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express();
const port = process.env.PORT || 3000

//Defined paths for Express config
const publicDirPath=path.join(__dirname, "../public")
const viewPath=path.join(__dirname, "../templates/views")
const partialPath=path.join(__dirname, "../templates/partials")
 
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setup static diractory to serve
app.use(express.static(publicDirPath))

app.get('/',(req, res)=>{
res.render('index',{
    title:"Weather",
    name:"Aman Thakur"
})
})

app.get('/about',(req, res)=>{
res.render('about',{
title:"About me",
name:"Aman Thakur"
})

})
app.get('/help', (req, res)=>{
    res.render('help',{
        message:"This is example",
        title:"help",
        name:'Aman Thakur'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
            }
            geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
                if(error){
                    return res.send(error)
                }
                    forecast(latitude, longitude, (error, forecastData) => {
                        if(error){
                            return res.send(error)
                        }
                        res.send({
                            forecast:forecastData,
                            location,
                            address:req.query.address
                        })
                    })
                })
       
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        message:"Help Artical not found",
        title:"404",
        name:'Aman Thakur'
    })
})
app.get('/products', (req, res)=>{
    if(!req.query.search){
return res.send({
    error:'You must provide a search term'
})
    }
    console.log(req.query);
res.send({
    products:[]
})
})
app.get('*',(req,res)=>{
    res.render('404',{
        message:"Page not found",
        title:"404",
        name:'Aman Thakur'
    })
})
app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})