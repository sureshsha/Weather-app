const request = require('request')
const forecast =(lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/08a4ae18078a762d6b32072a17c855f2/' + lat + ',' + long
    
    request({url, json:true}, (error, {body})=> { //destructuring ==>response.body into {body} & shorthand Url:url =>url
        if(error) {
          callback("Sorry!! Unable to connect the Weather Service", undefined)
        } else if(body.error) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, body.currently.summary +" " +       "It is currently " + body.currently.temperature + " degrees out. There is a "+ body.currently.precipProbability + " chance of rain")
        }
    })
}


module.exports = forecast     
 

