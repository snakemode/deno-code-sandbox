import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";

export const app = new Application();
const router = new Router();

router.get("/api", (ctx) => {
  ctx.response.body = JSON.stringify({ message: "Hello, World!" });
});

app.use(router.routes());
app.use(async (context, next) => {
  const staticPaths = [
    `${Deno.cwd()}/client/dist`,
    `${Deno.cwd()}/client/public`,
  ];

  for (const path of staticPaths) {
    try {
      await context.send({ root: path, index: "index.html" });
      return;
    } catch {
      continue;
    }
  }

  await next();
});


if (import.meta.main) {
  await app.listen({ port: 8000 });
}