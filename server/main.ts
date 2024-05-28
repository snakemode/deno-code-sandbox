import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import routeStaticFilesFrom from "../client/src/util/routeStaticFilesFrom.ts";
import sampleCodeGet from "./commands/sampleCodeGet.ts";
import projectCreateOrUpdate from "./commands/projectCreateOrUpdate.ts";
import deploymentGet from "./commands/deploymentGet.ts";

export const app = new Application();
const router = new Router();
router.get("/api/sample", sampleCodeGet)
router.post("/api/project", projectCreateOrUpdate)
router.post("/api/project/:id", projectCreateOrUpdate);
router.get("/api/deployment/:id", deploymentGet);

app.use(router.routes());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/client/dist`,
  `${Deno.cwd()}/client/public`,
]));

if (import.meta.main) {
  await app.listen({ port: 8000 });
}