export type Context = Record<string, any>;

export type Generator = {
  setup: () => Promise<Context>;
  install: (context: Context) => Promise<{
    dependencies: string[];
    devDependencies: string[];
  }>;
  scaffold: (context: Context) => Promise<{ src: string; dest: string }[]>;
  finish: (context: Context) => Promise<void>;
};
