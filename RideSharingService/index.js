const { POINT_CONVERSION_COMPRESSED } = require('constants');
const express = require('express');
// const mysql = require('mysql');
// const path = require('path');
const app = express();
const http = require('http')
const schedule = require('node-schedule')
const drivers = require('./models/Drivers');
const riders = require('./models/Riders');
const pairs = require('./models/Pairs');

let server_location = process.env.SERVERLOCATION;

const job = schedule.scheduleJob('*/5 * * * * *', function(){
        makePair();
});

function makePair() {
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
                var pair = {
                    "riderName" : rider.name,
                    "driverName" : drivers[mdIn].name,
                    "carNumber" : drivers[mdIn].car,
                    "cost" : cost
                  };
              
                  pairs.push(pair);
                  doCommunicate(pair);
                  console.log(`Rider ${pair.riderName} matches with driver ${pair.driverName}, car number ${pair.carNumber}. Toatl cost = ${pair.cost}`);
                  drivers.splice(mdIn, 1);
                  riders.splice(rIn, 1);

            }

        })
        pairs.length = 0;
}

function doCommunicate(pair) {
    
    const postRiderRequest = {
        hostname: `communication-service-${server_location}`,
        port: 5000,
        path: '/api/communication',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    const reqComminication = http.request(postRiderRequest, res => {
        console.log(`statusCode: ${res.statusCode} `)
    
    }).on("error", (err) => {
        console.log("Error: ", err.message);
    })
    reqComminication.write(JSON.stringify(pair));
    reqComminication.end();

}

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

app.post('/api/setserver', (req, res) => {
    server_location = req.body.name;
    console.log('Server Set Request');
    res.send('Successful');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});