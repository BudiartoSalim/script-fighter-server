const express = require('express');
const app = express();
const routes = require('./routes/index.js');
const cors = require('cors');
const errorHandler = require('./middlewares/error-handler.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);
app.use(errorHandler);


module.exports = app;