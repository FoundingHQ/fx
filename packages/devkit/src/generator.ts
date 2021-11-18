import got, { Response } from "got";
import { Package } from "./package";

export type ScaffoldPath = {
  src: string;
  dest: string;
};

export type Generator<T = any> = {
  setup: (options?: Record<string, any>) => Promise<T>;
  install: (context: T) => Promise<Package[]>;
  scaffold: (context: T) => Promise<ScaffoldPath[]>;
  codemods: (context: T) => Promise<void>;
  finish: (context: T) => Promise<void>;
  uninstall: () => Promise<{
    dependencies: string[];
    templates: string[];
  }>;
};

export type GeneratorConfigDefinition = {
  dependencies: Package[];
  templates: ScaffoldPath[];
};

const GH_ROOT = "https://github.com";
const API_ROOT = "https://api.github.com/repos";

export enum GeneratorLocation {
  Local,
  Remote,
}

interface GeneratorMeta {
  path: string;
  subdirectory?: string;
  location: GeneratorLocation;
}

export function normalizeGeneratorPath(generatorArg: string): GeneratorMeta {
  // generatorArg == `auth`
  const isNavtiveGenerator = /^([\w\-_]*)$/.test(generatorArg);
  // generatorArg == `https://github.com/some-githubuser/my-awesome-recipe`
  const isUrlGenerator = generatorArg.startsWith(GH_ROOT);
  // generatorArg == `some-githubuser/my-awesome-recipe`
  const isGitHubShorthandGenerator = /^([\w-_]*)\/([\w-_]*)$/.test(
    generatorArg
  );
  if (isNavtiveGenerator || isUrlGenerator || isGitHubShorthandGenerator) {
    let repoUrl;
    let subdirectory;
    switch (true) {
      case isUrlGenerator:
        repoUrl = generatorArg;
        break;
      case isNavtiveGenerator:
        repoUrl = `${GH_ROOT}/foundinghq/fx`;
        subdirectory = `packages/generators/src/${generatorArg}`;
        break;
      case isGitHubShorthandGenerator:
        repoUrl = `${GH_ROOT}/${generatorArg}`;
        break;
      default:
        throw new Error(
          "should be impossible, the 3 cases are the only way to get into this switch"
        );
    }
    return {
      path: repoUrl,
      subdirectory,
      location: GeneratorLocation.Remote,
    };
  } else {
    return {
      path: generatorArg,
      location: GeneratorLocation.Local,
    };
  }
}

interface Tree {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size: number;
  url: string;
}

interface GithubRepoAPITrees {
  sha: string;
  url: string;
  tree: Tree[];
  truncated: boolean;
}

const parseJsonRes = (res: Response<string>) => JSON.parse(res.body);

export async function getOfficialGeneratorList(): Promise<string[]> {
  const res = await Promise.all([
    got(`${API_ROOT}/foundinghq/fx/git/trees/main?recursive=1`).then(
      parseJsonRes
    ),
    // Need to add access key here to get the list of generators
    got(`${API_ROOT}/foundinghq/fx-generators/git/trees/main?recursive=1`).then(
      parseJsonRes,
      () => ({ tree: [] })
    ),
  ]);

  console.log(res);

  const [publicGenerators, privateGenerators]: GithubRepoAPITrees[] = res;
  const list = publicGenerators.tree.concat(privateGenerators.tree);

  return list.reduce((generatorList: string[], item) => {
    // path looks like: packages/generators/src/auth
    const filePath = item.path.split("/");
    const directory = filePath[1];
    const generatorName = filePath[3];
    if (
      directory === "generators" &&
      filePath.length === 4 &&
      item.type === "tree"
    ) {
      generatorList.push(generatorName);
    }
    return generatorList;
  }, []);
}
