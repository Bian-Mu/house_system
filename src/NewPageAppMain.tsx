import React from 'react';
import { createRoot } from 'react-dom/client'
import NewPageApp from './NewPageApp';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <NewPageApp />
    </React.StrictMode>
);