import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

interface LoginBody {
  username: string;
  password: string;
}

// Simple token generation (for demo purposes)
function generateToken(userId: number): string {
  return Buffer.from(`${userId}:${Date.now()}`).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginBody = await request.json();
    const { username, password } = body;

    // Find user by username and password
    const user = await prisma.user.findFirst({
      where: {
        username,
        password,
        status: 'ACTIVE'
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const accessToken = generateToken(user.id);

    return NextResponse.json({
      data: {
        accessToken
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
