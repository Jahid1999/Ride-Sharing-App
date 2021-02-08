const express = require('express');
const mysql = require('mysql');

//Create Connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'iit123',
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

app.get('/createDB', (req, res) => {
    let query = 'CREATE DATABASE ride_share';
    db.query(query, (err, result) => {
        if(err) 
            throw err;
        console.log(result);
        res.send('Database Created');
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});