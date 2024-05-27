import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import routeStaticFilesFrom from "./routeStaticFilesFrom.ts";

export const app = new Application();
const router = new Router();

router.get("/api", (ctx) => {
  ctx.response.body = JSON.stringify({ message: "Hello, World!" });
});

app.use(router.routes());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/client/dist`,
  `${Deno.cwd()}/client/public`,
]));


if (import.meta.main) {
  await app.listen({ port: 8000 });
}