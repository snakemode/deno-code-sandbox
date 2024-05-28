import { Context } from "jsr:@oak/oak/context";
import { DenoSubhostingClient } from "../DenoSubhostingClient.ts";

export default async function (ctx: Context<Record<string, object>>) {
    const client = new DenoSubhostingClient();

    try {
        const project = await client.createProject();
        const projectId = project.id;

        const files = new Map<string, string>();
        files.set("main.ts", "console.log('hello world');");

        const response = await client.deployProject(projectId, files);
        const responseBody = await response.json();

        console.log(responseBody);

        ctx.response.status = 201;
        ctx.response.body = JSON.stringify({
            projectId,
            project
        });

    } catch (error) {
        console.error(error);
        ctx.response.status = 500;
        ctx.response.body = JSON.stringify({
            message: "Internal Server Error"
        });
    }
}