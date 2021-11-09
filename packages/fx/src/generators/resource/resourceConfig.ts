export const baseConfig = {
  installations: {
    dependencies: [],
    devDependencies: [],
  },
  templates: [
    {
      src: "templates/features/resource/components",
      dest: "lib/resource/components",
    },
    {
      src: "templates/features/resource/data",
      dest: "lib/resource/data",
    },
    {
      src: "templates/features/resource/server/resourceConfig.ts",
      dest: "lib/resource/server/resourceConfig.ts",
    },
    {
      src: "templates/features/resource/server/resourceService.ts",
      dest: "lib/resource/server/resourceService.ts",
    },
    {
      src: "templates/features/pages/resource/index.ts",
      dest: "pages/api/resource/index.ts",
    },
  ],
};

export const allDependencies = [
  ...baseConfig.installations.dependencies,
  ...baseConfig.installations.devDependencies,
];

export const allTemplates = [...baseConfig.templates.map((t) => t.dest)];
