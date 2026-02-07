import { NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();

    const data: Record<string, string> = {};
    for (const setting of settings) {
      data[setting.key] = setting.value;
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}
