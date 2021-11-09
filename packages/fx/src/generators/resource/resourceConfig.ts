export const baseConfig = (resourceName: string) => {
  const resourceDir = resourceName.toLowerCase();

  return {
    installations: {
      dependencies: [],
      devDependencies: [],
    },
    templates: [
      {
        src: "templates/features/resource/components/ResourceForm.tsx",
        dest: `lib/${resourceDir}/components/${resourceName}Form.tsx`,
      },
      {
        src: "templates/features/resource/data/resourceHooks.ts",
        dest: `lib/${resourceDir}/data/${resourceDir}Hooks.ts`,
      },
      {
        src: "templates/features/resource/data/ResourceProvider.ts",
        dest: `lib/${resourceDir}/data/${resourceName}Provider.ts`,
      },
      {
        src: "templates/features/resource/server/resourceConfig.ts",
        dest: `lib/${resourceDir}/server/${resourceDir}Config.ts`,
      },
      {
        src: "templates/features/resource/server/resourceService.ts",
        dest: `lib/${resourceDir}/server/${resourceDir}Service.ts`,
      },
      {
        src: "templates/features/pages/resource/index.ts",
        dest: `pages/api/${resourceDir}/index.ts`,
      },
    ],
  };
};
