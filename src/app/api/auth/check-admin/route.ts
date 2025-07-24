import { NextResponse } from 'next/server';
import { isCurrentUserAdmin } from '@/lib/auth';

export async function GET() {
  try {
    // 调试：检查环境变量
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Vercel ENV:', process.env.VERCEL_ENV);
    
    const isAdmin = await isCurrentUserAdmin();
    
    return NextResponse.json({ 
      isAdmin,
      message: isAdmin ? 'User is admin' : 'User is not admin'
    });
  } catch (error) {
    console.error('Error checking admin status:', error);
    console.error('DATABASE_URL defined:', !!process.env.DATABASE_URL);
    
    return NextResponse.json({ 
      isAdmin: false,
      error: 'Failed to check admin status',
      debug: {
        hasDbUrl: !!process.env.DATABASE_URL,
        env: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV
      }
    }, { status: 500 });
  }
} 