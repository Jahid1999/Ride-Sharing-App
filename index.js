const { POINT_CONVERSION_COMPRESSED } = require('constants');
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const http = require('http').createServer()
const sch = require('node-schedule')

const io = require('socket.io')(http)

io.of('communication').on('connection', (socket)=>{
    console.log("new user connected")
    const job = sch.scheduleJob('*/5 * * * * *', function(){
        socket.emit("welcome","User is connected")
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
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}}`);
    next();
};

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/api', require('./routes/root'));
app.use('/api', require('./routes/driver'));


const Sckt = 9001;
const PORT = process.env.PORT || 5000;

http.listen(Sckt,()=>{
    console.log(`Socket Running on ${Sckt}`);
})

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});