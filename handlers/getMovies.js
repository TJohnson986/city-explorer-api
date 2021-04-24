'use strict';

const superagent = require('superagent');

const getMovies = (request, response) => {
  superagent.get('https://api.themoviedb.org/3/search/movie')
    .query({
      api_key: process.env.MOVIE_API_KEY,
      query: request.query.city,
    })
    .then(movieInfo => {
      response.send(movieInfo.body.results.map(info => (new CityMovie(info))))
    })
    .catch(err => (err.request, err.response));
}

function CityMovie(info) {
  this.title = info.title;
  this.overview = info.overview;
}

module.exports = getMovies;