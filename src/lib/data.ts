import { Post, Comment } from '@/types';
import { prisma } from './prisma';

// 获取所有文章
export async function getPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return posts;
}

// 根据ID获取文章
export async function getPostById(id: string): Promise<Post | null> {
  const post = await prisma.post.findUnique({
    where: { id }
  });
  
  return post;
}

// 获取文章的评论
export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  // 转换为前端期望的格式
  return comments.map((comment: any): Comment => ({
    id: comment.id,
    postId: comment.postId,
    content: comment.content,
    author: {
      name: comment.user.name || 'Anonymous',
      email: comment.user.email,
      image: comment.user.image || undefined
    },
    userId: comment.userId,
    createdAt: comment.createdAt
  }));
}

// 添加评论
export async function addComment(
  postId: string, 
  content: string, 
  userId: string
): Promise<Comment> {
  const comment = await prisma.comment.create({
    data: {
      postId,
      content,
      userId
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true
        }
      }
    }
  });

  return {
    id: comment.id,
    postId: comment.postId,
    content: comment.content,
    author: {
      name: comment.user.name || 'Anonymous',
      email: comment.user.email,
      image: comment.user.image || undefined
    },
    userId: comment.userId,
    createdAt: comment.createdAt
  };
}

// 创建文章（管理员功能）
export async function createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
  const newPost = await prisma.post.create({
    data: {
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      userId: post.userId
    }
  });

  return newPost;
}

// 初始化种子数据
export async function seedInitialData(): Promise<void> {
  // 检查是否已经有数据
  const existingPosts = await prisma.post.count();
  if (existingPosts > 0) {
    return; // 已有数据，跳过初始化
  }

  // 创建初始文章
  await prisma.post.createMany({
    data: [
      {
        title: '欢迎来到我的博客',
        content: `# 欢迎来到我的博客

这是我的第一篇博客文章！在这里我会分享关于技术、生活和学习的内容。

## 博客功能

这个博客具有以下功能：
- 📝 文章阅读
- 💬 评论系统
- 🔐 GitHub 登录
- 📱 响应式设计

希望你喜欢这个简洁的博客系统！

## 技术栈

- Next.js 15
- TypeScript
- Tailwind CSS
- NextAuth.js
- PostgreSQL + Prisma

如果你想要评论，请先通过 GitHub 登录。`,
        excerpt: '欢迎来到我的博客！这里我会分享关于技术、生活和学习的内容。',
        author: 'Blog Owner',
      },
      {
        title: 'Next.js 15 新特性探索',
        content: `# Next.js 15 新特性探索

Next.js 15 带来了许多令人兴奋的新特性和改进。让我们一起来探索一下！

## 主要更新

### 1. React 19 支持
Next.js 15 完全支持 React 19，包括新的 Hooks 和并发特性。

### 2. Turbopack（Beta）
新的打包工具 Turbopack 在开发模式下提供了显著的性能提升。

### 3. 改进的缓存策略
更智能的缓存机制，提高了应用性能。

## 总结

Next.js 15 是一个重要的版本更新，为开发者提供了更好的开发体验和性能。`,
        excerpt: '探索 Next.js 15 的新特性，包括 React 19 支持、Turbopack 等重要更新。',
        author: 'Blog Owner',
      },
    ],
  });
} 