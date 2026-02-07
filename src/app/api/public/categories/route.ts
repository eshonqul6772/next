import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'uz';

    const categories = await prisma.category.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { flowers: { where: { status: 'ACTIVE' } } }
        }
      }
    });

    const data = categories.map((cat) => ({
      id: cat.id,
      name: lang === 'ru' ? cat.nameRu : lang === 'en' ? cat.nameEn : cat.nameUz,
      slug: cat.slug,
      description: cat.description,
      imageUrl: cat.imageUrl,
      flowerCount: cat._count.flowers
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
