import { Generator } from "../types";

async function setup() {
  return {};
}

async function install() {
  return {
    dependencies: [],
    devDependencies: [],
  };
}

async function scaffold() {
  return [];
}

async function finish() {}

export default {
  setup,
  install,
  scaffold,
  finish,
} as Generator;
