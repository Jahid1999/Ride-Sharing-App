const express = require('express');
const router = express.Router();
const drivers = require('../models/Drivers');
const riders = require('../models/Riders');

router.get('/', (req, res) => {
    res.send('Welcome Ride Share');
});

//Create database
router.get('/createDB', (req, res) => {
    let query = 'CREATE DATABASE ride_share';
    db.query(query, (err, result) => {
        if(err) 
            throw err;
        console.log(result);
        res.send('Database Created');
    })
});

//Get Ride
router.get('/communication', (req, res) => {
    let shortest = 100000000000;
    let Frider = {};
    let Fdriver = {}
    riders.forEach((rider) => {
        drivers.forEach((driver)=> {
            let distance = Math.sqrt( Math.pow((driver.currentX-rider.currentX), 2) + Math.pow((driver.currentY - rider.currentY), 2) );
            if(distance < shortest)
            {
                shortest = distance;
                Frider = rider;
                Fdriver = driver;
            }
                
        })
    })
    console.log(`Rider ${Frider.name} matches with ${Fdriver.name}`);
    res.status(200).json({msg: `Rider ${Frider.name} matches with ${Fdriver.name}`});
});



module.exports = router;