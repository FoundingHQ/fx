export type Filter<T> = (context: T) => boolean;

export type FilterableList<T> = {
  filters?: Filter<T>[];
  list: any[];
}[];

export const extractFilterableList = <T>(
  filterList: FilterableList<T>,
  context: T
) => {
  return filterList.reduce((res, current) => {
    if (!current.filters) {
      res.push(...current.list);
    } else if (current.filters.every((filter) => filter(context))) {
      res.push(...current.list);
    }

    return res;
  }, [] as any[]);
};
