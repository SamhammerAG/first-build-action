import * as core from '@actions/core'
import * as github from "@actions/github";

async function run(): Promise<void> {
    try {
        const inputs = {
            token: core.getInput("token"),
            branch: core.getInput("branch"),
            workflow: core.getInput("workflow")
        };

        const octokit = github.getOctokit(inputs.token);
        const repository: string = process.env.GITHUB_REPOSITORY as string;
        const [owner, repo] = repository.split("/");

        const workflows = await octokit.rest.actions.listRepoWorkflows({ owner, repo });
        const workflow_id = workflows.data.workflows.find(w => w.name === inputs.workflow)?.id;

        if (!workflow_id) {
            core.setFailed(`No workflow exists with the name "${inputs.workflow}"`);
            return;
        } else {
            core.info(`Discovered workflowId for search: ${workflow_id}`);
        }

        const response = await octokit.rest.actions.listWorkflowRuns({ owner, repo, workflow_id, branch: inputs.branch, status: 'success', per_page: 1 });
        const isFirstWorkflowRun = response.data.total_count == 0;

        core.info(`Discovered first_run: ${isFirstWorkflowRun}`);
        core.setOutput('first_run', isFirstWorkflowRun);
    } catch (error) {
        core.setFailed((error as Error).message);
    }
}

run();
