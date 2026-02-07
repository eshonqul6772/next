import {
  type RoleData,
  type UserData,
  type TranslationData,
  type RolePermission,
  STATUS,
  PERMISSIONS,
  CABINET_TYPE
} from './types';

// Mock database
let roleIdCounter = 3;
let userIdCounter = 3;
let translationIdCounter = 3;

// Roles
export const roles: RoleData[] = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full access to all features',
    permissions: Object.values(PERMISSIONS) as PERMISSIONS[],
    status: STATUS.ACTIVE,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'User Manager',
    description: 'Can manage users',
    permissions: [
      PERMISSIONS.VIEW_USERS,
      PERMISSIONS.VIEW_USER,
      PERMISSIONS.CREATE_USER,
      PERMISSIONS.UPDATE_USER,
      PERMISSIONS.DELETE_USER
    ],
    status: STATUS.ACTIVE,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    name: 'Viewer',
    description: 'Read-only access',
    permissions: [PERMISSIONS.VIEW_USERS, PERMISSIONS.VIEW_ROLES, PERMISSIONS.VIEW_TRANSLATIONS],
    status: STATUS.INACTIVE,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  }
];

// Users
export const users: UserData[] = [
  {
    id: 1,
    firstName: 'Admin',
    lastName: 'User',
    phone: '+998901234567',
    username: 'admin',
    password: 'admin123',
    photo: null,
    role: { id: 1, name: 'Super Admin' },
    status: STATUS.ACTIVE,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    phone: '+998901234568',
    username: 'john',
    password: 'john123',
    photo: null,
    role: { id: 2, name: 'User Manager' },
    status: STATUS.ACTIVE,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+998901234569',
    username: 'jane',
    password: 'jane123',
    photo: null,
    role: { id: 3, name: 'Viewer' },
    status: STATUS.INACTIVE,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  }
];

// Translations
export const translations: TranslationData[] = [
  {
    id: 1,
    name: { ru: 'Главная', uz: 'Bosh sahifa', en: 'Home' },
    tag: 'nav.home',
    types: [CABINET_TYPE.ADMIN_CABINET, CABINET_TYPE.CLIENT_CABINET],
    status: STATUS.ACTIVE
  },
  {
    id: 2,
    name: { ru: 'Настройки', uz: 'Sozlamalar', en: 'Settings' },
    tag: 'nav.settings',
    types: [CABINET_TYPE.ADMIN_CABINET],
    status: STATUS.ACTIVE
  },
  {
    id: 3,
    name: { ru: 'Профиль', uz: 'Profil', en: 'Profile' },
    tag: 'nav.profile',
    types: [CABINET_TYPE.ADMIN_CABINET, CABINET_TYPE.CLIENT_CABINET],
    status: STATUS.INACTIVE
  }
];

// Permissions list
export const permissions: RolePermission[] = Object.values(PERMISSIONS).map((perm) => ({
  name: perm as PERMISSIONS,
  key: perm
}));

// Helper functions
export function getNextRoleId(): number {
  return ++roleIdCounter;
}

export function getNextUserId(): number {
  return ++userIdCounter;
}

export function getNextTranslationId(): number {
  return ++translationIdCounter;
}

export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}