import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import routeStaticFilesFrom from "./commands/routeStaticFilesFrom.ts";
import retrieveSampleCode from "./commands/retrieveSampleCode.ts";
import createDenoSubhostedProject from "./commands/createDenoSubhostedProject.ts";

export const app = new Application();

app.use(new Router()
  .get("/api/sample", retrieveSampleCode)
  .post("/api/create", createDenoSubhostedProject)
  .routes()
);

app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/client/dist`,
  `${Deno.cwd()}/client/public`,
]));

if (import.meta.main) {
  await app.listen({ port: 8000 });
}