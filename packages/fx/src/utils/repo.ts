import tar from "tar";
import { Stream } from "stream";
import { promisify } from "util";
import { makeDir, removeDir } from "@founding/devkit";
import { gotStream } from "./network";
import { CODE_ROOT } from "./config";

const pipeline = promisify(Stream.pipeline);

export const cloneRepo = (
  root: string,
  // foundinghq/fx-template
  repoFullName: string = "foundinghq/fx-template",
  // main
  defaultBranch: string = "main",
  //packages/generator
  subdirectory: string = ""
) => {
  removeDir(root);
  makeDir(root);

  const repoName = repoFullName.split("/")[1];
  const depth = subdirectory ? subdirectory.split("/").length + 1 : 1;
  const extractPath = subdirectory
    ? [`${repoName}-${defaultBranch}/${subdirectory}`]
    : [`${repoName}-${defaultBranch}`];

  return pipeline(
    gotStream(`${CODE_ROOT}/${repoFullName}/tar.gz/${defaultBranch}`),
    tar.extract({ cwd: root, strip: depth }, extractPath)
  );
};
