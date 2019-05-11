const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./controller');
const errorHandler = require('./util/errorHandler');
const jwt = require('./util/jwt');

const app = express();
const PORT = 9192;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt);

controller(app);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
