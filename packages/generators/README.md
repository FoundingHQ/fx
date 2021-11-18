# Fx Feature Generators

### Creating a new Feature Generator

TODO (complete this section)

- [ ] Create a feature generator file under `src/[feature-name]`
- [ ] Place your feature templates in `src/[feature-name]/templates`

#### Generator template:

```ts
// src/[feature-name]/[feature-name]Generator.ts
import { Generator } from "@founding/devkit";

type Config = {};

const generator: Generator<Config> = {
  setup: async () => {
    return {};
  },
  install: async (_config) => {
    // return package dependencies
    return [];
  },
  scaffold: async (_config) => {
    // return templates
    return [];
  },
  codemods: async (_config) => {
    return;
  },
  finish: async (_config) => {
    return;
  },
  uninstall: async () => {
    return {
      dependencies: [],
      templates: [],
    };
  },
};

export default generator;
```

### Creating a new Preset

TODO (complete this section)

- [ ] Create a Preset configuration file under `templates/presets`

#### Preset template:

```json
{
  "name": "ecommerce",
  "features": [["auth", { "type": "session" }]]
}
```
