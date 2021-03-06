"use strict";
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const generateMessage = require('./utils/message.js').generateMessage;
const generatLocationMessage = require('./utils/message.js').generateLocationMessage;
const isRealString = require('./utils/validation.js').isRealString;
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 4200;
const Users = require('./utils/users.js').Users;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');


    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required.');
        }

        socket.join(params.room);

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message );
       io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generatLocationMessage('Admin', coords.latitude, coords.longitude))
    });
    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

