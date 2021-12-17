# Working on FX

- [Development Setup](##Development-Setup)
- [Installing Dependencies](###Installing-Dependencies)
- [Running FX Locally](##Running-FX-Locally)

## Development Setup

We would love your help! This document describes how to set up your development environment to build and test FX.

### Installing Dependencies

Before you can build FX, you must install and configure the following dependencies on your machine:

- [Git](http://git-scm.com/)
- [Docker](https://www.docker.com/get-started)
- [Node.js](http://nodejs.org)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Running FX Locally

To work on FX:

1. Clone your Github forked repository:

```sh
git clone https://github.com/<github_username>/fx.git
```

2. Go to the FX directory and install the dependencies:

```sh
cd fx && npm i
```

3. Install a local FX application:

```sh
npm run reset:local
```

4. You can now run FX commands in your local project under `/packages/local`

```sh
cd packages/local
npx fx <command>

# Or add a generator locally
npx fx add ../../generators/auth/index.ts
```

### Working on a Generator

When working on a generator, you may make file changes and run `npx fx add <path/to/generator>` without having to worry about ts compilation.

### Working on FX

The FX repository is managed as a [lerna](https://github.com/lerna/lerna) monorepo.

When working on the FX packages (anything under `packages/devkit`, `packages/fx`, `packages/create-fx-app`) you'll need to make sure your files are correctly linked to always be working on the latest version.

> Whenever a installation happens in any of the `packages`, you'll need to manually relink files with `npm run reset:links`

File changes need to be recompiled when working in anything under `packages` directory. The following dev command can be used to watch any changes and recompile in the background:

```sh
# Watches all package files for changes and recompiles
npm run dev
```

There's a lot we need to do to make local development work easier. We also need to add tests 🤫
