import { RouterContext } from "jsr:@oak/oak/router";
import handleErrors from "./shared/handleErrors.ts";
import deployProject from "./shared/deploy.ts";

export default async function (ctx: RouterContext<string, Record<string, string>>) {
    await handleErrors(ctx, async () => {
        const { code } = await ctx.request.body.json();
        const result = await deployProject(code, ctx?.params?.id);

        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(result);
    });
}
