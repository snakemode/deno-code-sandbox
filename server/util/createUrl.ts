export default function(project: Project, deployment: Deployment) {
    return `https://${project.name}-${deployment.id}.deno.dev`;
}