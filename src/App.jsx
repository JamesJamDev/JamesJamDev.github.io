import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import Test from './test.jsx'
import Projects from './test.jsx';
import JellyJamIcon from './JellyJamIcon.jsx';

function App() {
  const [state, SetState]  = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <JellyJamIcon />
        <div style={{ margin: '200px 0' }}></div>
        <Projects />
    </div>
  );
}

export default App
