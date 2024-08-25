import React from 'react';
import './App.css';
import ImageUpload from './ImageUpload';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Upload</h1>
        <ImageUpload />
      </header>
    </div>
  );
};

export default App;