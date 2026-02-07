import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

interface UpdateTranslationBody {
  name: { ru: string; uz: string; en: string };
  tag: string;
  types: string[];
  status: string;
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const translationId = parseInt(id, 10);

    const translation = await prisma.translation.findUnique({
      where: { id: translationId }
    });

    if (!translation) {
      return NextResponse.json({ error: 'Translation not found' }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        id: translation.id,
        name: { ru: translation.nameRu, uz: translation.nameUz, en: translation.nameEn },
        tag: translation.tag,
        types: JSON.parse(translation.types),
        status: translation.status
      }
    });
  } catch (error) {
    console.error('Error fetching translation:', error);
    return NextResponse.json({ error: 'Failed to fetch translation' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const translationId = parseInt(id, 10);
    const body: UpdateTranslationBody = await request.json();
    const { name, tag, types, status } = body;

    const translation = await prisma.translation.update({
      where: { id: translationId },
      data: {
        nameRu: name.ru,
        nameUz: name.uz,
        nameEn: name.en,
        tag,
        types: JSON.stringify(types),
        status
      }
    });

    return NextResponse.json({
      data: {
        id: translation.id,
        name: { ru: translation.nameRu, uz: translation.nameUz, en: translation.nameEn },
        tag: translation.tag,
        types: JSON.parse(translation.types),
        status: translation.status
      }
    });
  } catch (error) {
    console.error('Error updating translation:', error);
    return NextResponse.json({ error: 'Failed to update translation' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const translationId = parseInt(id, 10);

    const translation = await prisma.translation.delete({
      where: { id: translationId }
    });

    return NextResponse.json({
      data: {
        id: translation.id,
        name: { ru: translation.nameRu, uz: translation.nameUz, en: translation.nameEn },
        tag: translation.tag,
        types: JSON.parse(translation.types),
        status: translation.status
      }
    });
  } catch (error) {
    console.error('Error deleting translation:', error);
    return NextResponse.json({ error: 'Failed to delete translation' }, { status: 500 });
  }
}
