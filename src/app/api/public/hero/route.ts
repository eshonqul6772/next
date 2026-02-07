import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'uz';

    const slides = await prisma.heroSlide.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { sortOrder: 'asc' }
    });

    const data = slides.map((slide) => ({
      id: slide.id,
      title: lang === 'ru' ? slide.titleRu : lang === 'en' ? slide.titleEn : slide.titleUz,
      subtitle: lang === 'ru' ? slide.subtitleRu : lang === 'en' ? slide.subtitleEn : slide.subtitleUz,
      imageUrl: slide.imageUrl,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return NextResponse.json({ error: 'Failed to fetch hero slides' }, { status: 500 });
  }
}
