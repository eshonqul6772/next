// Enums
export const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED'
} as const;
export type STATUS = (typeof STATUS)[keyof typeof STATUS];

export const CABINET_TYPE = {
  ADMIN_CABINET: 'ADMIN_CABINET',
  CLIENT_CABINET: 'CLIENT_CABINET'
} as const;
export type CABINET_TYPE = (typeof CABINET_TYPE)[keyof typeof CABINET_TYPE];

export const PERMISSIONS = {
  VIEW_USERS: 'VIEW_USERS',
  VIEW_USER: 'VIEW_USER',
  CREATE_USER: 'CREATE_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',

  VIEW_ROLES: 'VIEW_ROLES',
  VIEW_ROLE: 'VIEW_ROLE',
  CREATE_ROLE: 'CREATE_ROLE',
  UPDATE_ROLE: 'UPDATE_ROLE',
  DELETE_ROLE: 'DELETE_ROLE',

  VIEW_TRANSLATIONS: 'VIEW_TRANSLATIONS',
  VIEW_TRANSLATION: 'VIEW_TRANSLATION',
  CREATE_TRANSLATION: 'CREATE_TRANSLATION',
  UPDATE_TRANSLATION: 'UPDATE_TRANSLATION',
  DELETE_TRANSLATION: 'DELETE_TRANSLATION',
  TEXTPATH_METHODTYPE_STRETCH: 'TEXTPATH_METHODTYPE_STRETCH'
} as const;
export type PERMISSIONS = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// Interfaces
export interface IMultiName {
  ru: string;
  uz: string;
  en: string;
}

export interface IIdAndName {
  id: number | null;
  name: string;
}

export interface IMinFile {
  id: number;
  name: string;
  extension: string;
  url: string;
  uuid: string;
}

export interface IFilter {
  key: string;
  operation: '>' | '>=' | '<' | '<=' | '=' | '!=' | '%_%' | '%_' | '_%' | 'in';
  value: number | string | boolean | null | undefined | string[] | number[];
  type: 'NUMBER' | 'STRING' | 'BOOLEAN' | 'JSON' | 'DATE' | 'LOCAL_DATE' | 'LOCAL_DATE_TIME' | 'ENUM_COLLECTION';
}

export interface ISort {
  name?: string | boolean;
  direction?: 'asc' | 'desc';
}

export interface IMeta {
  totalPages: number;
  totalItems: number;
  current: number;
  perPage: number;
}

// Role types
export interface RoleData {
  id: number;
  name: string;
  description: string;
  permissions: PERMISSIONS[];
  status: STATUS;
  createdAt: string;
  updatedAt: string;
}

export interface RolePermission {
  name: PERMISSIONS;
  key: string;
}

// User types
export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  password: string;
  photo: IMinFile | null;
  role: IIdAndName;
  status: STATUS;
  createdAt: string;
  updatedAt: string;
}

// Translation types
export interface TranslationData {
  id: number;
  name: IMultiName;
  tag: string;
  types: CABINET_TYPE[];
  status: STATUS;
}

// Request types
export interface PageableRequest {
  page?: number;
  perPage?: number;
  sort?: ISort;
  search?: IFilter[];
}