import { RouterContext } from "jsr:@oak/oak/router";
import handleErrors from "./shared/handleErrors.ts";
import { DenoSubhostingClient } from "../deno-api/DenoSubhostingClient.ts";
import createUrl from "../util/createUrl.ts";

const sampleCode = Deno.readTextFileSync(`${Deno.cwd()}/server/samples/code.ts`);

export default async function (ctx: RouterContext<string, Record<string, string>>) {
    await handleErrors(ctx, async () => {
        let id: string | undefined;
        let code: string = sampleCode;

        if (ctx?.params?.id) {
            id = ctx?.params?.id;
            code = (await ctx.request.body.json()).code;
        }

        const result = await deployProject(code, id);

        ctx.response.status = 201;
        ctx.response.body = JSON.stringify(result);
    });
}

async function deployProject(code: string, projectId?: string) {
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
