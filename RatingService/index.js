const { POINT_CONVERSION_COMPRESSED } = require('constants');
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
// const http = require('http').createServer(app)


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

const logger = (req, res, next) => {
    // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}}`);
    next();
};

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Store Rating
app.post('/api/ratings', (req, res) => {

    let  driverName = req.body.name
    let car= req.body.car
    let rating= req.body.rating

let query = "INSERT INTO ratings (name, car, rating) VALUES ( ?, ?, ?)";
// let query = "INSERT INTO ratings SET ?";
db.query(query, [driverName, car, rating], (err, result) => {
    if(err) 
        throw err;

})
console.log(`Driver ${req.body.name} got a rating of ${req.body.rating}.`);
res.send('Driver Rating Stored');
});


// const Sckt = 5001;
const PORT = process.env.PORT || 5001;

// http.listen(Sckt,()=>{
//     console.log(`Socket Running on ${Sckt}`);
// })

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});