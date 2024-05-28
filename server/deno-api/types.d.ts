interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface Deployment {
    id: string;
    projectId: string;
    description: string;
    status: string;
    domains: string[];
    databases: {
        default: string;
    };
    requestTimeout: number;
    permissions: {
        net: (string | "*")[];
    };
    createdAt: string;
    updatedAt: string;
}