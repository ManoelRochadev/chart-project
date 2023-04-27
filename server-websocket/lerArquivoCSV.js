import csv from "csv-parser";
import fs from "fs";

export function lerArquivoCSV(callback) {
  const stream = fs.createReadStream("ir_throughput_processed.csv");
  const streamConfig = stream.pipe(
    csv({
      skipLines: 5,
      headers: ["segundo", "requisicoes"]
    })
  );

  streamConfig.on("data", data => {
    let inicial = 0;
    setInterval(() => {
      if(data.segundo == inicial){
        callback(data);
      }
      inicial++
    }
      , 1000);
  }
  );
}

