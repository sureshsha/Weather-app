const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geolocation = require('./utilities/geolocation')
const forecast = require('./utilities/forecast')
const app = express()
const port = process.env.PORT ||3000

//declare the path
const publicDirectivePath = path.join(__dirname, '../public')
const templatePath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Express view engine
app.set('view engine', 'hbs')   
app.set('views', templatePath)
hbs.registerPartials(partialsPath)

//Static publish
app.use(express.static(publicDirectivePath))


app.get('', (req, res)=>{
    res.render('index', 
    {title: 'Weather',
     name: 'Sureshkumar'  
     })
})
 app.get('/about.html', (req, res)=>{
     res.render('about', 
     {title:'About',
     name: 'Suresh'
    })
 })

 app.get('/help', (req, res)=>{
     res.render('help',
     {title: 'Help',
     name: 'Suresh'
    })
 })


//app.com/weather
app.get("/weather", (req, res)=>{
    if(!req.query.address){
        return res.send("Please enter the location")
    }
    geolocation(req.query.address, (error, {latitude, longitude, location} ={}) => { ///{} -destructive data.latitiue is written as latitiude
      if(error){
          return res.send({error})
      }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send ({error})
            }
            res.send ({
            location,//shorthand
            forecast:forecastData
        })
  
    })
  
    /*geolocation(req.query.address, (error, data)=>{
        forecast(data.latitude, data.longitude, (error, forecast)=>{
            console.log(forecast)
        })
    })
    res.send({
        Name: req.query.address,
        Weather: '95degree'

    })*/    
})
    
})

app.get('*',(req, res)=>{
    res.render('404page')
})

app.listen(port, ()=>{
    console.log("Development server running on port", port)
})
