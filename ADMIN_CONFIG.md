# 📋 管理员配置指南

## 🔧 环境变量配置

为了限制文章上传权限只给管理员用户，你需要在 `.env.local` 文件中配置管理员用户。

### 配置方式

#### 方式1：通过邮箱配置（推荐）

```bash
# 单个管理员
ADMIN_EMAILS="your-email@example.com"

# 多个管理员（用逗号分隔）
ADMIN_EMAILS="admin1@example.com,admin2@example.com,admin3@example.com"
```

#### 方式2：通过用户ID配置

```bash
# 单个管理员
ADMIN_USER_IDS="clxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# 多个管理员（用逗号分隔）
ADMIN_USER_IDS="clxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx,clyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy"
```

#### 方式3：混合配置

```bash
# 可以同时配置邮箱和用户ID
ADMIN_EMAILS="admin@example.com"
ADMIN_USER_IDS="clxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

## 🎯 如何获取用户ID

### 方法1：数据库查询
```sql
SELECT id, email, name FROM "User" WHERE email = 'your-email@example.com';
```

### 方法2：开发者工具
1. 登录你的博客系统
2. 打开浏览器开发者工具（F12）
3. 在 Console 中输入：
```javascript
// 查看当前用户session
fetch('/api/auth/session').then(r => r.json()).then(console.log)
```
4. 在返回的数据中找到 `user.id` 字段

### 方法3：Prisma Studio
```bash
npx prisma studio
```
在 User 表中查找你的用户记录，复制 ID 字段。

## 🔐 权限验证逻辑

系统会检查当前登录用户是否满足以下任一条件：

1. **邮箱匹配**：用户邮箱在 `ADMIN_EMAILS` 列表中
2. **用户ID匹配**：用户ID在 `ADMIN_USER_IDS` 列表中

只要满足其中一个条件，用户就具有管理员权限。

## 📁 完整的 .env.local 示例

```bash
# 数据库配置
DATABASE_URL="postgresql://username:password@localhost:5432/blog"

# NextAuth.js 配置
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# GitHub OAuth 配置
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# 管理员配置
ADMIN_EMAILS="your-email@gmail.com"
```

## 🚫 安全注意事项

1. **敏感信息保护**：不要将 `.env.local` 文件提交到版本控制系统
2. **定期检查**：定期检查管理员列表，移除不需要权限的用户
3. **邮箱验证**：确保配置的邮箱地址是你可以控制的
4. **最小权限原则**：只给需要上传文章的用户管理员权限

## 🔄 配置更改后的操作

修改环境变量后需要：

1. **重启开发服务器**：
```bash
npm run dev
```

2. **清除浏览器缓存**（可选）

3. **重新登录**验证权限

## 📝 测试权限配置

1. 配置环境变量
2. 重启服务器
3. 登录系统
4. 检查导航栏是否显示"上传"按钮
5. 尝试访问 `/admin/upload` 页面
6. 测试非管理员用户无法访问上传功能

## ❗ 故障排除

### 问题：配置了邮箱但仍无权限
- 检查邮箱拼写是否正确
- 确认 GitHub 账号的邮箱是否与配置的邮箱一致
- 重启开发服务器

### 问题：找不到用户ID
- 确保已经登录过系统（在数据库中有用户记录）
- 使用 Prisma Studio 查看数据库中的用户记录

### 问题：环境变量不生效
- 检查 `.env.local` 文件是否在项目根目录
- 确认环境变量名称拼写正确
- 重启开发服务器 