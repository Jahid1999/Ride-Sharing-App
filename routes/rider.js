const express = require('express');
const router = express.Router();
const riders = require('../models/Riders');
const uuid = require('uuid');

// //Create Rider Table

// app.get('/createRiderTable', (req, res) => {
//     let query = 'CREATE TABLE rider(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(255), current_location POINT)';
//     db.query(query, (err, result) => {
//         if(err) 
//             throw err;
//         console.log(result);
//         res.send('Rider Table Created');
//     })
// });

// Get Riders
router.get('/riders', (req, res) => {
    res.status(200).json(riders);
})

// Add Rider Request
router.post('/rider', (req, res) => {
    const newRider = {
        id: uuid.v4(),
        name: req.body.name,
        currentX: req.body.currentX,
        currentY:req.body.currentY,
        destinationX: req.body.destinationX,
        destinationY: req.body.destinationY,
    }
    riders.push(newRider);
    console.log(`Rider ${newRider.name} is looking for a Driver....`);
    res.status(201).json(newRider);

})


module.exports = router;