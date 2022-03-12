const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true;
let roomName;

function makeMessage(message){
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
};

function submitMessage(event) {
  event.preventDefault();
  const input = room.querySelector('#msg input');
  const value = input.value;
  socket.emit('new_message', input.value, roomName, ()=>{
    makeMessage(`You: ${value}`);
  });
  input.value='';
};

function handleNicknameSubmit(event){
  event.preventDefault();
  const input = room.querySelector('#name input');
  const value = input.value;
  socket.emit('nickname', input.value);
};

function showRoom() {
  room.hidden = false;
  welcome.hidden = true;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector('#msg');
  const nameForm = room.querySelector('#name');
  msgForm.addEventListener('submit', submitMessage);
  nameForm.addEventListener('submit', handleNicknameSubmit);
};

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  roomName = input.value;
  socket.emit('enter_room', input.value, showRoom);
  input.value='';
};

form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', (user, newCount) => {
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName} (${newCount})`;
  makeMessage(`${user} arrived!`);
});

socket.on('bye', (left, newCount) => {
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName} (${newCount})`;
  makeMessage(`${left} left ㅠㅠ`);
});

socket.on('new_message', makeMessage);

socket.on('room_change', (rooms) => {
  const roomList = welcome.querySelector('ul');
  if(rooms.length === 0){
    roomList.innerHTML = '';
    return;
  };
  rooms.forEach((room) => {
    const li = document.createElement('li');
    li.innerText = room;
    roomList.append(li);
  });
});