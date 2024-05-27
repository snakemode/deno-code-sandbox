import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [code, setCode] = useState('');
  const updateCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };
  
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/sample');
      const data = await res.json();
      setCode(data.code);
    })();
  }, []);

  const remix = async () => {
    const res = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    });

    // call api to create project
    // call api to deploy project
    // redirect to deployed project
  };
  

  return (
    <div className="App">
      <div className="editor">
        <textarea className="code" value={code} onChange={updateCode} />
        <button className="run" onClick={remix}>Remix Code</button>
      </div>
      <div className="console"></div>
    </div>
  )
}

export default App