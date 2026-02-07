import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'uz';
    const featured = searchParams.get('featured') === 'true';
    const isNew = searchParams.get('new') === 'true';
    const categorySlug = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);

    const where: Record<string, unknown> = { status: 'ACTIVE' };

    if (featured) {
      where.isFeatured = true;
    }
    if (isNew) {
      where.isNew = true;
    }
    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    const [flowers, total] = await Promise.all([
      prisma.flower.findMany({
        where,
        include: { category: true },
        orderBy: { sortOrder: 'asc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.flower.count({ where })
    ]);

    const data = flowers.map((flower) => ({
      id: flower.id,
      name: lang === 'ru' ? flower.nameRu : lang === 'en' ? flower.nameEn : flower.nameUz,
      slug: flower.slug,
      description: flower.description,
      price: flower.price,
      oldPrice: flower.oldPrice,
      imageUrl: flower.imageUrl,
      isNew: flower.isNew,
      isFeatured: flower.isFeatured,
      inStock: flower.inStock,
      category: {
        id: flower.category.id,
        name: lang === 'ru' ? flower.category.nameRu : lang === 'en' ? flower.category.nameEn : flower.category.nameUz,
        slug: flower.category.slug
      }
    }));

    return NextResponse.json({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching flowers:', error);
    return NextResponse.json({ error: 'Failed to fetch flowers' }, { status: 500 });
  }
}
