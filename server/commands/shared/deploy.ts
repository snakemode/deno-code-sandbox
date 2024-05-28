import { DenoSubhostingClient } from "../../deno-api/DenoSubhostingClient.ts";
import createUrl from "../../util/createUrl.ts";

export default async function (code: string, projectId?: string) {
    const client = new DenoSubhostingClient();
    const files = new Map<string, string>();
    files.set("main.ts", code);

    if (!projectId) {
        const project = await client.createProject();
        projectId = project.id;
    }

    const project = await client.getProject(projectId);
    const deployment = await client.deployProject(projectId, files);

    return {
        project,
        deployment,
        url: createUrl(project, deployment)
    };
}