import React from 'react';
import ReactDOM from 'react-dom/client';

// Import React GlassKit design tokens globally
import 'react-glasskit/css/tokens.css';
import './demo.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Missing root element.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
