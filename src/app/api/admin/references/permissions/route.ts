import { NextResponse } from 'next/server';

const PERMISSIONS = [
  'VIEW_USERS',
  'VIEW_USER',
  'CREATE_USER',
  'UPDATE_USER',
  'DELETE_USER',
  'VIEW_ROLES',
  'VIEW_ROLE',
  'CREATE_ROLE',
  'UPDATE_ROLE',
  'DELETE_ROLE',
  'VIEW_TRANSLATIONS',
  'VIEW_TRANSLATION',
  'CREATE_TRANSLATION',
  'UPDATE_TRANSLATION',
  'DELETE_TRANSLATION',
  'TEXTPATH_METHODTYPE_STRETCH'
];

export async function GET() {
  try {
    const permissions = PERMISSIONS.map((perm) => ({
      name: perm,
      key: perm
    }));

    return NextResponse.json(permissions);
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return NextResponse.json({ error: 'Failed to fetch permissions' }, { status: 500 });
  }
}
