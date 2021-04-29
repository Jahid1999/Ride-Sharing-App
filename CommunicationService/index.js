const { POINT_CONVERSION_COMPRESSED } = require('constants');
const express = require('express');
const app = express();
const http = require('http').createServer()
const sch = require('node-schedule')
const io = require('socket.io')(http)

const logger = (req, res, next) => {
    // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}}`);
    next();
};

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

let storeSocket;

io.of('communication').on('connection', (socket)=>{
    storeSocket = socket
})

app.post('/api/communication', (req,res)=>{
     console.log('Got a request for communication');
    storeSocket.emit("notify_client",req.body);
})

const PORT = process.env.PORT || 5000;

http.listen(5001, () => {
    console.log(`Socket & Server Running on port: 5002`);
});

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});