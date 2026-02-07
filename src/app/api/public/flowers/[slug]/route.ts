import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'uz';

    const flower = await prisma.flower.findUnique({
      where: { slug },
      include: { category: true }
    });

    if (!flower) {
      return NextResponse.json({ error: 'Flower not found' }, { status: 404 });
    }

    // Get related flowers from same category
    const related = await prisma.flower.findMany({
      where: {
        categoryId: flower.categoryId,
        status: 'ACTIVE',
        id: { not: flower.id }
      },
      take: 4,
      orderBy: { sortOrder: 'asc' }
    });

    const data = {
      id: flower.id,
      name: lang === 'ru' ? flower.nameRu : lang === 'en' ? flower.nameEn : flower.nameUz,
      slug: flower.slug,
      description: flower.description,
      price: flower.price,
      oldPrice: flower.oldPrice,
      imageUrl: flower.imageUrl,
      images: flower.images ? JSON.parse(flower.images) : [],
      isNew: flower.isNew,
      isFeatured: flower.isFeatured,
      inStock: flower.inStock,
      category: {
        id: flower.category.id,
        name: lang === 'ru' ? flower.category.nameRu : lang === 'en' ? flower.category.nameEn : flower.category.nameUz,
        slug: flower.category.slug
      },
      related: related.map((r) => ({
        id: r.id,
        name: lang === 'ru' ? r.nameRu : lang === 'en' ? r.nameEn : r.nameUz,
        slug: r.slug,
        price: r.price,
        oldPrice: r.oldPrice,
        imageUrl: r.imageUrl,
        isNew: r.isNew
      }))
    };

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching flower:', error);
    return NextResponse.json({ error: 'Failed to fetch flower' }, { status: 500 });
  }
}
