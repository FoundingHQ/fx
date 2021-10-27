import got from "got";
import tar from "tar";
import { Stream } from "stream";
import { promisify } from "util";

const pipeline = promisify(Stream.pipeline);

export type RepoInfo = {
  username: string;
  name: string;
  branch: string;
  filePath: string;
};

export async function isUrlOk(url: string): Promise<boolean> {
  const res = await got.head(url).catch((e) => e);
  return res.statusCode === 200;
}

export async function getRepoInfo(
  url: URL,
  presetPath?: string
): Promise<RepoInfo | undefined> {
  const [, username, name, t, _branch, ...file] = url.pathname.split("/");
  const filePath = presetPath ? presetPath.replace(/^\//, "") : file.join("/");

  if (t === undefined) {
    const infoResponse = await got(
      `https://api.github.com/repos/${username}/${name}`
    ).catch((e) => e);
    if (infoResponse.statusCode !== 200) {
      return;
    }
    const info = JSON.parse(infoResponse.body);
    return { username, name, branch: info["default_branch"], filePath };
  }

  // If presetPath is available, the branch name takes the entire path
  const branch = presetPath
    ? `${_branch}/${file.join("/")}`.replace(new RegExp(`/${filePath}|/$`), "")
    : _branch;

  if (username && name && branch && t === "tree") {
    return { username, name, branch, filePath };
  }
}

export function hasRepo({
  username,
  name,
  branch,
  filePath,
}: RepoInfo): Promise<boolean> {
  const contentsUrl = `https://api.github.com/repos/${username}/${name}/contents`;
  const packagePath = `${filePath ? `/${filePath}` : ""}/package.json`;

  return isUrlOk(contentsUrl + packagePath + `?ref=${branch}`);
}

export function hasPreset(name: string): Promise<boolean> {
  return isUrlOk(
    `https://api.github.com/repos/founding/fx/contents/packages/template-presets/src/${encodeURIComponent(
      name
    )}/fx-preset.json`
  );
}

export function downloadAndExtractRepo(
  root: string,
  preset?: string
): Promise<void> {
  if (preset === "__internal-testing-retry") {
    throw new Error("This is an internal preset for testing the CLI.");
  }

  const extractPaths = [`fx-main/packages/template-base`];
  if (preset) {
    extractPaths.push(`fx-main/packages/template-presets/src/${preset}`);
  }

  return pipeline(
    got.stream("https://codeload.github.com/founding/fx/tar.gz/main"),
    tar.extract({ cwd: root, strip: 3 }, extractPaths)
  );
}
