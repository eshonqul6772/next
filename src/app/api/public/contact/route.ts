import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, phone and message are required' },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        phone,
        email: email || null,
        message,
        status: 'NEW'
      }
    });

    return NextResponse.json({
      data: contact,
      message: 'Message sent successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
