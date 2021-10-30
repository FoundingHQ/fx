export type CopyPath = { src: string; dest: string };

export type Generator<T = any> = {
  setup: () => Promise<T>;
  install: (context: T) => Promise<{
    dependencies: string[];
    devDependencies: string[];
  }>;
  scaffold: (context: T) => Promise<CopyPath[]>;
  codemods: (context: T) => Promise<void>;
  finish: (context: T) => Promise<void>;
};
