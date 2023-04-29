import './App.css'
import { ChartWindows } from './components/ChartWindows';
import { RealtimeLineChart } from './components/RealTimeChart';

export function App() {
  return (
    <div className='main'>
      <RealtimeLineChart />
      <ChartWindows />
    </div>
  );
}