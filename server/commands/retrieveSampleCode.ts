import { Context } from "jsr:@oak/oak/context";

export default function(ctx: Context<Record<string, object>>) {
    const fileContents = Deno.readTextFileSync(`${Deno.cwd()}/server/samples/code.ts`);
    ctx.response.body = JSON.stringify({
        code: fileContents
    });
}