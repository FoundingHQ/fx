# `create-fx-app` CLI

This CLI tool enables you to quickly start building a new Founding application, with everything set up for you. To get started, use the following command:

```bash
npx create-fx-app
```

To create a new app in a specific folder, you can send a name as an argument. For example, the following command will create an app called `blog-app` in a folder with the same name:

```bash
npx create-fx-app blog-app
```

## Options

`create-fx-app` comes with the following options:

- **-p, --preset [name]|[github-url]** - Presets act as sharable set of feature configurations. You may want to bootstrap your application as a Sass app, a Ecommerce app, or a Marketplace app; presets allow you to do that by cloning the [template-base](https://github.com/FoundingHQ/fx/tree/main/packages/template-base) and scaffolding a set of preconfigured [features](https://github.com/FoundingHQ/fx/tree/main/packages/template-features). A list of officially supported presets can be found seen by running `npx fx list` while inside a Founding application.
