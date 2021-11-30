import { Package } from "../package";
import { Context } from "../context";

export type ScaffoldPath = {
  src: string;
  dest: string;
};

export type Generator<T = any> = {
  setup: (
    context: Context,
    generatorOptions?: Record<string, any>
  ) => Promise<T>;
  install: (context: Context<T>) => Promise<Package[]>;
  scaffold: (context: Context<T>) => Promise<ScaffoldPath[]>;
  codemods: (context: Context<T>) => Promise<void>;
  finish: (context: Context<T>) => Promise<void>;
  uninstall: () => Promise<{
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

// Remove?
export type GeneratorConfigDefinition = {
  dependencies: Package[];
  templates: ScaffoldPath[];
};
