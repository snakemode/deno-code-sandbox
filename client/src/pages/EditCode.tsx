import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function EditCode() {
    const { id } = useParams();

    const [code, setCode] = useState<string>('');
    const [deployedUrl, setDeployedUrl] = useState<string>('');
    const updateCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCode(e.target.value);
    };
    
    useEffect(() => {
      (async () => {
        const res = await fetch(`/api/sample`);
        const data = await res.json();
        setCode(data.code);
      })();
    }, []);
    
    const update = async () => {
      const response = await fetch(`/api/project/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
      });

      if (!response.ok) {
          console.error('Failed to update code');
          return;
      }

      let { deployment, url } = await response.json();

      while (deployment.status === 'pending') {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const response = await fetch(`/api/deployment/${deployment.id}`);
          const responseBody = await response.json();
          deployment = responseBody.deployment;
      }

      setDeployedUrl(url)
    };

    const previewElement = deployedUrl 
    ? (<iframe src={deployedUrl} title="sandbox" className="sandbox" />) 
    : <div>Waiting...</div>;
  
    return (
      <div className="editor">
        <textarea className="code" value={code} onChange={updateCode} />        
        <button className="run" onClick={update}>Save Update</button>
        {previewElement}
      </div>
    )
  }
