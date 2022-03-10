import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.render('home');
});
app.get('/*', (req, res) => {
  res.redirect('/');
});

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on('connection', (socket)=>{
  socket.on('enter_room', (msg, done)=>{
    console.log(msg);
    setTimeout(()=>{
      done();
    },10000);
  });
});

httpServer.listen(3000, () => {
  console.log('server is on http://localhost:3000 ✅');
});