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
// src/generators/[feature-name].ts
import { Generator } from "../types";

async function setup() {
  return {};
}

async function install() {
  return {
    dependencies: [],
    devDependencies: [],
  };
}

async function scaffold() {
  return [];
}

async function onComplete() {}

export default {
  setup,
  install,
  scaffold,
  onComplete,
} as Generator;
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
