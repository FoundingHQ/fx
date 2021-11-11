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
  ],
};
