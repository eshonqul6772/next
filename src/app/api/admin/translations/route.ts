import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

interface CreateTranslationBody {
  name: { ru: string; uz: string; en: string };
  tag: string;
  types: string[];
  status: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateTranslationBody = await request.json();
    const { name, tag, types, status } = body;

    const translation = await prisma.translation.create({
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
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating translation:', error);
    return NextResponse.json({ error: 'Failed to create translation' }, { status: 500 });
  }
}
