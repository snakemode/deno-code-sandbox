import { RouterContext } from "jsr:@oak/oak/router";
import handleErrors from "./shared/handleErrors.ts";
import deployProject from "./shared/deploy.ts";

const sampleCode = Deno.readTextFileSync(`${Deno.cwd()}/server/samples/code.ts`);

export default async function (ctx: RouterContext<string, Record<string, string>>) {
    await handleErrors(ctx, async () => {
        let id: string | undefined;
        let code: string = sampleCode;

        if (ctx?.params?.id) {
            id = ctx?.params?.id;
            code = await ctx.request.body.json();
        }

        const result = await deployProject(code, id);
        ctx.response.status = 201;
        ctx.response.body = JSON.stringify(result);
    });
}