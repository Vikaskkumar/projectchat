

const http = require('http');
const express = require('express');
const path = require('path');
const  {Server}= require('socket.io');





const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static(path.resolve(__dirname,"../../livechat")));




const users = {};

io.on('connection', socket => {

    socket.on('new-user-joined', Name => {
        console.log("new user",Name);
        // socket.broadcast.emit('signup',Name);
        users[socket.id] = Name;
        socket.broadcast.emit('user-joined', Name);
    });

    socket.on('send', newmessage => {
        
        socket.broadcast.emit('receive',newmessage);
        console.log(newmessage);

    });
});




// app.get('/',(req,res)=>{
//     res.send("page loded");
// })


app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'path/to/your/file.html'));
})

server.listen('8000',()=>{
    console.log("server is running on port 8000");

})