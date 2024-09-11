const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageinp');
const messagecontainer = document.querySelector(".container");

const append = (message,position)=>{

const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
};


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let newmessage = messageinput.value;
    append(`you: ${newmessage}`,'right');
    socket.emit('send',newmessage);
    messageinput = '';


});

const firstname = prompt('enter name');

socket.emit('new-user-joined',firstname);


socket.on('user-joined',(Name)=>{
    console.log("hi front",Name);
   append(`${Name} joined the chat `,'right');
   console.log(Name);
})


// socket.emit('send',newmessage);


socket.on('receive',(data)=>{

    append(`new message ${data}`,'left');

} );

