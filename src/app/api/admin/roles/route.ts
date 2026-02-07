import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

interface CreateRoleBody {
  name: string;
  description: string;
  permissions: string[];
  status: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateRoleBody = await request.json();
    const { name, description, permissions, status } = body;

    const role = await prisma.role.create({
      data: {
        name,
        description,
        permissions: JSON.stringify(permissions),
        status
      }
    });

    return NextResponse.json({
      data: {
        ...role,
        permissions: JSON.parse(role.permissions)
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating role:', error);
    return NextResponse.json({ error: 'Failed to create role' }, { status: 500 });
  }
}
