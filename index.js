const { POINT_CONVERSION_COMPRESSED } = require('constants');
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const http = require('http').createServer()
const sch = require('node-schedule')
const drivers = require('./models/Drivers');
const riders = require('./models/Riders');
const pairs = require('./models/Pairs');

const io = require('socket.io')(http)

io.of('communication').on('connection', (socket)=>{
    console.log("new user connected")
    const job = sch.scheduleJob('*/5 * * * * *', function(){
        var matchedDriverIndex;
    
        var distance = Number.MAX_VALUE;
        let rIn = -1;
        let dIn = -1;

        riders.forEach((rider) => {
            rIn +=1;
            let mdIn;
            let shortest =  Number.MAX_VALUE;
            dIn = -1;
            if(drivers.length) {
                drivers.forEach((driver)=> {
                    dIn +=1;
                    let distance = Math.sqrt( Math.pow((driver.currentX-rider.currentX), 2) + Math.pow((driver.currentY - rider.currentY), 2) );
                    cost = 2*distance
                    if(distance < shortest)
                    {
                        shortest = distance;
                        mdIn = dIn;
                    }
                        
                })
                var match = {
                    "riderName" : rider.name,
                    "driverName" : drivers[mdIn].name,
                    "carNumber" : drivers[mdIn].car,
                    "cost" : cost
                  };
              
                  pairs.push(match);
                  console.log(`Rider ${match.riderName} matches with driver ${match.driverName}, car number ${match.carNumber}. Toatl fare = ${match.cost}`);
                  drivers.splice(mdIn, 1);
                  riders.splice(rIn, 1);

            }

        })
        socket.emit("welcome",pairs);
    });
})

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
    // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}}`);
    next();
};

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/api', require('./routes/root'));
app.use('/api', require('./routes/driver'));
app.use('/api', require('./routes/rider'));


const Sckt = 5001;
const PORT = process.env.PORT || 5000;

http.listen(Sckt,()=>{
    console.log(`Socket Running on ${Sckt}`);
})

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});