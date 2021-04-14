const io = require('socket.io-client')
const http = require('http')
const sch = require('node-schedule');
const { match } = require('assert');
const Str = require('@supercharge/strings')

let socket = io.connect('http://localhost:5002/communication')

const job = sch.scheduleJob('*/1 * * * * *', function(){
    riderRequest();
    driverRequest();
});

function riderRequest() {
    requestData = JSON.stringify({
        name: Str.random(6),
        currentX: Math.ceil(Math.random() * 100),
        currentY: Math.ceil(Math.random() * 100),
        destinationX: Math.ceil(Math.random() * 100),
        destinationY: Math.ceil(Math.random() * 100),
    });
    
    
    const postRiderRequest = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/rider',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': requestData.length
        }
    };
    
    const reqRider = http.request(postRiderRequest, res => {
        let requestData = '';
    
        res.on('data', (chunk) => {
            requestData += chunk;
        });
    
        res.on('end', () => {
            // console.log(`Rider ${requestData.name} is looking for a Driver....`);
        });
    
    }).on("error", (err) => {
        console.log("Error: ", err.message);
    })
    reqRider.write(requestData);
    reqRider.end();
}

function driverRequest() {
    requestData = JSON.stringify({
        name: Str.random(6),
        car: Math.ceil(Math.random() * 10000),
        currentX: Math.ceil(Math.random() * 100),
        currentY: Math.ceil(Math.random() * 100),
    });
    
    
    const postDriverRequest = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/driver',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': requestData.length
        }
    };
    
    const reqDriver = http.request(postDriverRequest, res => {
        let requestData = '';
    
        res.on('data', (chunk) => {
            requestData += chunk;
        });
    
        res.on('end', () => {
            // console.log(`Driver ${res.name} is looking for a Rider....`);
        });
    
    }).on("error", (err) => {
        console.log("Error: ", err.message);
    })
    reqDriver.write(requestData);
    reqDriver.end();
}

function giveRating(pair) {
    requestData = JSON.stringify({
        name: pair.driverName,
        car: pair.carNumber,
        rating: Math.ceil(Math.random() * 5),
    });
    
    
    const postRatingrRequest = {
        hostname: 'localhost',
        port: 5001,
        path: '/api/ratings',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': requestData.length
        }
    };
    
    const reqRating = http.request(postRatingrRequest, res => {
        let requestData = '';
    
        res.on('data', (chunk) => {
            requestData += chunk;
        });
    
        res.on('end', () => {
            // console.log(`Rider ${pair.riderName} gives a rating of ${requestData.rating} to driver ${pair.driverName}`);
        });
    
    }).on("error", (err) => {
        console.log("Error: ", err.message);
    })
    reqRating.write(requestData);
    reqRating.end();
}


socket.on('notify_client',(pair)=>{
        console.log(`Rider ${pair.riderName} matches with driver ${pair.driverName}, car number ${pair.carNumber}. Total cost = ${pair.cost}`);
        giveRating(pair);
    
})