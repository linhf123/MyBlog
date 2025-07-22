import { NextRequest, NextResponse } from 'next/server';
import { auth, isCurrentUserAdmin } from '@/lib/auth';
import { createPostFromMarkdown } from '@/lib/data';

export async function POST(request: NextRequest) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 检查用户是否为管理员
  const isUserAdmin = await isCurrentUserAdmin();
  if (!isUserAdmin) {
    return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.name.endsWith('.md')) {
      return NextResponse.json({ error: 'Only .md files are allowed' }, { status: 400 });
    }

    const content = await file.text();
    const authorName = session.user.name || 'Anonymous';
    
    const post = await createPostFromMarkdown(content, authorName, session.user.id);
    
    return NextResponse.json({ 
      success: true, 
      post: {
        id: post.id,
        title: post.title,
        excerpt: post.excerpt
      }
    });
  } catch (error) {
    console.error('Error uploading markdown file:', error);
    return NextResponse.json({ 
      error: 'Failed to process markdown file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 