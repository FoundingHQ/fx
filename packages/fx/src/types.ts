export type TemplateOperation<T = any> = {
  src: string;
  dest: string;
  createTransform?: (context: T) => (source: string) => string;
};

export type Generator<T = any> = {
  setup: () => Promise<T>;
  install: (context: T) => Promise<{
    dependencies: string[];
    devDependencies: string[];
  }>;
  scaffold: (context: T) => Promise<TemplateOperation<T>[]>;
  codemods: (context: T) => Promise<void>;
  finish: (context: T) => Promise<void>;
};
