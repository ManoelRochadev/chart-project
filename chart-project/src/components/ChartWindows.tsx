import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { Chart } from "react-google-charts";
import { SpinnerGap } from '@phosphor-icons/react'
import './RealtimeChart.css'

type lastMessage = {
  segundo: number;
  requisicoes: number;
}

export function ChartWindows() {
  const [dados, setDados] = useState<Array<[number, number]>>([]);
  const { lastJsonMessage } = useWebSocket<lastMessage>('wss://seashell-app-vr7p7.ondigitalocean.app/', {
    onOpen: () => console.log('opened'),
    onError: (err) => console.log(err),
    shouldReconnect: () => true,
    reconnectInterval: 2000,
  });

  useEffect(() => {
    const activities = lastJsonMessage;

    if (activities) {
      setDados((prevDados) => [...prevDados, [Number(activities.segundo), Number(activities.requisicoes)]]);
    }
  }, [lastJsonMessage]);

  if (dados.length === 0) {
    return (
      <div>
        <SpinnerGap size="50px" className='spinner' />
      </div>
    )
  }

  const maxSegundos = dados[dados.length - 1][0] + 10; // adiciona 10 segundos extras para a visualização
  const maxRequisicoes = 35000; // número máximo de requisições que será exibido no gráfico
  const tempoMaximoExibido = 20; // tempo máximo (em segundos) exibido no gráfico
  const tempoMinimoExibido = Math.max(dados[0][0], maxSegundos - tempoMaximoExibido); // calcula o tempo mínimo (em segundos) exibido no gráfico
  
  return (
    <Chart
      chartType="LineChart"
      data={[['segundo', 'requisicoes'], ...dados]}
      options={{
        title: "Monitoramento banco de dados igual ao gereciador de tarefas do Windows",
        legend: { position: "bottom" },
        hAxis: { title: "segundo", viewWindow: { min: tempoMinimoExibido, max: maxSegundos } },
        vAxis: { title: "Número de Requisições", viewWindow: { min: 0, max: maxRequisicoes } },
        is3D: true,
      }}
      width="100vw"
      height="620px"
    />
  );
}
