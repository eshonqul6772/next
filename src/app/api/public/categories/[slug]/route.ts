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

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        flowers: {
          where: { status: 'ACTIVE' },
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const data = {
      id: category.id,
      name: lang === 'ru' ? category.nameRu : lang === 'en' ? category.nameEn : category.nameUz,
      slug: category.slug,
      description: category.description,
      imageUrl: category.imageUrl,
      flowers: category.flowers.map((flower) => ({
        id: flower.id,
        name: lang === 'ru' ? flower.nameRu : lang === 'en' ? flower.nameEn : flower.nameUz,
        slug: flower.slug,
        price: flower.price,
        oldPrice: flower.oldPrice,
        imageUrl: flower.imageUrl,
        isNew: flower.isNew,
        inStock: flower.inStock
      }))
    };

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}
