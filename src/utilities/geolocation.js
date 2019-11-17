const request = require('request')
const geoLocation = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3VyZXNoMTUiLCJhIjoiY2syeHhxdGltMDBkZTNocXQ1N295bWNuciJ9.TCuB66JrX22gTVZgblx2Zg&limit=1'
    
    request({url, json:true}, (error, {body} = {}) =>{ //destructuring response into {body}
        if(error) {
            callback('Sorry!! Unable to connect the Geolocation service', undefined)
        } else if(body.features.length===0) {
            callback('Unable to find the geocode for given location', undefined)
        } else {
            const data = {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined,data)
        }
    })  
}

module.exports = geoLocation

    