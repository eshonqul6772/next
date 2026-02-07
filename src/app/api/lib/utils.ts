import type { IFilter, ISort, IMeta } from './types';

export function applyFilters<T extends Record<string, unknown>>(data: T[], filters?: IFilter[]): T[] {
  if (!filters || filters.length === 0) return data;

  return data.filter((item) => {
    return filters.every((filter) => {
      const value = item[filter.key];
      const filterValue = filter.value;

      if (filterValue === null || filterValue === undefined) return true;

      switch (filter.operation) {
        case '=':
          return value === filterValue;
        case '!=':
          return value !== filterValue;
        case '>':
          return Number(value) > Number(filterValue);
        case '>=':
          return Number(value) >= Number(filterValue);
        case '<':
          return Number(value) < Number(filterValue);
        case '<=':
          return Number(value) <= Number(filterValue);
        case '%_%':
          return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
        case '%_':
          return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());
        case '_%':
          return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
        case 'in':
          if (Array.isArray(filterValue)) {
            return (filterValue as (string | number)[]).includes(value as string | number);
          }
          return false;
        default:
          return true;
      }
    });
  });
}

export function applySort<T extends Record<string, unknown>>(data: T[], sort?: ISort): T[] {
  if (!sort || !sort.name || typeof sort.name !== 'string') return data;

  const sortKey = sort.name;
  const direction = sort.direction === 'desc' ? -1 : 1;

  return [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * direction;
    }

    return (aVal < bVal ? -1 : 1) * direction;
  });
}

export function paginate<T>(data: T[], page: number = 1, perPage: number = 10): { items: T[]; meta: IMeta } {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const current = Math.max(1, Math.min(page, totalPages || 1));
  const start = (current - 1) * perPage;
  const items = data.slice(start, start + perPage);

  return {
    items,
    meta: {
      totalItems,
      totalPages,
      current,
      perPage
    }
  };
}

export function processPageableRequest<T extends Record<string, unknown>>(
  data: T[],
  page?: number,
  perPage?: number,
  sort?: ISort,
  search?: IFilter[]
): { items: T[]; meta: IMeta } {
  let result = [...data];

  result = applyFilters(result, search);
  result = applySort(result, sort);

  return paginate(result, page, perPage);
}
