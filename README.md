<img src="./docs/public/logo.svg" alt="fx logo" width="130">

Scaffold prebuilt features directly into your web projects 💾

[![npm (scoped)](https://img.shields.io/npm/v/@founding/fx)](https://www.npmjs.com/package/@founding/fx)
[![npm](https://img.shields.io/npm/dm/@founding/fx)](https://www.npmjs.com/package/@founding/fx)
[![GitHub last commit](https://img.shields.io/github/last-commit/foundinghq/fx)](https://github.com/foundinghq/fx)
[![Discord](https://img.shields.io/badge/Discord-Join%20Chat-%237289DA)](https://discord.gg/YtafKzR)

Focus on building your product and let FX generate the application logic

```bash
npx fx add auth
# ???
# username/password authentication with google login done

npx fx add payments
# ???
# stripe integration done

# `git diff` to see exact changes FX has made
```

## Overview

FX was born out of my own frustration with starting and building new applications. Why am I spending so much time glueing together standard libraries and rewriting features? Why are all these tutorials outdated? And why are these boilerplates so complicated?

**FX tries to resolve this by allowing you to scaffold features directly into a blank project.**

- 🔨 &nbsp; Fully transparent source code generation with **_no black boxes_**
- 📦 &nbsp; Generated features **_just work_** out of the box. No manual intervention required
- 🧳 &nbsp; No runtime dependency on FX, all it does is generate source code
- 📚 &nbsp; Anything generated is also documented
- 💄 &nbsp; Features have minimal UI, style the way you want!
- 🔗 &nbsp; Each feature is fully compatible with one another
- ⚡️ &nbsp; Build fully featured applications in lightning speed
- 📱 &nbsp; [Code share]() between your web and native applications

## Quickstart

<p>1) Create a new project with your default toolset:</p>

```bash
# New Next.js project - https://nextjs.org/docs/api-reference/create-next-app
npx create-next-app@latest --ts --use-npm
```

<p>2) Setup your project with FX:</p>

```bash
cd my-app

# Install the FX CLI your project directory
npm i @founding/fx -D

# Convert the project into a FX compatible one
npx fx init
```

_TODO: Replace this gif with a FX one_
<img width="600" src="https://user-images.githubusercontent.com/105127/100917537-4661e100-34a5-11eb-89bd-565b7bc31919.gif" alt="illustration of fx">

> 📄 Full docs page coming soon

## Features

Once you've initialized FX in your project, you can start adding features to it:

```bash
npx fx add [feature]
```

Current supported frameworks:

| Feature                              | [Next.js](https://nextjs.org/) | [Expo](https://expo.dev/) | [Remix](https://remix.run/) | [Blitz](https://blitzjs.com/) | [CRA](https://create-react-app.dev/) |
| ------------------------------------ | -----------------------------: | ------------------------: | --------------------------: | ----------------------------: | -----------------------------------: |
| [Auth](generators/auth)              |                             ✅ |                           |                             |                               |                                      |
| [Payments](generators/payments[dev]) |                                |                           |                             |                               |                                      |
| [Resource](generators/resource)      |                             ✅ |                           |                             |                               |                                      |
| [Uploads](generators/uploads)        |                                |                           |                             |                               |                                      |
| [Analytics](generators/analytics)    |                                |                           |                             |                               |                                      |

> 👷 Support for more features + frameworks in active development. Upvote or ask for your most wanted through [Github discussions](https://github.com/foundinghq/fx/discussions).

## FAQ

<details>
  <summary>
    <span>FX vs Boilerplates</span>
  </summary>
  <p style="margin-top:8px">[TODO]</p>
</details>

<details>
  <summary>
    <span>What exactly does `npx fx init` do?</span>
  </summary>
  <p style="margin-top:8px">[TODO]</p>
</details>

<details>
  <summary>
    <span>Why build a new scaffolding tool?</span>
  </summary>
  <p style="margin-top:8px">[TODO]</p>
</details>

<details>
  <summary>
    <span>When would I use FX?</span>
  </summary>
  <p style="margin-top:8px">[TODO]</p>
</details>

## Contributing

```sh
# Clone and setup the repo
git clone git@github.com:foundinghq/fx.git
cd fx && npm i

# Watches all package files for changes and recompiles
npm run dev

# A `local` package is generated during setup which
# allows you to test your project locally
cd packages/local
npx fx add ../../

# There's a lot we need to do to make local
# development work easier. We also need to
# add tests 🤫
```

## Inspired by these amazing projects

- [Phoenix Authentication Solution](https://dashbit.co/blog/a-new-authentication-solution-for-phoenix)
- Framework based generators ([Blitz Recipes](https://blitzjs.com/docs/using-recipes), [Gatsby Recipes](https://www.gatsbyjs.com/blog/2020-04-15-announcing-gatsby-recipes/))
- Scaffolding tools ([Yeoman](https://github.com/yeoman/yeoman), [Sao](https://github.com/saojs/sao), [Hygen](https://github.com/jondot/hygen), [Plop](https://github.com/plopjs/plop))
