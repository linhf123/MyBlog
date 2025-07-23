# GitHub Secrets 配置验证清单

## 🔍 快速检查

### 必需的 Secrets (8个)
前往: `Settings → Secrets and variables → Actions`

```bash
✅ VERCEL_TOKEN
✅ VERCEL_ORG_ID  
✅ VERCEL_PROJECT_ID
✅ DATABASE_URL
✅ NEXTAUTH_SECRET
✅ NEXTAUTH_URL
✅ OAUTH_GITHUB_CLIENT_ID
✅ OAUTH_GITHUB_CLIENT_SECRET
```

### 可选的 Secrets (2个)
```bash
🔹 PREVIEW_DATABASE_URL  (PR预览用)
🔹 SNYK_TOKEN           (安全扫描用)
```

## ⚠️ 重要提醒

**GitHub保留了 `GITHUB_` 前缀**，所以GitHub OAuth相关的变量必须使用不同的名称：
- ❌ ~~GITHUB_CLIENT_ID~~ (不能使用)
- ❌ ~~GITHUB_CLIENT_SECRET~~ (不能使用)
- ✅ `OAUTH_GITHUB_CLIENT_ID` (正确)
- ✅ `OAUTH_GITHUB_CLIENT_SECRET` (正确)

## 🧪 验证方法

### 1. 本地验证
```bash
# 创建 .env.local 测试文件
DATABASE_URL="your_database_url"
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
GITHUB_CLIENT_ID="your_client_id"
GITHUB_CLIENT_SECRET="your_client_secret"

# 测试构建
npm run build
```

### 2. 创建测试PR
```bash
git checkout -b test-deployment
echo "# Test GitHub Actions" >> test.md
git add test.md
git commit -m "test: verify GitHub Actions configuration"
git push origin test-deployment
```

### 3. 检查工作流状态
访问: `https://github.com/[username]/[repo]/actions`

应该看到:
- ✅ CI 检查通过
- ✅ 安全扫描通过  
- ✅ 部署成功
- 🔗 预览链接可访问

## 🚨 常见错误

### "Input required and not supplied"
- 检查 Secret 名称拼写（特别是新的OAuth变量名）
- 确认 Secret 值不为空

### "Authentication failed"  
- 验证 Token 是否过期
- 检查权限范围

### "Database connection failed"
- 验证 DATABASE_URL 格式
- 确认数据库服务正常

### "GitHub OAuth配置错误"
- 确认使用了新的变量名称：`OAUTH_GITHUB_CLIENT_ID` 和 `OAUTH_GITHUB_CLIENT_SECRET`
- 检查GitHub OAuth应用的回调URL设置

## 📞 获取帮助

如果配置后仍有问题，提供以下信息:
1. 具体的错误消息
2. 失败的工作流链接
3. 已配置的 Secret 名称列表 (不要包含值) 