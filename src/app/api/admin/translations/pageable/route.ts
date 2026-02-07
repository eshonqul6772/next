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

    const [translations, totalItems] = await Promise.all([
      prisma.translation.findMany({
        where,
        skip,
        take: perPage,
        orderBy
      }),
      prisma.translation.count({ where })
    ]);

    const data = translations.map((t) => ({
      id: t.id,
      name: { ru: t.nameRu, uz: t.nameUz, en: t.nameEn },
      tag: t.tag,
      types: JSON.parse(t.types),
      status: t.status
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
    console.error('Error fetching translations:', error);
    return NextResponse.json({ error: 'Failed to fetch translations' }, { status: 500 });
  }
}
