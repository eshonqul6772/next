import type { PERMISSIONS } from '@/shared/lib/utils/enums';

export type PaginatedData<T> = {
  result: T[];
  rowCount: number;
};

export type PaginationParams = {
  pageIndex: number;
  pageSize: number;
};

export type SortParams = { sortBy: `${string}.${'asc' | 'desc'}` };
export type Filters<T> = Partial<T & PaginationParams & SortParams>;

export interface MenuItem {
  label: string;
  path: string;
  icon: string;
  permission?: PERMISSIONS[];
  children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: '📊', permission: ['VIEW_USERS'] },
  {
    label: 'Ma’lumotnoma',
    path: '/reference',
    icon: '📊',
    permission: ['VIEW_USERS'],
    children: [
      { label: 'Users', path: '/users', icon: '👤', permission: ['VIEW_USERS'] },
      { label: 'Roles', path: '/roles', icon: '👤', permission: ['VIEW_ROLES'] },
      { label: 'Translations', path: '/translations', icon: '🌐', permission: ['VIEW_USERS'] }
    ]
  }
];
