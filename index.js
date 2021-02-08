const { POINT_CONVERSION_COMPRESSED } = require('constants');
const express = require('express');
const mysql = require('mysql');

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

app.get('/', (req, res) => {
    res.send('Welcome Ride Share');
});

//Create database
app.get('/createDB', (req, res) => {
    let query = 'CREATE DATABASE ride_share';
    db.query(query, (err, result) => {
        if(err) 
            throw err;
        console.log(result);
        res.send('Database Created');
    })
});

//Create Rider Table
app.get('/createRiderTable', (req, res) => {
    let query = 'CREATE TABLE rider(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(255), current_location POINT)';
    db.query(query, (err, result) => {
        if(err) 
            throw err;
        console.log(result);
        res.send('Rider Table Created');
    })
});

//Create Driver Table
app.get('/createDriverTable', (req, res) => {
    let query = 'CREATE TABLE driver(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(255), car varchar(255), current_location POINT)';
    db.query(query, (err, result) => {
        if(err) 
            throw err;
        console.log(result);
        res.send('Driver Table Created');
    })
});

//Create  a Rider
app.get('/create/rider', (req, res) => {
    let rider = {
        name: 'Jahid',
        // current_location: POINT( req.body.current_locationX,req.body.current_locationY),
        current_location: GeomFromText('POINT(18 23)'),
    }

    let query = 'INSERT INTO rider SET ?';
    db.query(query, rider, (err, result) => {
        if(err) 
            throw err;
        console.log(result);
        res.send('Rider Created');
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});