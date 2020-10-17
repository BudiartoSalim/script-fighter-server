const express = require('express');
const app = express();
const routes = require('./routes/index.js');
const cors = require('cors')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);


module.exports = app;
