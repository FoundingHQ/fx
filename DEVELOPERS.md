# Developing FX

- [Development Setup](##Development-Setup)
- [Installing Dependencies](###Installing-Dependencies)
- [Running FX Locally](##Running-FX-Locally)

## Development Setup

We would love your help! This document describes how to set up your development environment to build and test FX.

### Installing Dependencies

Before you can build FX, you must install and configure the following dependencies on your
machine:

- [Git](http://git-scm.com/)
- [Node.js v16.x (LTS)](http://nodejs.org)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Forking FX on Github

To contribute code to FX, you must fork the [FX Repository](https://github.com/foundinghq/fx). After you fork the repository, you may now begin editing the source code.

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

# Add a generator
npx fx add ../../generators/auth/index.ts
```

### Watch file changes

```sh
# Watches all package files for changes and recompiles
npm run dev
```

There's a lot we need to do to make local development work easier. We also need to add tests 🤫
