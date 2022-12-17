import React from 'react';
import './App.css';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="app">
      <div className='navi-container'>
        <Navigation></Navigation>
      </div>
      <div className='content-container'>
      </div>
    </div>
  );
}

export default App;
