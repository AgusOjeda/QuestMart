import { SWRConfig } from 'swr'
import AppRouter from './routes/AppRouter.tsx'
import './App.css'

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
      <AppRouter />
    </SWRConfig>
  );
}

export default App;
