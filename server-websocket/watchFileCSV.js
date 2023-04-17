import neatCsv from 'neat-csv';
import fs from 'fs';

const file = 'data.csv';
let lastModified = null;

export function watchFile(callback) {
  fs.stat(file, (err, stats) => {
    if (err) throw err;
    if (lastModified && stats.mtimeMs == lastModified) {
      // Nenhuma mudança foi feita no arquivo desde a última verificação
      return setTimeout(() => watchFile(callback), 1000); // verifique novamente em 1 segundo
    }
    lastModified = stats.mtimeMs;
    // Ler os novos dados adicionados usando a biblioteca neat-csv
    fs.readFile(file, async (err, data) => {
      if (err) throw err;
      const newData = await neatCsv(data);
      callback(newData); // chame o callback com os dados lidos do arquivo
      setTimeout(() => watchFile(callback), 1000); // verifique novamente em 1 segundo
    });
  });
}
