const express = require('express');
const router = express.Router();

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

module.exports = router;