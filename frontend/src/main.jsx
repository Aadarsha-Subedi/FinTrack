//CORE REACT IMPORTS
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

//PAGES
import App from './App.jsx';

//THIRD PARTY IMPORTS
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster position='bottom-right' expand richColors closeButton toastOptions={{duration: 2000}} visibleToasts={5}  />
  </StrictMode>,
)
