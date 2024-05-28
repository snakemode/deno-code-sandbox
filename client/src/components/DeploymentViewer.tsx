import React from 'react';

export type Props = { url: string, status: string };
export default function DeploymentViewer(props: Props) {
    const { url, status } = props;

    const showPreview = url && status === 'success';

    const notReady = (<div>{status}</div>);
    const preview = (
        <div>
            <div>{url}</div>
            <iframe src={url} title="sandbox" className="sandbox" />
        </div>
    );

    return showPreview ? preview : notReady;
}
