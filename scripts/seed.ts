import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Check if data already exists
  const existingPosts = await prisma.post.count()
  if (existingPosts > 0) {
    console.log('📝 Database already has posts, skipping seed...')
    return
  }

  // Create initial posts
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
      {
        title: 'PostgreSQL 与 Prisma 最佳实践',
        content: `# PostgreSQL 与 Prisma 最佳实践

在现代 Web 开发中，PostgreSQL 和 Prisma 的组合为我们提供了强大的数据库解决方案。

## 为什么选择 PostgreSQL？

1. **ACID 兼容性** - 确保数据一致性
2. **丰富的数据类型** - 支持 JSON、数组等复杂类型
3. **强大的查询能力** - 支持复杂查询和全文搜索
4. **开源和社区支持** - 活跃的开源社区

## Prisma 的优势

- **类型安全** - 自动生成的 TypeScript 类型
- **直观的查询 API** - 简洁易读的查询语法
- **数据库迁移** - 版本控制的数据库架构
- **性能优化** - 智能查询优化

## 最佳实践

1. 使用索引优化查询性能
2. 合理设计数据库关系
3. 定期备份数据
4. 监控查询性能

这个博客系统就是使用 PostgreSQL + Prisma 构建的最佳实践示例！`,
        excerpt: '深入了解 PostgreSQL 与 Prisma 的最佳实践，构建高性能的数据库应用。',
        author: 'Blog Owner',
      },
    ],
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 