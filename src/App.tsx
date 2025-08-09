import React from 'react';
import { ToastContainer, Bounce } from 'react-toastify';
import Router from './Router';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default App;
