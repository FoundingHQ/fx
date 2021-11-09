export const baseConfig = (resourceName: string) => {
  const resourceDir = resourceName.toLowerCase();

  return {
    installations: {
      dependencies: [],
      devDependencies: [],
    },
    templates: [
      {
        src: "templates/features/resource/components",
        dest: `lib/${resourceDir}/components`,
      },
      {
        src: "templates/features/resource/data",
        dest: `lib/${resourceDir}/data`,
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
