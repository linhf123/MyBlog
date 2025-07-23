# GitHub Actions 配置指南

本指南将帮助你配置所有必要的 GitHub Secrets 和环境，以使用完整的 CI/CD 流水线。

## 🚀 快速配置清单

### 1. 配置 Vercel (推荐部署平台)

1. 前往 [Vercel Dashboard](https://vercel.com/dashboard)
2. 创建新项目并连接你的 GitHub 仓库
3. 获取必要的 Token 和 ID:

```bash
# 获取 Vercel Token
vercel login
vercel link  # 链接项目

# 获取项目和组织 ID
cat .vercel/project.json
```

### 2. 配置 GitHub Secrets

前往你的 GitHub 仓库 → Settings → Secrets and variables → Actions，添加以下 Secrets:

#### 🔒 必需的 Secrets

```bash
# Vercel 部署
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id 
VERCEL_PROJECT_ID=your_project_id

# 数据库 (生产环境)
DATABASE_URL=postgresql://user:password@host:5432/prod_db

# 数据库 (预览环境 - 可选)
PREVIEW_DATABASE_URL=postgresql://user:password@host:5432/preview_db

# NextAuth.js
NEXTAUTH_SECRET=your_super_secret_key_here
NEXTAUTH_URL=https://your-domain.vercel.app

# GitHub OAuth (注意：不能使用GITHUB_前缀!)
OAUTH_GITHUB_CLIENT_ID=your_github_oauth_client_id
OAUTH_GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
```

#### ⚠️ 重要提醒

**GitHub 保留了 `GITHUB_` 前缀用作系统变量**，所以：
- ❌ **不能使用**: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` 
- ✅ **必须使用**: `OAUTH_GITHUB_CLIENT_ID`, `OAUTH_GITHUB_CLIENT_SECRET`

#### 🔒 可选的 Secrets

```bash
# Snyk 安全扫描 (提升安全检测能力)
SNYK_TOKEN=your_snyk_token
```

### 3. 创建 GitHub Environments

1. 前往 Settings → Environments
2. 创建 `production` 环境
3. 配置保护规则:
   - ✅ Required reviewers (推荐)
   - ✅ Wait timer (可选)
   - ✅ Deployment branches (限制 main/master)

### 4. 配置分支保护规则

前往 Settings → Branches，为 `main` 分支添加保护规则:

- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging
  - ✅ `lint-and-type-check`
  - ✅ `build-test`
  - ✅ `database-check`
- ✅ Require conversation resolution before merging
- ✅ Include administrators

## 🛠 获取各种 Token 的方法

### Vercel Token
```bash
# 方法 1: CLI
npx vercel login
npx vercel --token

# 方法 2: Dashboard
# 访问 https://vercel.com/account/tokens
# 创建新的 Token
```

### GitHub OAuth 应用
1. 前往 GitHub Settings → Developer settings → OAuth Apps
2. 创建新应用:
   - Application name: `Your Blog App`
   - Homepage URL: `https://your-domain.vercel.app`
   - Authorization callback URL: `https://your-domain.vercel.app/api/auth/callback/github`

### NextAuth Secret
```bash
# 生成安全的密钥
openssl rand -base64 32
# 或者
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Snyk Token (可选)
1. 注册 [Snyk](https://snyk.io/)
2. 前往 Account Settings → General → Auth Token
3. 复制 Token

## 📋 验证配置

配置完成后，创建一个测试 PR 来验证所有工作流:

```bash
git checkout -b test-github-actions
echo "# Test GitHub Actions" >> test-file.md
git add test-file.md
git commit -m "test: GitHub Actions setup"
git push origin test-github-actions
```

然后创建 PR，应该能看到:
- ✅ CI 检查通过
- 🚀 预览部署链接
- 🔒 安全扫描通过

## 🔧 常见问题排查

### Q: "Input required and not supplied: GITHUB_CLIENT_ID"
**解决方案**: 
- 确认使用了正确的变量名称：`OAUTH_GITHUB_CLIENT_ID` 和 `OAUTH_GITHUB_CLIENT_SECRET`
- GitHub 保留了 `GITHUB_` 前缀，必须使用其他名称

### Q: Vercel 部署失败
- 检查 `VERCEL_TOKEN` 是否有效
- 确认 `VERCEL_ORG_ID` 和 `VERCEL_PROJECT_ID` 正确
- 检查环境变量是否完整

### Q: 数据库连接失败
- 验证 `DATABASE_URL` 格式正确
- 确保数据库服务器允许外部连接
- 检查防火墙设置

### Q: GitHub OAuth 认证失败
- 验证 `OAUTH_GITHUB_CLIENT_ID` 和 `OAUTH_GITHUB_CLIENT_SECRET`
- 检查 OAuth 应用的回调 URL 设置
- 确认域名配置正确

### Q: 安全扫描失败
- Snyk Token 是可选的，可以暂时忽略
- npm audit 警告不会阻止部署
- CodeQL 分析可能需要一些时间

## 🎉 配置完成！

配置完成后，你的博客项目将拥有:

- 🔄 **自动化 CI/CD**: 每次推送自动测试和部署
- 🚀 **预览部署**: 每个 PR 都有独立预览环境
- 🔒 **安全扫描**: 自动检测安全漏洞
- 📦 **依赖管理**: 自动更新和安全修复
- 🗄️ **数据库迁移**: 自动执行 Schema 更新

现在你可以专注于开发博客功能，让 GitHub Actions 处理繁琐的部署和维护工作！ 