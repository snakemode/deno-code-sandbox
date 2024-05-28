import { DenoSubhostingClient } from "../deno-api/DenoSubhostingClient.ts";
import { RouterContext } from "jsr:@oak/oak/router";
import handleErrors from "./shared/handleErrors.ts";
import createUrl from "./shared/createUrl.ts";

export default async function (ctx: RouterContext<string, Record<string, string>>) {
    await handleErrors(ctx, async () => {
        const client = new DenoSubhostingClient();

        let url: string | null = null;
        let project: Project | undefined;
        const deployment = await client.getDeployment(ctx?.params?.id);

        if (deployment.status === "success" || deployment.status === "failed") {
            project = await client.getProject(deployment.projectId);
            url = createUrl(project, deployment);
        }

        ctx.response.status = 200;
        ctx.response.body = JSON.stringify({
            project,
            deployment,
            url
        });
    });
}
