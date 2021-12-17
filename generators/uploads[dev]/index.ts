import { Generator, Package, ScaffoldPath } from "@founding/devkit";

type Props = {};

const generator: Generator<Props> = {
  async setup(context, options = {}) {
    return {};
  },
  async install() {
    const dependencies: Package[] = [];
    return dependencies;
  },
  async scaffold(context) {
    const templates: ScaffoldPath[] = [];
    return templates;
  },
  async codemods(context) {
    const pathsChanged: string[] = [];
    return pathsChanged;
  },
  async finish(context) {},
  async uninstall() {
    return {
      dependencies: [],
      templates: [],
    };
  },
};

export default generator;
