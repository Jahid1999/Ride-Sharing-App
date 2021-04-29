const { POINT_CONVERSION_COMPRESSED } = require('constants');
const express = require('express');
const mongoose = require('mongoose')
const url = 'mongodb://mongodb:27017/distributedSystemAssignment'
const app = express();
const Rating = require('./models/Rating')


//Create Connection
mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true})
const con = mongoose.connection

con.on('open',function (){
    console.log('Connection established with mongodb...')
})

const logger = (req, res, next) => {
    // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}}`);
    next();
};

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Store Rating
app.post('/rating',async (req,res)=>{
    console.log(`Driver ${req.body.name} got a rating of ${req.body.rating}.`);
    const rating = new Rating({
        driverName: req.body.name,
        car: req.body.car,
        rating: req.body.rating,
    });

    rating.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    });
})


const PORT = process.env.PORT || 5000;

// http.listen(Sckt,()=>{
//     console.log(`Socket Running on ${Sckt}`);
// })

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});