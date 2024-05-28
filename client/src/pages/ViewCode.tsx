import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import ApiClient from "../api/ApiClient.ts";

const client = new ApiClient();

export default function ViewCode() {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
  
    useEffect(() => {
      (async () => {
        const code = await client.getSampleCode();
        setCode(code);
      })();
    }, []);
  
    const fork = async () => {
        const responseJson = await client.createProject(code); 
        navigate(`/edit/${responseJson.project.id}`);        
    };    
  
    return (
      <div className="editor">
        <pre className="code">{code}</pre>
        <button className="run" onClick={fork}>Create Interactive Sandbox</button>
      </div>
    )
  }