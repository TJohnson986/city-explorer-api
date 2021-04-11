const express = require('express');
require ('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('hello');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
