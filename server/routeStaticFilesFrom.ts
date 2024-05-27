import { Next } from "jsr:@oak/oak/middleware";
import { Context } from "jsr:@oak/oak/context";

export default function routeStaticFilesFrom(staticPaths: string[]) {
    return async (context: Context<Record<string, object>>, next: Next) => {
        for (const path of staticPaths) {
            try {
                await context.send({ root: path, index: "index.html" });
                return;
            } catch {
                continue;
            }
        }

        await next();
    };
}
