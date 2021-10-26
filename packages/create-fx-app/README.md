# Create Fx App

This CLI tool enables you to quickly start building a new Fx application, with everything set up for you. To get started, use the following command:

```bash
npx create-fx-app
```

To create a new app in a specific folder, you can send a name as an argument. For example, the following command will create an app called `blog-app` in a folder with the same name:

```bash
npx create-fx-app blog-app
```

## Options

`create-fx-app` comes with the following options:

- **-p, --preset [name]|[github-url]** - Presets act as sharable set of feature configurations. You may want to bootstrap your application as an Ecommerce app, or a Marketplace app; presets allow you to do that by cloning the [root-template](https://github.com/FoundingHQ/fx/tree/main/packages/root-template) and scaffolding a set of preconfigured [features](https://github.com/FoundingHQ/fx/tree/main/packages/features). You can use an example name from the [Fx repo](https://github.com/FoundingHQ/fx/tree/main/packages/presets) or a GitHub URL. The URL can use any branch and/or subdirectory.
