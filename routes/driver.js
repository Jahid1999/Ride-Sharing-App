const express = require('express');
const router = express.Router();
const drivers = require('../Drivers');

// //Create Driver Table

// app.get('/createDriverTable', (req, res) => {
//     let query = 'CREATE TABLE driver(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(255), car varchar(255), current_location POINT)';
//     db.query(query, (err, result) => {
//         if(err) 
//             throw err;
//         console.log(result);
//         res.send('Driver Table Created');
//     })
// });


//Create Driver Rating Table

router.get('/createDriverRatingTable', (req, res) => {
    let query = 'CREATE TABLE ratings(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(255), car varchar(255), rating double)';
    db.query(query, (err, result) => {
        if(err) 
            throw err;
        console.log(result);
        res.send('Driver Rating Table Created');
    })
});

//Store Rating
router.post('/ratings', (req, res) => {
    let a = {
        name: 'A',
        car: 'B',
        rating: 4.00,
    }


    // let query = "INSERT INTO ratings (name, car, rating) VALUES ( ?, ?, ?)";
    let query = "INSERT INTO ratings SET ?";
    db.query(query, a, (err, result) => {
        if(err) 
            throw err;
        console.log(result);
        res.send('Rating Created');
    })
    res.send('Rating Created');
});

// Get Drivers
router.get('/drivers', (req, res) => {
    res.status(200).json(drivers);
})


module.exports = router;