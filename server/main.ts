import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import routeStaticFilesFrom from "./routeStaticFilesFrom.ts";
import { DenoSubhostingClient } from "./DenoSubhostingClient.ts";

export const app = new Application();
const router = new Router();

router.get("/api", (ctx) => {
  ctx.response.body = JSON.stringify({ message: "Hello, World!" });
});

router.get("/api/sample", (ctx) => {
  const fileContents = Deno.readTextFileSync(`${Deno.cwd()}/server/samples/code.ts`);
  ctx.response.body = JSON.stringify({
    code: fileContents
  });
});

router.post("/api/create", async (ctx) => {
  const client = new DenoSubhostingClient();

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
});

app.use(router.routes());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/client/dist`,
  `${Deno.cwd()}/client/public`,
]));


if (import.meta.main) {
  await app.listen({ port: 8000 });
}