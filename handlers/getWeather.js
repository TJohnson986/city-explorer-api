'use strict'

const superagent = require('superagent');

const getWeather = (request, response) => {
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
    .query({
      key: process.env.WEATHER_API_KEY,
      units: 'I',
      lat: request.query.lat,
      lon: request.query.lon,
    })
    .then(weatherData => {
      console.log(weatherData.body.city_name)
      response.json(weatherData.body.data.map(x => (new DailyForcast(x)
      )))
    })
}

function DailyForcast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

module.exports = getWeather;