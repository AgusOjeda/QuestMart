import { SWRConfig } from 'swr';
import GameApp from './components/GameApp';
import './App.css';

function App() {
  return (
    <SWRConfig 
      value={{
        dedupingInterval: 2000,
        shouldRetryOnError: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
      }}
    >
      <GameApp />
    </SWRConfig>
  );
}

export default App;
