import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { iceCreamApi } from './api/iceCreamApi'

// Configure API to use real database instead of mock data
iceCreamApi.setUseMockData(false);

createRoot(document.getElementById("root")!).render(<App />);
