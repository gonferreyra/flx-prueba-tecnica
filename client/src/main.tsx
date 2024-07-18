import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ModalContextProvider from './contexts/ModalContextProvider.tsx';
import SearchTextContextProvider from './contexts/SearchTextContextProvider.tsx';
import UsersContextProvider from './contexts/UsersContextProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SearchTextContextProvider>
      <UsersContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </UsersContextProvider>
    </SearchTextContextProvider>
  </React.StrictMode>
);
