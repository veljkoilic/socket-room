const express = require('express');
const app = express();
/*eslint-disable*/
const server = app.listen(3000, ()=>{
    console.log('Server running on 3000');
})

const io = require('socket.io')(server)


io.on('connection', function(socket) {

    socket.on('sendMessage', function(data) {
        socket.emit('click', {socketid: socket.id, msgs: data, connected:"Connected!"});
        
    });
    

    socket.on('disconnect', (data) => {
        console.log("Disconnected")
        socket.emit('function',{msg:data})
      })
});