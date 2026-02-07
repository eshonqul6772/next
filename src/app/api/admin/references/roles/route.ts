import { NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      where: { status: 'ACTIVE' },
      select: { id: true, name: true }
    });

    return NextResponse.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 });
  }
}
