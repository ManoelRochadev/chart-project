//index.js
import app from './app.js';
import appWs from './app-ws.js';
import { watchFile } from './watchFileCSV.js';

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`App Express is running!`);
    
})

export const wss = appWs(server);
 
 wss.on('connection', (ws) => {
    console.log('Client connected');
    
    watchFile(data => {
        console.log(data);
        setInterval(() => {
            wss.clients.forEach(client => {
                client.send(JSON.stringify({data}));
            });
        }, 1000);
    });
});

