import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DeploymentViewer from "../components/DeploymentViewer.tsx";
import doUntil from "../../../server/util/doUntil.ts";
import ApiClient from "../api/ApiClient.ts";

const client = new ApiClient();

export default function EditCode() {
    const { id } = useParams();
    const [code, setCode] = useState<string>('');
    const [deployedUrl, setDeployedUrl] = useState<string>('');
    const [status, setStatus] = useState<string>('pending');
    
    useEffect(() => {
      (async () => {
        const code = await client.getSampleCode();
        setCode(code);
      })();
    }, []);
        
    const updateCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCode(e.target.value);
    };

    const update = async () => {
      const { deployment, url } = await client.createDeployment(id!, code);

      const response = await doUntil(async () => {
          return await client.getDeployment(deployment.id);
      }, (deployment) => deployment.status !== 'pending');

      setStatus(response.status);
      setDeployedUrl(url)
    };

    return (
      <div className="editor">
        <textarea className="code" value={code} onChange={updateCode} />        
        <button className="run" onClick={update}>Run</button>
        <DeploymentViewer url={deployedUrl} status={status} />
      </div>
    )
  }
