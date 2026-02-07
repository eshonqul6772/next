import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

interface TranslationResponse {
  [tag: string]: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; lang: string }> }
) {
  try {
    const { type, lang } = await params;

    // Validate language
    const validLangs = ['uz', 'ru', 'en'];
    if (!validLangs.includes(lang)) {
      return NextResponse.json(
        { error: 'Invalid language. Use: uz, ru, en' },
        { status: 400 }
      );
    }

    // Get translations that include this type
    const translations = await prisma.translation.findMany({
      where: {
        status: 'ACTIVE'
      }
    });

    // Filter by type and build response object
    const result: TranslationResponse = {};

    for (const translation of translations) {
      // Parse types JSON
      let types: string[] = [];
      try {
        types = JSON.parse(translation.types);
      } catch {
        types = [];
      }

      // Check if translation includes the requested type
      if (types.includes(type)) {
        // Get the translation in the requested language
        let value = '';
        switch (lang) {
          case 'ru':
            value = translation.nameRu;
            break;
          case 'en':
            value = translation.nameEn;
            break;
          case 'uz':
          default:
            value = translation.nameUz;
            break;
        }

        result[translation.tag] = value;
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching translations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch translations' },
      { status: 500 }
    );
  }
}
