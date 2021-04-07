const io = require('socket.io-client')
const http = require('http')
const riders = require('./Riders');

let socket = io.connect('http://localhost:9001/communication')

const search = {
    id: '',
    positionX: Math.random(),
    positionY: Math.random(),
}

const fetchAllRiders = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/communication',
    method: 'Get',
}


const reqRider = http.request(fetchAllRiders, res => {
    console.log(`statusCode: ${res.statusCode} \n`)
    console.log(res.data)
    console.log("we are good to go")
})
reqRider.end()


socket.on('welcome',(data)=>{
    console.log(data)
})