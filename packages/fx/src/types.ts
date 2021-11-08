export type ScaffoldPath<T> = {
  src: string;
  dest: string;
  transforms?: ((source: string, context: T) => string)[];
};

export type Generator<T = any> = {
  setup: (options?: Record<string, any>) => Promise<T>;
  install: (context: T) => Promise<{
    dependencies: string[];
    devDependencies: string[];
  }>;
  scaffold: (context: T) => Promise<ScaffoldPath<T>[]>;
  codemods: (context: T) => Promise<void>;
  finish: (context: T) => Promise<void>;
  uninstall: () => Promise<{
    dependencies: string[];
    templates: string[];
  }>;
};
