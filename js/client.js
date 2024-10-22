const socket = io('http://localhost:7620');


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messgaeInp');
const messgaeContainer = document.querySelector(".container");
var bell = new Audio('bell.mp3');

let Name = prompt("Enter your name");
socket.emit('new-user-joined', Name);


const append = (message,position,Class) =>
    {
        const messageElement = document.createElement("div");
        messageElement.innerText = message;
        messageElement.classList.add(Class);
        messageElement.classList.add(position);
        messgaeContainer.append(messageElement);
        if(position == 'lme')
        {
            bell.play();
        }
        
        

    } 

form.addEventListener('submit' , (e)=>
    {
        e.preventDefault();
        const message = messageInput.value;
        append(`You: ${message}`,'rme','me');
        socket.emit('send',message);
        messageInput.value = " ";
    })    
socket.on('user-joined', name =>
{
    if(name != null)
    {
        append(`${name} joined chat` , 'rme','jme');
    }
});

socket.on('receive', data =>
{
    append(`${data.name}: ${data.message} `, 'lme','me');
})
socket.on('leave', user =>
{   if(user != null)
    {
    append(`${user} left the chat`,'rme','dme');
    }
   

})
