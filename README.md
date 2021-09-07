# Founding Template

> Basic monorepo template for new projects.

This project serves as a basic starting point for newly formed Founding projects.

We'll be adding custom [nx generators](https://nx.dev/latest/react/generators/workspace-generators) which contain full-featured implementations of different features (i18n, stripe integration, etc) which can extend this project.

## Adding features to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core feature plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`

There are also many [nx plugins](https://nx.dev/community) you could use.

## 👉 Get Started

This repository is a monorepo managed through [nx](https://nx.dev).

```
/apps/ contains the application projects. This is the main entry point for a runnable application. We recommend keeping applications as light-weight as possible, with all the heavy lifting being done by libraries that are imported by each application.

/libs/ contains the library projects. There are many different kinds of libraries, and each library defines its own external API so that boundaries between libraries remain clear.

/tools/ contains scripts that act on your code base. This could be database scripts, custom executors (or builders), or workspace generators.

/workspace.json defines each project in your workspace and the executors that can be run on those projects.

/nx.json adds extra information about projects, including manually defined dependencies and tags that can be used to restrict the ways projects are allowed to depend on each other.

/tsconfig.base.json sets up the global TypeScript settings and creates aliases for each library to aid when creating TypeScript imports.
```

### Install dependencies

```
npm install
```

### Run the development server

```
npm run dev
```

This will start both the [Nest.js](https://nestjs.com/) and the [Next.js](https://nextjs.org/) development servers. When the above command completes you'll be able to view your website at `http://localhost:4200`

## 🥞 Stack

This project uses the following libraries and services:

- Frontend - [Next.js](https://nextjs.org)
- Api - [Nest.js](https://nestjs.com)

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
