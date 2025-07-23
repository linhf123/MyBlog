# 博客管理员配置指南

本指南将帮助你配置博客的管理员功能，包括上传文章、管理评论等权限。

## 🔑 管理员权限功能

- ✅ **文章上传**: 通过 `/admin/upload` 页面上传 Markdown 文件
- ✅ **内容管理**: 管理所有文章和评论
- ✅ **用户管理**: 查看用户信息和活动

## 🛠 配置管理员权限

### 方法1：通过邮箱配置（推荐）

在环境变量中添加管理员邮箱列表：

**本地开发** (`.env.local`):
```bash
# 管理员邮箱（多个邮箱用逗号分隔）
ADMIN_EMAILS="admin@example.com,another@example.com"
```

**Vercel 部署环境**:
```bash
# 在 Vercel Dashboard → Settings → Environment Variables 中添加
ADMIN_EMAILS="admin@example.com,another@example.com"
```

**GitHub Actions Secrets**:
```bash
# 在 GitHub → Settings → Secrets → Actions 中添加
ADMIN_EMAILS="admin@example.com,another@example.com"
```

### 方法2：通过用户ID配置

如果你知道GitHub用户的内部ID，也可以通过ID配置：

```bash
# 管理员用户ID（多个ID用逗号分隔）
ADMIN_USER_IDS="12345678,87654321"
```

### 如何获取GitHub用户ID

1. **方法1**: 访问 `https://api.github.com/users/[username]`
2. **方法2**: 在浏览器开发者工具中查看登录后的用户信息
3. **方法3**: 查看数据库中的用户记录

## 🔧 完整环境变量配置

### 本地开发环境 (`.env.local`)
```bash
# 数据库配置
DATABASE_URL="postgresql://user:password@localhost:5432/blog_db"

# NextAuth.js 配置
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth (本地开发使用标准变量名)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# 管理员配置
ADMIN_EMAILS="admin@example.com"
ADMIN_USER_IDS="12345678"
```

### Vercel 生产环境
在 Vercel Dashboard → Settings → Environment Variables 中配置：
```bash
DATABASE_URL="your-vercel-postgres-url"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="https://your-domain.vercel.app"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
ADMIN_EMAILS="admin@example.com"
ADMIN_USER_IDS="12345678"
```

### GitHub Actions Secrets
在 GitHub → Settings → Secrets and variables → Actions 中配置：
```bash
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="https://your-domain.vercel.app"
OAUTH_GITHUB_CLIENT_ID="your-github-client-id"      # ⚠️ 注意变量名
OAUTH_GITHUB_CLIENT_SECRET="your-github-client-secret"  # ⚠️ 注意变量名
ADMIN_EMAILS="admin@example.com"
ADMIN_USER_IDS="12345678"
```

## 🧪 测试管理员功能

### 1. 本地测试
```bash
# 启动开发服务器
npm run dev

# 访问管理页面
open http://localhost:3000/admin/upload
```

### 2. 验证权限
1. 使用配置的管理员邮箱通过GitHub登录
2. 访问 `/admin/upload` 页面
3. 应该能看到文件上传界面
4. 尝试上传一个 Markdown 文件

### 3. 检查权限API
```bash
# 测试权限检查接口
curl http://localhost:3000/api/auth/check-admin
```

## 📝 管理员功能使用

### 上传文章

1. **访问上传页面**: `/admin/upload`
2. **选择文件**: 支持 `.md` 和 `.txt` 文件
3. **自动解析**: 系统会自动解析文件名、Front Matter等
4. **发布文章**: 上传后文章会立即发布

### Markdown 文件格式

支持标准的Front Matter格式：

```markdown
---
title: "文章标题"
date: "2024-01-20"
excerpt: "文章摘要"
author: "作者名称"
---

# 文章内容

这里是文章的正文内容...
```

### 管理文章

- 通过数据库管理工具：`npm run db:studio`
- 通过API接口进行CRUD操作
- 未来版本将添加Web管理界面

## 🔒 安全注意事项

### 1. 环境变量安全
- ✅ 切勿将敏感信息提交到代码仓库
- ✅ 定期轮换密钥和Token
- ✅ 使用不同的密钥用于不同环境

### 2. 管理员权限控制
- ✅ 只给必要的人员分配管理员权限
- ✅ 定期审查管理员列表
- ✅ 考虑使用用户ID而不是邮箱（更安全）

### 3. 文件上传安全
- ✅ 只允许 Markdown 和文本文件
- ✅ 文件大小限制
- ✅ 内容过滤和验证

## 🛠 故障排查

### Q: 无法访问管理页面
**可能原因**:
- 用户邮箱不在管理员列表中
- 环境变量配置错误
- GitHub OAuth 配置问题

**解决方案**:
```bash
# 检查环境变量
echo $ADMIN_EMAILS

# 查看当前用户信息
# 在浏览器控制台执行
console.log(session.user)

# 检查权限API
curl http://localhost:3000/api/auth/check-admin
```

### Q: 文件上传失败
**可能原因**:
- 文件格式不支持
- 文件大小超限
- 权限检查失败

**解决方案**:
- 确认文件是 `.md` 或 `.txt` 格式
- 检查文件大小（建议 < 10MB）
- 确认已正确配置管理员权限

### Q: GitHub Actions 部署后权限丢失
**检查事项**:
- 确认 GitHub Secrets 中配置了 `ADMIN_EMAILS`
- 检查 Vercel 环境变量配置
- 验证变量名使用正确（OAUTH_GITHUB_CLIENT_ID）

## 📞 获取帮助

如果遇到问题：
1. 检查浏览器控制台错误信息
2. 查看服务器日志
3. 验证所有环境变量配置
4. 参考 [GitHub Actions 配置指南](./scripts/setup-github-actions.md)

---

✨ 配置完成后，你就可以开始管理你的博客内容了！ 