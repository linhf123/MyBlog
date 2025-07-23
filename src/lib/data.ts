import { Post, Comment } from '@/types';
import { prisma } from './prisma';
import matter from 'gray-matter';

// 检查是否为构建环境
function isBuildEnvironment(): boolean {
  return process.env.CI === 'true' || 
         process.env.NODE_ENV === 'test' ||
         process.env.VERCEL_ENV === 'production';
}

// 获取所有文章
export async function getPosts(): Promise<Post[]> {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return posts;
  } catch (error) {
    console.error('❌ Database error in getPosts:', error);
    
    // 在构建环境中返回空数组而不是抛出错误
    if (isBuildEnvironment()) {
      console.log('⚠️  Returning empty posts array for build environment');
      return [];
    }
    
    // 在运行时环境中重新抛出错误
    throw error;
  }
}

// 根据ID获取文章
export async function getPostById(id: string): Promise<Post | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { id }
    });
    
    return post;
  } catch (error) {
    console.error('❌ Database error in getPostById:', error);
    
    // 在构建环境中返回null
    if (isBuildEnvironment()) {
      console.log('⚠️  Returning null for post in build environment');
      return null;
    }
    
    throw error;
  }
}

// 获取文章的评论
export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  try {
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
    return comments.map((comment): Comment => ({
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
  } catch (error) {
    console.error('❌ Database error in getCommentsByPostId:', error);
    
    // 在构建环境中返回空数组
    if (isBuildEnvironment()) {
      console.log('⚠️  Returning empty comments array for build environment');
      return [];
    }
    
    throw error;
  }
}

// 添加评论
export async function addComment(
  postId: string, 
  content: string, 
  userId: string
): Promise<Comment> {
  try {
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
  } catch (error) {
    console.error('❌ Database error in addComment:', error);
    throw error; // 评论功能在任何环境下都应该抛出错误
  }
}

// 创建文章（管理员功能）
export async function createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
  try {
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
  } catch (error) {
    console.error('❌ Database error in createPost:', error);
    throw error; // 创建文章功能应该抛出错误
  }
}

// 初始化种子数据
export async function seedInitialData(): Promise<void> {
  try {
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
  } catch (error) {
    console.error('❌ Database error in seedInitialData:', error);
    // 种子数据失败不应该阻止应用启动
    console.log('⚠️  Failed to seed initial data, continuing...');
  }
}

// 从 Markdown 文件创建文章
export async function createPostFromMarkdown(
  markdownContent: string, 
  authorName: string, 
  userId: string
): Promise<Post> {
  const { data: frontMatter, content } = matter(markdownContent);
  
  // 从 frontMatter 中提取元数据，如果没有则使用默认值
  const title = frontMatter.title || extractTitleFromContent(content) || 'Untitled';
  const excerpt = frontMatter.excerpt || frontMatter.description || generateExcerpt(content);
  const author = frontMatter.author || authorName;
  
  // 验证必要字段
  if (!title.trim()) {
    throw new Error('文章标题不能为空');
  }
  
  if (!content.trim()) {
    throw new Error('文章内容不能为空');
  }
  
  const post = await createPost({
    title: title.trim(),
    content: content.trim(),
    excerpt: excerpt.trim(),
    author: author.trim(),
    userId
  });
  
  return post;
}

// 从内容中提取标题（查找第一个 # 标题）
function extractTitleFromContent(content: string): string | null {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : null;
}

// 生成文章摘要（取前 150 个字符）
function generateExcerpt(content: string): string {
  // 移除 Markdown 语法
  const plainText = content
    .replace(/^#{1,6}\s+/gm, '') // 移除标题
    .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体
    .replace(/\*(.*?)\*/g, '$1') // 移除斜体
    .replace(/`(.*?)`/g, '$1') // 移除行内代码
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接，保留文本
    .replace(/\n\s*\n/g, ' ') // 移除多余换行
    .trim();
  
  return plainText.length > 150 
    ? plainText.substring(0, 150) + '...' 
    : plainText;
} 