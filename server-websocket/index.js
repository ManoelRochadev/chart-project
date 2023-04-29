//index.js
import app from './app.js';
import appWs from './app-ws.js';
import { lerArquivoCSV } from './lerArquivoCSV.js';

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`App Express is running!`);

})

export const wss = appWs(server);

wss.on('connection', (ws) => {
    console.log('Client connected');

    lerArquivoCSV(data => {
        ws.send(JSON.stringify(data));
        console.log(data);
    });

});
