import { NextRequest, NextResponse } from 'next/server';
import { getCommentsByPostId, addComment } from '@/lib/data';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const postId = searchParams.get('postId');
  
  if (!postId) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
  }
  
  try {
    const comments = await getCommentsByPostId(postId);
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const { postId, content } = await request.json();
    
    if (!postId || !content) {
      return NextResponse.json({ error: 'Post ID and content are required' }, { status: 400 });
    }
    
    const comment = await addComment(postId, content, session.user.id);
    
    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
} 