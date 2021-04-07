const io = require('socket.io-client')
const http = require('http')
const riders = require('./models/Riders');
const sch = require('node-schedule');
const { match } = require('assert');
const Str = require('@supercharge/strings')

let socket = io.connect('http://localhost:5001/communication')

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
            console.log(`Rider ${requestData.name} is looking for a Driver....`);
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
        car:Math.ceil(Math.random() * 10000),
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
            console.log(`Driver ${requestData.name} is looking for a Rider....`);
        });
    
    }).on("error", (err) => {
        console.log("Error: ", err.message);
    })
    reqDriver.write(requestData);
    reqDriver.end();
}


socket.on('welcome',(data)=>{
    data.forEach(pair => {
        console.log(`Rider ${pair.riderName} matches with driver ${pair.driverName}, car number ${pair.carNumber}. Total fare = ${pair.cost}`);
    });
    
})