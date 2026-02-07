import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

interface UpdateRoleBody {
  name: string;
  description: string;
  permissions: string[];
  status: string;
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const roleId = parseInt(id, 10);

    const role = await prisma.role.findUnique({
      where: { id: roleId }
    });

    if (!role) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        ...role,
        permissions: JSON.parse(role.permissions)
      }
    });
  } catch (error) {
    console.error('Error fetching role:', error);
    return NextResponse.json({ error: 'Failed to fetch role' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const roleId = parseInt(id, 10);
    const body: UpdateRoleBody = await request.json();
    const { name, description, permissions, status } = body;

    const role = await prisma.role.update({
      where: { id: roleId },
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
    });
  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const roleId = parseInt(id, 10);

    const role = await prisma.role.delete({
      where: { id: roleId }
    });

    return NextResponse.json({
      data: {
        ...role,
        permissions: JSON.parse(role.permissions)
      }
    });
  } catch (error) {
    console.error('Error deleting role:', error);
    return NextResponse.json({ error: 'Failed to delete role' }, { status: 500 });
  }
}
