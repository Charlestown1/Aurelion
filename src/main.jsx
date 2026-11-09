import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { DemoProvider } from './context/DemoContext.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <DemoProvider><App /></DemoProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
