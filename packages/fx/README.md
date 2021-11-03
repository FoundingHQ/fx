# `fx` CLI

This CLI tool enables you to add/remove prebuilt features inside to a Fx project:

```bash
# Add a feature
npx fx add <feature>

# Remove a feature
npx fx remove <feature>

# List available features and presets with descriptions
npx fx list

# Takes in a fx preset configuration file and adds the features listed
npx fx bootstrap <preset|path/to/fx-preset.json>
```

## Development

### Creating a new Feature

TODO (complete this section)

- [ ] Create a feature generator file under `src/generators/[feature-name]`
- [ ] Place your feature templates in `templates/features`
- [ ] Set up the feature generator by importing the generator module in `src/config.ts`

#### Generator template:

```ts
// src/generators/[feature-name]/[feature-name]Generator.ts
import { Generator } from "@types";

type Config = {};

export default {
  setup: async () => {
    return {};
  },
  install: async (_config) => {
    return {
      dependencies: [],
      devDependencies: [],
    };
  },
  scaffold: async (_config) => {
    return [];
  },
  codemods: async (_config) => {
    return;
  },
  finish: async (_config) => {
    return;
  },
} as Generator<Config>;
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
