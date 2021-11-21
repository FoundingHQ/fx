import { GeneratorConfigDefinition } from "@founding/devkit";

export const baseConfig: GeneratorConfigDefinition = {
  dependencies: [],
  templates: [
    {
      src: "resource/templates/lib/resource/data/resourceHooks.ts",
      dest: "lib/${h.changeCase.camelCase(props.name)}/data/${h.changeCase.camelCase(props.name)}Hooks.ts",
    },
    {
      src: "resource/templates/lib/resource/server/resourceConfig.ts",
      dest: "lib/${h.changeCase.camelCase(props.name)}/server/${h.changeCase.camelCase(props.name)}Config.ts",
    },
    {
      src: "resource/templates/lib/resource/server/resourceService.ts",
      dest: "lib/${h.changeCase.camelCase(props.name)}/server/${h.changeCase.camelCase(props.name)}Service.ts",
    },
    {
      src: "resource/templates/pages/api/resource/index.ts",
      dest: "pages/api/${h.pluralizedCamelCase(props.name)}/index.ts",
    },
    {
      src: "resource/templates/pages/api/resource/[id]/index.ts",
      dest: "pages/api/${h.pluralizedCamelCase(props.name)}/[id]/index.ts",
    },
  ],
};

export const resourcePlatformConfig: Record<string, GeneratorConfigDefinition> =
  {
    web: {
      dependencies: [],
      templates: [
        {
          src: "resource/templates/lib/resource/components/ResourceForm.tsx",
          dest: "lib/${h.changeCase.camelCase(props.name)}/components/${h.changeCase.pascalCase(props.name)}Form.tsx",
        },
        {
          src: "resource/templates/pages/resource",
          dest: "pages/${h.pluralizedCamelCase(props.name)}",
        },
      ],
    },
    mobile: {
      dependencies: [],
      templates: [
        {
          src: "resource/templates/expo/components/ResourceEdit.tsx",
          dest: "expo/lib/${h.changeCase.camelCase(props.name)}/components/${h.changeCase.pascalCase(props.name)}Edit.tsx",
        },
        {
          src: "resource/templates/expo/components/ResourceList.tsx",
          dest: "expo/lib/${h.changeCase.camelCase(props.name)}/components/${h.changeCase.pascalCase(props.name)}List.tsx",
        },
        {
          src: "resource/templates/expo/components/ResourceNew.tsx",
          dest: "expo/lib/${h.changeCase.camelCase(props.name)}/components/${h.changeCase.pascalCase(props.name)}New.tsx",
        },
        {
          src: "resource/templates/expo/components/ResourceShow.tsx",
          dest: "expo/lib/${h.changeCase.camelCase(props.name)}/components/${h.changeCase.pascalCase(props.name)}Show.tsx",
        },
        {
          src: "resource/templates/expo/screens/ResourceEditScreen.tsx",
          dest: "expo/screens/${h.changeCase.pascalCase(props.name)}EditScreen.tsx",
        },
        {
          src: "resource/templates/expo/screens/ResourceListScreen.tsx",
          dest: "expo/screens/${h.changeCase.pascalCase(props.name)}ListScreen.tsx",
        },
        {
          src: "resource/templates/expo/screens/ResourceNewScreen.tsx",
          dest: "expo/screens/${h.changeCase.pascalCase(props.name)}NewScreen.tsx",
        },
        {
          src: "resource/templates/expo/screens/ResourceShowScreen.tsx",
          dest: "expo/screens/${h.changeCase.pascalCase(props.name)}ShowScreen.tsx",
        },
      ],
    },
  };

export const allDependencies = [
  ...baseConfig.dependencies.map((d) => d.name),
  ...Object.values(resourcePlatformConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
    .flat(),
];

export const allTemplates = [
  ...baseConfig.templates.map((t) => t.dest),
  ...Object.values(resourcePlatformConfig)
    .map((c) => c.templates.map((t) => t.dest))
    .flat(),
];
