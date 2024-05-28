import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';


export default function ViewCode() {

    const navigate = useNavigate();
    const [code, setCode] = useState('');
  
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

        if (res.ok) {  
            const responseJson = await res.json();    
            navigate(`/edit/${responseJson.projectId}`);
        }
      };
    
  
    return (
      <div className="editor">
        <pre className="code">{code}</pre>
        <button className="run" onClick={remix}>Remix Code</button>
      </div>
    )
  }