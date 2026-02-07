import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

interface CreateUserBody {
  firstName: string;
  lastName: string;
  phone?: string;
  username: string;
  password: string;
  photoId?: string | null;
  roleId?: string | null;
  status: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateUserBody = await request.json();
    const { firstName, lastName, phone, username, password, roleId, status } = body;

    const user = await prisma.user.create({
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
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
