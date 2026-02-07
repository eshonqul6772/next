import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

interface PageableRequest {
  page?: number;
  perPage?: number;
  sort?: { name?: string; direction?: 'asc' | 'desc' };
  search?: { key: string; value: string; operation: string }[];
}

export async function POST(request: NextRequest) {
  try {
    const body: PageableRequest = await request.json();
    const { page = 1, perPage = 10, sort, search } = body;

    const skip = (page - 1) * perPage;

    // Build where clause
    const where: Record<string, unknown> = {
      NOT: { status: 'DELETED' }
    };

    if (search && search.length > 0) {
      for (const filter of search) {
        if (filter.operation === '%_%') {
          where[filter.key] = { contains: filter.value };
        } else if (filter.operation === '=') {
          where[filter.key] = filter.value;
        }
      }
    }

    // Build orderBy
    const orderBy: Record<string, 'asc' | 'desc'> = {};
    if (sort?.name && typeof sort.name === 'string') {
      orderBy[sort.name] = sort.direction || 'asc';
    } else {
      orderBy.id = 'desc';
    }

    const [users, totalItems] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: perPage,
        orderBy,
        include: { role: true }
      }),
      prisma.user.count({ where })
    ]);

    const data = users.map((user) => ({
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
    }));

    return NextResponse.json({
      data,
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        current: page,
        perPage
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
