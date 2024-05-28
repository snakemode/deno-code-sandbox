import { DenoSubhostingClient } from "../deno-api/DenoSubhostingClient.ts";
import { RouterContext } from "jsr:@oak/oak/router";
import handleErrors from "./shared/handleErrors.ts";
import createUrl from "../util/createUrl.ts";

export default async function (ctx: RouterContext<string, Record<string, string>>) {
    await handleErrors(ctx, async () => {
        const client = new DenoSubhostingClient();

        const deployment = await client.getDeployment(ctx?.params?.id);
        const project = await client.getProject(deployment.projectId);

        ctx.response.status = 200;
        ctx.response.body = JSON.stringify({
            project,
            deployment,
            url: createUrl(project, deployment)
        });
    });
}
