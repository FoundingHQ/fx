import { Generator } from "@types";

type Config = {};

export default {
  setup: async () => {
    return {};
  },
  install: async (_config) => {
    return {
      dependencies: [],
      devDependencies: [],
    };
  },
  scaffold: async (_config) => {
    return [];
  },
  codemods: async (_config) => {
    return;
  },
  finish: async (_config) => {
    return;
  },
} as Generator<Config>;
