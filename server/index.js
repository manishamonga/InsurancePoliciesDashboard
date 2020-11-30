const express = require('express');
const bodyParser = require('body-parser');
const { moongoose } = require('./db');
const customerRoute = require('./routes/customerRoutes.js');
const chartRoute = require('./routes/chartsRoutes.js');
const cors = require('cors');

const port = 3000;

var app = express();

// Now we have to configure express middleware in order to send json data to our node Js server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(cors({origin: 'http://localhost:4200'}));

// in order to start our express server, add port to listen.
app.listen(port, () => {
    console.log('Welcome to the Insurance Policies Dashboard');
    console.log(`Server Started at Port No: ${port}`);
})

// routes
app.use('/api', customerRoute);
app.use('/api', chartRoute);
