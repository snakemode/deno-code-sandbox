import React, { useState, useEffect } from 'react';

export default function EditCode() {
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
    
  
    return (
      <div className="editor">
        <textarea className="code" value={code} onChange={updateCode} />
      </div>
    )
  }
