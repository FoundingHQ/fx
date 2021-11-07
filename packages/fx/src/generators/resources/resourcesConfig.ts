export const baseConfig = {
  installations: {
    dependencies: [],
    devDependencies: [],
  },
  templates: [
    {
      src: "templates/features/resources/components",
      dest: "lib/resources/components",
    },
    {
      src: "templates/features/resources/data",
      dest: "lib/resources/data",
    },
    {
      src: "templates/features/resources/server/resourcesConfig.ts",
      dest: "lib/resources/server/resourcesConfig.ts",
    },
    {
      src: "templates/features/resources/server/resourcesService.ts",
      dest: "lib/resources/server/resourcesService.ts",
    },
    {
      src: "templates/features/pages/[...resourcesApi].ts",
      dest: "pages/api/resources/[...resourcesApi].ts",
    },
  ],
};

export const allDependencies = [
  ...baseConfig.installations.dependencies,
  ...baseConfig.installations.devDependencies,
];

export const allTemplates = [...baseConfig.templates.map((t) => t.dest)];
