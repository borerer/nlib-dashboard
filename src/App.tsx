import React from 'react';
import './App.css';
import KVPage from './components/KVPage';
import Navigation from './components/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app">
      <div className='navi-container'>
        <Navigation></Navigation>
      </div>
      <div className='content-container'>
        <KVPage></KVPage>
      </div>
      <ToastContainer position='bottom-left'></ToastContainer>
    </div>
  );
}

export default App;
