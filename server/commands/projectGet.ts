import { DenoSubhostingClient } from "../deno-api/DenoSubhostingClient.ts";
import { RouterContext } from "jsr:@oak/oak/router";
import handleErrors from "./shared/handleErrors.ts";

export default async function (ctx: RouterContext<string, Record<string, string>>) {
    await handleErrors(ctx, async () => {
        const client = new DenoSubhostingClient();
        const project = await client.getProject(ctx?.params?.id);

        ctx.response.status = 200;
        ctx.response.body = JSON.stringify({ project });
    });
}