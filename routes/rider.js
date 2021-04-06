const express = require('express');
const router = express.Router();

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

module.exports = router;