import { Package, ScaffoldPath } from "../generator/types";

export type Filter<T> = (context: T) => boolean;

const filterList = <T>(list: { filters: Filter<T>[] }[], context: T) => {
  return list.filter(({ filters }) => {
    if (filters) return filters.every((filter) => filter(context));
    return true;
  });
};

export const filterDependencies = <T>(
  dependencies: (Package & { filters: Filter<T>[] })[],
  context: T
) => {
  return filterList(dependencies, context) as unknown as Package[];
};

export const filterTemplates = <T>(
  templates: (ScaffoldPath & { filters: Filter<T>[] })[],
  context: T
) => {
  return filterList(templates, context) as unknown as ScaffoldPath[];
};
