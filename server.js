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

const getMovies = require('./handlers/getMovies.js');
app.get('/movies', getMovies);

const getWeather = require('./handlers/getWeather.js');
app.get('/weather', getWeather);


function handleErrors(error, response) {
  response.status(500).send('internal server error');
}