//index.js
import app from './app.js';
import appWs from './app-ws.js';
import { watchFile } from './watchFileCSV.js';

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`App Express is running!`);
    
})

const wss = appWs(server);
 
// gerar 100 numeros aleátorios e enviar para o cliente
 wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log('received: %s', message);
    });
    ws.send('something');
    watchFile(data => {
      console.log(data);
      wss.clients.forEach(client => {
          client.send(JSON.stringify({data}));
      });
  });
});

