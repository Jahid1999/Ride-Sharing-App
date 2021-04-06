const { POINT_CONVERSION_COMPRESSED } = require('constants');
const express = require('express');
const mysql = require('mysql');
const path = require('path');

//Create Connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'iit123',
    database: 'ride_share'
});

//Connect 

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySql connected...');
});

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}}`);
    next();
};

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/api', require('./routes/root'));
app.use('/api', require('./routes/driver'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});