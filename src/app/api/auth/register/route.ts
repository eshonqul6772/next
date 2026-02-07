import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

interface RegisterBody {
  firstName: string;
  lastName: string;
  phone?: string;
  username: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterBody = await request.json();
    const { firstName, lastName, phone, username, password } = body;

    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }

    // Get the default "User" role for regular users
    let userRole = await prisma.role.findFirst({
      where: { name: 'User' }
    });

    // If no "User" role exists, create one
    if (!userRole) {
      userRole = await prisma.role.create({
        data: {
          name: 'User',
          description: 'Oddiy foydalanuvchi',
          permissions: JSON.stringify([])
        }
      });
    }

    // Create user with User role
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone: phone || '',
        username,
        password,
        roleId: userRole.id,
        status: 'ACTIVE'
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
        role: user.role ? { id: user.role.id, name: user.role.name } : null,
        status: user.status,
        createdAt: user.createdAt.toISOString()
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
  }
}
