import { gotJSON } from "../network";
import { API_ROOT } from "../config";

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

export async function getOfficialGeneratorList(): Promise<string[]> {
  // TODO: Allow you to pass a local directory to search for generators
  const res = await Promise.all([
    gotJSON(`${API_ROOT}/foundinghq/fx/git/trees/main?recursive=1`),
    // Need to add access key here to get the list of generators
    // gotJSON(
    //   `${API_ROOT}/foundinghq/fx-generators/git/trees/main?recursive=1`
    // ).catch(() => ({ tree: [] })),
  ]);

  const [publicGenerators, _privateGenerators]: GithubRepoAPITrees[] = res;
  // const list = publicGenerators.tree.concat(privateGenerators.tree);
  const list = publicGenerators.tree;

  return list.reduce((generatorList: string[], item) => {
    const filePath = item.path.split("/");
    const [directory, generatorName] = filePath;
    if (
      directory === "generators" &&
      filePath.length === 2 &&
      item.type === "tree"
    ) {
      generatorList.push(generatorName);
    }
    return generatorList;
  }, []);
}
