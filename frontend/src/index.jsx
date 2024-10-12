import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ProductProviders } from './contextAPI/productProvider';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ProductProviders>
            <App />
        </ProductProviders>
    </React.StrictMode>
)