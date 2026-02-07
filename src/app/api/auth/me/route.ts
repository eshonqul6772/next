import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/lib/prisma';

// Parse token to get user ID
function parseToken(token: string): number | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [userId] = decoded.split(':');
    return parseInt(userId, 10);
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const userId = parseToken(token);

    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user's role permissions
    const permissions = user.role ? JSON.parse(user.role.permissions) : [];

    const profile = {
      id: String(user.id),
      fullName: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: '',
      photo: user.photoUrl ? {
        id: 0,
        name: '',
        extension: '',
        url: user.photoUrl,
        uuid: ''
      } : {
        id: 0,
        name: '',
        extension: '',
        url: '',
        uuid: ''
      },
      login: user.username,
      role: user.role ? { id: user.role.id, name: user.role.name } : { id: null, name: '' },
      permissions,
      cabinetType: 'ADMIN_CABINET'
    };

    return NextResponse.json({ data: profile });
  } catch (error) {
    console.error('Error getting profile:', error);
    return NextResponse.json({ error: 'Failed to get profile' }, { status: 500 });
  }
}
