import rimraf from "rimraf";
import fs from "fs-extra";
import tar from "tar";
import { Stream } from "stream";
import { promisify } from "util";
import { gotStream } from "./network";
import { CODE_ROOT } from "./config";

const pipeline = promisify(Stream.pipeline);

export function cloneRepo(
  root: string,
  // foundinghq/fx-template
  repoFullName: string = "foundinghq/fx-template",
  // main
  defaultBranch: string = "main",
  //packages/generator
  subdirectory: string = ""
) {
  rimraf.sync(root);
  fs.mkdirsSync(root);

  const repoName = repoFullName.split("/")[1];
  const depth = subdirectory ? subdirectory.split("/").length + 1 : 1;
  const extractPath = subdirectory
    ? [`${repoName}-${defaultBranch}/${subdirectory}`]
    : [`${repoName}-${defaultBranch}`];

  return pipeline(
    gotStream(`${CODE_ROOT}/${repoFullName}/tar.gz/${defaultBranch}`),
    tar.extract({ cwd: root, strip: depth }, extractPath)
  );
}
