const io = require('socket.io-client')
const http = require('http')
const riders = require('./models/Riders');
const sch = require('node-schedule')

let socket = io.connect('http://localhost:5001/communication')

const search = {
    id: '',
    positionX: Math.random(),
    positionY: Math.random(),
}

requestData = JSON.stringify({
    name: 'ascvjsv',
    currentX: Math.random(),
    currentY: Math.random(),
    destinationX: Math.random(),
    destinationY: Math.random(),
});

const fetchAllRiders = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/rider',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': requestData.length
    }
};

const reqRider = http.request(fetchAllRiders, res => {
    console.log(`statusCode: ${res.statusCode} \n`)
    let requestData = '';

    res.on('data', (chunk) => {
        requestData += chunk;
    });

    res.on('end', () => {
        console.log(JSON.parse(requestData));
    });

}).on("error", (err) => {
    console.log("Error: ", err.message);
})
reqRider.write(requestData);
reqRider.end();

// const job = sch.scheduleJob('*/1 * * * * *', function(){
   
// });


socket.on('welcome',(data)=>{
    console.log(data)
})