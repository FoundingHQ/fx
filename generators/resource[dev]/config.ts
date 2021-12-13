import { GeneratorConfigDefinition } from "@founding/devkit";

export const baseConfig: GeneratorConfigDefinition = {
  dependencies: [],
  templates: [
    {
      src: "templates/lib/resource/data/resourceHooks.ts",
      dest: "lib/${h.changeCase.camelCase(props.name)}/data/${h.changeCase.camelCase(props.name)}Hooks.ts",
    },
    {
      src: "templates/lib/resource/api/resourceConfig.ts",
      dest: "lib/${h.changeCase.camelCase(props.name)}/api/${h.changeCase.camelCase(props.name)}Config.ts",
    },
    {
      src: "templates/lib/resource/api/resourceService.ts",
      dest: "lib/${h.changeCase.camelCase(props.name)}/api/${h.changeCase.camelCase(props.name)}Service.ts",
    },
    {
      src: "templates/pages/api/resource/index.ts",
      dest: "pages/api/${h.pluralizedCamelCase(props.name)}/index.ts",
    },
    {
      src: "templates/pages/api/resource/[id]/index.ts",
      dest: "pages/api/${h.pluralizedCamelCase(props.name)}/[id]/index.ts",
    },
  ],
};

export const resourceFrameworkConfig: Record<
  string,
  GeneratorConfigDefinition
> = {
  web: {
    dependencies: [],
    templates: [
      {
        src: "templates/lib/resource/ui/ResourceForm.tsx",
        dest: "lib/${h.changeCase.camelCase(props.name)}/ui/${h.changeCase.pascalCase(props.name)}Form.tsx",
      },
      {
        src: "templates/pages/resource",
        dest: "pages/${h.pluralizedCamelCase(props.name)}",
      },
    ],
  },
  mobile: {
    dependencies: [],
    templates: [
      {
        src: "templates/expo/ui/ResourceEdit.tsx",
        dest: "expo/lib/${h.changeCase.camelCase(props.name)}/ui/${h.changeCase.pascalCase(props.name)}Edit.tsx",
      },
      {
        src: "templates/expo/ui/ResourceList.tsx",
        dest: "expo/lib/${h.changeCase.camelCase(props.name)}/ui/${h.changeCase.pascalCase(props.name)}List.tsx",
      },
      {
        src: "templates/expo/ui/ResourceNew.tsx",
        dest: "expo/lib/${h.changeCase.camelCase(props.name)}/ui/${h.changeCase.pascalCase(props.name)}New.tsx",
      },
      {
        src: "templates/expo/ui/ResourceShow.tsx",
        dest: "expo/lib/${h.changeCase.camelCase(props.name)}/ui/${h.changeCase.pascalCase(props.name)}Show.tsx",
      },
      {
        src: "templates/expo/screens/ResourceEditScreen.tsx",
        dest: "expo/screens/${h.changeCase.pascalCase(props.name)}EditScreen.tsx",
      },
      {
        src: "templates/expo/screens/ResourceListScreen.tsx",
        dest: "expo/screens/${h.changeCase.pascalCase(props.name)}ListScreen.tsx",
      },
      {
        src: "templates/expo/screens/ResourceNewScreen.tsx",
        dest: "expo/screens/${h.changeCase.pascalCase(props.name)}NewScreen.tsx",
      },
      {
        src: "templates/expo/screens/ResourceShowScreen.tsx",
        dest: "expo/screens/${h.changeCase.pascalCase(props.name)}ShowScreen.tsx",
      },
    ],
  },
};

export const allDependencies = [
  ...baseConfig.dependencies.map((d) => d.name),
  ...Object.values(resourceFrameworkConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
    .flat(),
];

export const allTemplates = [
  ...baseConfig.templates.map((t) => t.dest),
  ...Object.values(resourceFrameworkConfig)
    .map((c) => c.templates.map((t) => t.dest))
    .flat(),
];
