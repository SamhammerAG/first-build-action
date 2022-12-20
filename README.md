# first-build-action
This action searches successful workflow-runs for the given workflow-name and branch, to determine if this is the first workflow-run.

## Usage

```yml
    - uses: actions/checkout@v2
    - id: branch
      run: echo "::set-output name=branch::${GITHUB_REF##*/}" | tr '[:upper:]' '[:lower:]'
    - id: first_run
      uses: SamhammerAG/first-build-action@v2
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        workflow: test
        branch: ${{ steps.branch.outputs.branch }}
```

## Config

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `token` | `GITHUB_TOKEN` or a `repo` scoped [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). | `GITHUB_TOKEN` |
| `branch` | Branch for the workflow to look for. | "" |
| `workflow` | Workflow name to look for. | "" |


### Action outputs

| Name | Description |
| --- | --- |
| `firstRun` | 'true' when no matching workflow-run was found; otherwise 'false' |

