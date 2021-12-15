export type Package = {
  name: string;
  version?: string;
  isDevDep?: boolean;
  isExpoDep?: boolean;
};

export type ScaffoldPath = {
  src: string;
  dest: string;
};

export type Frameworks = "next" | "expo";
export type Language = "typescript" | "javascript";
export type Theme = "skeleton";

export type Context<T = {}> = {
  props: T;
  paths: {
    root: string;
    env: string;
    envExample: string;
    fxConfig: string;
    tsConfig: string;
    packageJson: string;
    scheme: string;
    lib: string;
    libCore: string;
    mobile: string;
    appJson: string;
    pages: string;
    api: string;
  };
  config: {
    frameworks: Frameworks[];
    language: Language;
    theme: Theme;
  };
  helpers: Record<string, any>;
  generatorMeta?: GeneratorMeta;
  // alias
  h: Record<string, any>;
  p: T;
};

export type Generator<T = any> = {
  name?: string;
  description?: string;
  version?: number;
  setup: (
    context: Context,
    generatorOptions?: Record<string, any>
  ) => Promise<T>;
  install: (context: Context<T>) => Promise<Package[]>;
  scaffold: (context: Context<T>) => Promise<ScaffoldPath[]>;
  codemods: (context: Context<T>) => Promise<string[]>;
  finish: (context: Context<T>) => Promise<void>;
  uninstall: (context: Context<T>) => Promise<{
    dependencies: string[];
    templates: string[];
  }>;
};

export enum GeneratorLocation {
  Local,
  Remote,
}

export type GeneratorMeta = {
  feature: string;
  path: string;
  subdirectory?: string;
  localRootPath: string;
  localPackageJsonPath: string;
  location: GeneratorLocation;
};
