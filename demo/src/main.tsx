import React from 'react';
import ReactDOM from 'react-dom/client';

// Import React GlassKit design tokens globally
import 'react-glasskit/css/tokens.css';
import './demo.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
