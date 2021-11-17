export const baseConfig = {
  templates: [
    {
      src: "templates/features/resource/components/ResourceForm.tsx",
      dest: "lib/${h.changeCase.camelCase(name)}/components/${h.changeCase.pascalCase(name)}Form.tsx",
    },
    {
      src: "templates/features/resource/data/resourceHooks.ts",
      dest: "lib/${h.changeCase.camelCase(name)}/data/${h.changeCase.camelCase(name)}Hooks.ts",
    },
    {
      src: "templates/features/resource/server/resourceConfig.ts",
      dest: "lib/${h.changeCase.camelCase(name)}/server/${h.changeCase.camelCase(name)}Config.ts",
    },
    {
      src: "templates/features/resource/server/resourceService.ts",
      dest: "lib/${h.changeCase.camelCase(name)}/server/${h.changeCase.camelCase(name)}Service.ts",
    },
    {
      src: "templates/features/api/resource/index.ts",
      dest: "pages/api/${h.changeCase.camelCase(name)}/index.ts",
    },
    {
      src: "templates/features/pages/resource",
      dest: "pages/${h.changeCase.camelCase(h.inflection.pluralize(name))}",
    },
    {
      src: "templates/features/resource/expo/screens/ResourceListScreen.tsx",
      dest: "expo/screens/${h.changeCase.pascalCase(name)}ListScreen.tsx",
    },
    {
      src: "templates/features/resource/expo/components/ResourceList.tsx",
      dest: "expo/lib/resource/components/${h.changeCase.pascalCase(name)}List.tsx",
    },
    {
      src: "templates/features/resource/expo/screens/ResourceEditScreen.tsx",
      dest: "expo/screens/${h.changeCase.pascalCase(name)}EditScreen.tsx",
    },
    {
      src: "templates/features/resource/expo/screens/ResourceNewScreen.tsx",
      dest: "expo/screens/${h.changeCase.pascalCase(name)}NewScreen.tsx",
    },
    {
      src: "templates/features/resource/expo/components/ResourceEdit.tsx",
      dest: "expo/lib/resource/components/${h.changeCase.pascalCase(name)}Edit.tsx",
    },
  ],
};
