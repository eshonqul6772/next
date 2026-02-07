import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

interface UpdateUserBody {
  firstName: string;
  lastName: string;
  phone?: string;
  username: string;
  password: string;
  photoId?: string | null;
  roleId?: string | null;
  status: string;
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const userId = parseInt(id, 10);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        username: user.username,
        password: user.password,
        photo: user.photoUrl ? { id: 0, name: '', extension: '', url: user.photoUrl, uuid: '' } : null,
        role: user.role ? { id: user.role.id, name: user.role.name } : { id: null, name: '' },
        status: user.status,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const userId = parseInt(id, 10);
    const body: UpdateUserBody = await request.json();
    const { firstName, lastName, phone, username, password, roleId, status } = body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phone: phone || '',
        username,
        password,
        roleId: roleId ? parseInt(roleId, 10) : null,
        status
      },
      include: { role: true }
    });

    return NextResponse.json({
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        username: user.username,
        password: user.password,
        photo: null,
        role: user.role ? { id: user.role.id, name: user.role.name } : { id: null, name: '' },
        status: user.status,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const userId = parseInt(id, 10);

    const user = await prisma.user.delete({
      where: { id: userId },
      include: { role: true }
    });

    return NextResponse.json({
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        username: user.username,
        password: user.password,
        photo: null,
        role: user.role ? { id: user.role.id, name: user.role.name } : { id: null, name: '' },
        status: user.status,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
