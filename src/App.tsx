import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Modal from "./components/Modal"
import ShareButton from "./components/ShareButton"

function App() {

  const [isShareOpen, setShareVisibility] = useState<boolean>(false)

  return (
    <div className={`container`}>
      <ShareButton label="SHARE" onClick={() => setShareVisibility(!isShareOpen)} />
      <Modal visibility={isShareOpen} onClose={() => setShareVisibility(false)} />
    </div>
  );
}

export default App;
