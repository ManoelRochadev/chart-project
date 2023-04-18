import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { JsonValue } from 'react-use-websocket/dist/lib/types';
import useWebSocket from 'react-use-websocket';

type Activity = {
  requisicoes_por_segundo: number;
}

type lastMessage = {
  data: Activity[];
}

export function RealtimeLineChart() {
  const [data, setData] = useState({} as JsonValue);
  const [layout, setLayout] = useState({});
  const [frames, setFrames] = useState([]);

  const { lastJsonMessage } = useWebSocket<lastMessage>('ws://localhost:3333/',
  {
    onOpen: () => console.log('opened'),
    onError: (err) => console.log(err),
    shouldReconnect: () => true,
    reconnectInterval: 2000,
  });

  const activities = lastJsonMessage?.data

  useEffect(() => {
    if (activities) {
      setData(activities.map((activity) => activity.requisicoes_por_segundo));
    }
  }, [activities]);

  useEffect(() => {
    setLayout({
      title: 'Realtime Line Chart',
      xaxis: {
        title: 'Time',
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        title: 'Value',
        showline: false
      }
    });

    setFrames([{
      data: [{ y: data }],
      traces: [0],
    },
    ]);
  }, [data]);

  return (
    <Plot
      data={[{
        y: data,
        mode: 'lines',
        line: { color: '#80CAF6' }
      }]}
      layout={layout}
      frames={frames}
    />
  )
}