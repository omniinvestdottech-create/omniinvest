import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { EncryptionManager, SessionManager, AuditLogger } from './utils/security';

async function initializeApp() {
  // Initialize encryption before any secure operations
  await EncryptionManager.getInstance().initialize();
  
  // Start session and log app start
  SessionManager.startSession();
  await AuditLogger.log('app_started');
  
  // Render the app
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

initializeApp().catch(console.error);
