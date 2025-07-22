# create-midas-front

Project initializer for React and Next.js projects.

## CLI Usage

npm:

```sh
npm create midas-front
```

pnpm:

```sh
pnpm create midas-front
```

bun:

```sh
bun create midas-front
```

yarn:

```sh
yarn create midas-front
```

## CLI Options

To initialize a project in the current directory, pass `.` as the project name.

Use `-h` or `--help` to see all available options.

## Development Workflow

To run the CLI locally:

```sh
git clone https://github.com/Midas-Consultores/create-midas-front.git
cd create-midas-front
pnpm install
pnpm dev
```

You can now run the `create-midas-front` command anywhere locally.

> [!IMPORTANT]
> If you modify anything inside the `template` or `dependencies` folder, you must rerun `pnpm dev` to reflect the changes.\
> This is because `tsup` does not automatically copy those files in watch mode.

## Repository Automation

### Dependabot

We use [Dependabot](https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide) to automatically update dependencies. Every month, it checks for updates and opens a pull request with the new versions.

> [!NOTE]
> If the update is a minor or patch version, the pull request will be merged automatically
> via a [action-dependabot-auto-merge](https://github.com/ahmadnassri/action-dependabot-auto-merge) (Personal Access Token required).\
> Repository Settings > Secrets and variables > Dependabot

### Release Please

This project uses [release-please](https://github.com/googleapis/release-please-action) to automate the release process.

When new commits are pushed to the main branch, release-please will:

- Detect conventional commits (e.g., those prefixed with fix or feat)
- Create a pull request with a proposed changelog and version bump
- Keep the CHANGELOG and release PR up to date if new commits continue to be pushed to `main` while the PR remains open

Once the release PR is merged, a new release is published automatically on npm, including the CHANGELOG and updated version.

> [!NOTE]
> The repository must have a NPM token configured to automatically publish new releases.\
> Repository Settings > Secrets and variables > Actions
