import { RouterContext } from "jsr:@oak/oak/router";
import handleErrors from "./shared/handleErrors.ts";
import deployProject from "./shared/deploy.ts";

const code = Deno.readTextFileSync(`${Deno.cwd()}/server/samples/code.ts`);

export default async function (ctx: RouterContext<string, Record<string, string>>) {
    await handleErrors(ctx, async () => {
        const result = await deployProject(code);
        ctx.response.status = 201;
        ctx.response.body = JSON.stringify(result);
    });
}