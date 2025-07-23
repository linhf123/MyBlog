# 个人博客项目

一个使用 Next.js 15、TypeScript、Prisma 和 PostgreSQL 构建的现代化博客系统。

## ✨ 功能特性

- 🚀 **现代化技术栈**: Next.js 15 + TypeScript + Prisma
- 🎨 **美观界面**: Tailwind CSS + 响应式设计
- 🔐 **GitHub OAuth**: 安全的用户认证系统
- 💬 **评论系统**: 支持用户互动
- 📱 **移动友好**: 完全响应式设计
- 🔍 **代码高亮**: 支持多种编程语言
- 🚀 **自动部署**: GitHub Actions + Vercel
- 🛡️ **安全扫描**: 自动化安全检测

## 🛠 技术栈

- **前端**: Next.js 15, React 19, TypeScript
- **样式**: Tailwind CSS 4
- **数据库**: PostgreSQL + Prisma ORM
- **认证**: NextAuth.js v5
- **部署**: Vercel
- **CI/CD**: GitHub Actions

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone [your-repo-url]
cd blog
```

### 2. 安装依赖
```bash
npm install
```

### 3. 环境配置

创建 `.env.local` 文件：
```bash
# 数据库连接
DATABASE_URL="postgresql://user:password@localhost:5432/blog_db"

# NextAuth.js 配置
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth (本地开发使用标准变量名)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# 管理员配置 (可选)
ADMIN_EMAILS="your-email@example.com"
ADMIN_USER_IDS="github-user-id"
```

### 4. 数据库设置
```bash
# 生成 Prisma 客户端
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev

# (可选) 填充示例数据
npm run db:seed
```

### 5. 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看你的博客！

## 📝 环境变量说明

### 本地开发环境 (`.env.local`)
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/blog_db"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
```

### GitHub Actions Secrets
由于GitHub保留了 `GITHUB_` 前缀，GitHub Actions中需要使用不同的变量名：
```bash
DATABASE_URL="your_production_database_url"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="https://your-domain.vercel.app"
OAUTH_GITHUB_CLIENT_ID="your_github_client_id"      # ⚠️ 注意变量名
OAUTH_GITHUB_CLIENT_SECRET="your_github_client_secret"  # ⚠️ 注意变量名
```

## 🗄️ 数据库管理

```bash
# 数据库迁移
npm run db:migrate

# 重置数据库
npm run db:reset

# 查看数据库
npm run db:studio

# 推送 schema 变更
npm run db:push
```

## 🚀 部署

### 使用 Vercel (推荐)

1. **连接 GitHub 仓库**
   - 前往 [Vercel Dashboard](https://vercel.com)
   - 导入你的 GitHub 仓库

2. **配置环境变量**
   ```bash
   DATABASE_URL=your_vercel_postgres_url
   NEXTAUTH_SECRET=your_secret_here
   NEXTAUTH_URL=https://your-domain.vercel.app
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

3. **数据库配置**
   - 在 Vercel 中创建 PostgreSQL 数据库
   - 复制连接字符串到 `DATABASE_URL`

### GitHub Actions 自动部署

项目包含完整的 CI/CD 流水线：

- ✅ **代码检查**: ESLint + TypeScript
- ✅ **构建测试**: Next.js 构建验证
- ✅ **安全扫描**: 依赖安全检查
- ✅ **自动部署**: 推送到 main 分支自动部署
- ✅ **PR 预览**: 每个 PR 都有预览环境

配置说明请参考 [GitHub Actions 配置指南](./scripts/setup-github-actions.md)

## 📚 项目结构

```
├── src/
│   ├── app/                # App Router 页面
│   ├── components/         # React 组件
│   ├── lib/               # 工具库
│   └── types/             # TypeScript 类型
├── prisma/                # 数据库配置
├── scripts/               # 脚本和文档
└── .github/workflows/     # GitHub Actions
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 获取帮助

- 📖 [设置指南](./scripts/setup-github-actions.md)
- 🐛 [故障排查](./scripts/debug-github-actions.md)
- 💬 [提交 Issue](../../issues)

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！
