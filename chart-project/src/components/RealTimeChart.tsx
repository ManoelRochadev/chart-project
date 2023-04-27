import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { Chart } from "react-google-charts";
import { SpinnerGap } from '@phosphor-icons/react'
import './RealtimeChart.css'

type lastMessage = {
  segundo: number;
  requisicoes: number;
}

export function RealtimeLineChart() {
  const [dados, setDados] = useState<Array<[number, number]>>([]);
  const { lastJsonMessage } = useWebSocket<lastMessage>('ws://localhost:3333/', {
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

  return (
    <Chart
      chartType="LineChart"
      data={[['segundo', 'requisicoes'], ...dados]}
      options={{
        title: "Monitoramento banco de dados",
        legend: { position: "bottom" },
        hAxis: { title: "segundo", viewWindow: { min: 0, max: 1000 } },
        vAxis: { title: "Número de Requisições", viewWindow: { min: 0, max: 35000 } },
        is3D: true,
      }}
      width="100vw"
      height="620px"
    />
  );
}
