"use strict";
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const generatMessage = require('./utils/message.js').generateMessage;
const generatLocationMessage = require('./utils/message.js').generateLocationMessage;
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 4200;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', generatMessage('Admin', 'Welcome to the chat app!'));

    socket.broadcast.emit('newMessage', generatMessage('Admin', 'New user joined.'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message );
       io.emit('newMessage', generatMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generatLocationMessage('Admin', coords.latitude, coords.longitude))
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

