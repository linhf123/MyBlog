# 我的博客

一个使用 Next.js 15 构建的简洁博客系统，支持 GitHub 登录和评论功能。

## 功能特性

- 📝 博客文章展示
- 💬 评论系统
- 🔐 GitHub OAuth 登录
- 📱 响应式设计
- ⚡ Next.js 15 + TypeScript

## 技术栈

- **前端框架**: Next.js 15
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **认证**: NextAuth.js
- **数据库**: PostgreSQL + Prisma

## 快速开始

1. **克隆项目**
   ```bash
   git clone <your-repo-url>
   cd blog
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置 GitHub OAuth**
   
   a. 前往 [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/applications/new)
   
   b. 创建新的 OAuth App:
   - Application name: 你的博客名称
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   
   c. 获取 Client ID 和 Client Secret

4. **设置 PostgreSQL 数据库**
   
   a. 安装并启动 PostgreSQL
   
   b. 创建数据库：
   ```sql
   CREATE DATABASE blog_db;
   ```

5. **配置环境变量**
   
   复制环境变量模板：
   ```bash
   cp .env.example .env.local
   ```
   
   编辑 `.env.local` 文件：
   ```env
   # 数据库连接
   DATABASE_URL="postgresql://username:password@localhost:5432/blog_db?schema=public"
   
   # GitHub OAuth 配置
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   
   # NextAuth 配置
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key
   ```

6. **初始化数据库**
   ```bash
   # 生成 Prisma 客户端
   npm run db:generate
   
   # 运行数据库迁移
   npm run db:migrate
   
   # 初始化种子数据
   npm run db:seed
   ```

7. **启动开发服务器**
   ```bash
   npm run dev
   ```

8. **访问应用**
   
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
src/
├── app/                    # App Router 页面
│   ├── api/               # API 路由
│   │   ├── auth/          # NextAuth 配置
│   │   ├── posts/         # 文章 API
│   │   └── comments/      # 评论 API
│   ├── posts/[id]/        # 文章详情页
│   ├── layout.tsx         # 全局布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── Comments.tsx       # 评论组件
│   ├── MarkdownRenderer.tsx # Markdown 渲染器
│   ├── Navbar.tsx         # 导航栏
│   ├── PostCard.tsx       # 文章卡片
│   └── SessionProvider.tsx # 会话提供器
├── lib/                   # 工具库
│   ├── auth.ts           # NextAuth 配置
│   ├── data.ts           # 数据访问层
│   └── prisma.ts         # Prisma 客户端
└── types/                 # TypeScript 类型定义
    └── index.ts
```

## 数据库管理

### 可用的数据库命令

```bash
# 生成 Prisma 客户端
npm run db:generate

# 运行数据库迁移（开发环境）
npm run db:migrate

# 推送架构到数据库（无迁移文件）
npm run db:push

# 初始化种子数据
npm run db:seed

# 打开 Prisma Studio（数据库GUI）
npm run db:studio

# 重置数据库
npm run db:reset
```

### 添加新文章

使用 Prisma Studio 或直接通过 API 添加新文章：

```typescript
// 通过 createPost 函数
const newPost = await createPost({
  title: '新文章标题',
  content: '文章内容（支持 Markdown）',
  excerpt: '文章摘要',
  author: '作者名称',
  userId: 'user_id' // 可选
});
```

### 数据库架构

项目使用以下数据模型：
- **User**: 用户信息（NextAuth.js）
- **Post**: 博客文章
- **Comment**: 文章评论
- **Account/Session**: 认证相关表

### 自定义样式

项目使用 Tailwind CSS，你可以：
- 修改 `src/app/globals.css` 全局样式
- 在组件中调整 Tailwind 类名
- 修改 `tailwind.config.ts` 配置

## 部署

### Vercel 部署

1. 推送代码到 GitHub
2. 连接 Vercel 账号到 GitHub
3. 导入项目到 Vercel
4. 配置环境变量
5. 部署

### 其他平台

确保配置正确的环境变量，特别是 `NEXTAUTH_URL` 要设置为生产环境的 URL。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
