import got from "got";
import tar from "tar";
import { Stream } from "stream";
import { promisify } from "util";

const pipeline = promisify(Stream.pipeline);

export function downloadAndExtractRepo(root: string): Promise<void> {
  return pipeline(
    got.stream(
      "https://codeload.github.com/foundinghq/fx-template/tar.gz/main"
    ),
    tar.extract({ cwd: root, strip: 1 }, [`fx-template-main`])
  );
}
