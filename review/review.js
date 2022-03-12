socket.on('room_change', (rooms) => {
  const roomLIst = welcome.querySelector('ul');
  if(rooms.length === 0){
    roomLIst.innerHTML = '';
    return;
  };
  rooms.forEach((room) => {
    const li = document.createElement('li');
    li.innerText = 'room';
    roomLIst.append(li);
  });
});