export default class ApiClient {
    constructor(private readonly baseUrl: string = "") { }

    public async getSampleCode(): Promise<SampleCode> {
        const response = await fetch(`${this.baseUrl}/api/sample`);
        return (await response.json()).code;
    }

    public async createProject(code: string): Promise<ProjectDeployment> {
        const response = await fetch(`${this.baseUrl}/api/project`, {
            method: 'POST',
            body: JSON.stringify({ code })
        });

        if (!response.ok) {
            throw new Error('Failed to create project');
        }

        return await response.json();
    }

    public async createDeployment(id: string, code: string): Promise<ProjectDeployment> {
        const response = await fetch(`${this.baseUrl}/api/project/${id}`, {
            method: 'POST',
            body: JSON.stringify({ code })
        });

        if (!response.ok) {
            throw new Error('Failed to deploy project');
        }

        return await response.json();
    }

    public async getDeployment(id: string): Promise<Deployment> {
        const response = await fetch(`${this.baseUrl}/api/deployment/${id}`);
        return await response.json();
    }
}