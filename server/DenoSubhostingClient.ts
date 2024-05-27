export class DenoSubhostingClient {
    private API: string;
    private accessToken: string | undefined;
    private orgId: string | undefined;
    private headers: { Authorization: string; "Content-Type": string; };

    constructor() {
        this.API = "https://api.deno.com/v1";
        this.accessToken = Deno.env.get("DEPLOY_ACCESS_TOKEN");
        this.orgId = Deno.env.get("DEPLOY_ORG_ID");

        this.headers = {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
        };
    }

    public async createProject(name: string = "") {
        const response = await fetch(`${this.API}/organizations/${this.orgId}/projects`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ name }),
        });

        await this.validateResponse(response);
        return await response.json();
    }

    public async deployProject(id: string, files: Map<string, string>) {
        const assets = Array.from(files).reduce((acc, [name, content]) => {
            acc[name] = {
                kind: "file",
                content,
                encoding: "utf-8",
            };

            return acc;
        }, {} as Record<string, { kind: string; content: string; encoding: string }>);

        const response = await fetch(`${this.API}/projects/${id}/deployments`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                entryPointUrl: "main.ts",
                assets: assets,
                envVars: {},
            }),
        });

        await this.validateResponse(response);
        return await response.json();
    }

    private async validateResponse(response: Response) {
        if (!response.ok) {
            const body = await response.text();
            throw new Error(
                `Request failed with status code ${response.status}.\n
                ${response.statusText}\n
                ${body}`
            );
        }
    }
}
