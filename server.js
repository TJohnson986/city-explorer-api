//this creates the express server, much like importing in React
const express = require('express');

//this instantiates 
const app = express();

//this accesses the port varible from the .env file, OR uses 3001. REQUIRE DOTENV MUST BE ABOVE
require('dotenv').config();
const PORT = process.env.PORT || 3001;

//connects or "imports" the .env file to use it's variables

//This is proof of life
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

// // concludes express server setup


const cors = require('cors');
app.use(cors());

const superagent = require('superagent');


app.get('/weather', (request, response) => {
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
});

app.get('/movies', (request, response) => {
  superagent.get('https://api.themoviedb.org/3/search/movie')
    .query({
      api_key: process.env.MOVIE_API_KEY,
      query: request.query.city,
    })
    .then(movieInfo => {
      response.send(movieInfo.body.results.map(info => (new CityMovie(info))))
    })
    .catch(err => (err.request, err.response));
});

function DailyForcast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

function CityMovie(info) {
  this.title = info.title;
  this.overview = info.overview;
}

function handleErrors(error, response) {
  response.status(500).send('internal server error');
}