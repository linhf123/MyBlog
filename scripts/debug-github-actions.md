# GitHub Actions 故障排查指南

## 🔍 快速诊断

### 1. 检查失败的工作流
前往你的 GitHub 仓库 → Actions 标签，查看具体的错误信息：

```
https://github.com/[username]/[repo]/actions
```

### 2. 常见失败原因及解决方案

#### ❌ **Secrets 配置问题**
**错误症状**: 
- `Error: Input required and not supplied: vercel-token`
- `DATABASE_URL is not defined`
- `Authentication failed`

**解决方案**:
```bash
# 检查必需的 Secrets 是否已配置
# 前往: Settings → Secrets and variables → Actions

必需的 Secrets:
✅ VERCEL_TOKEN
✅ VERCEL_ORG_ID  
✅ VERCEL_PROJECT_ID
✅ DATABASE_URL
✅ NEXTAUTH_SECRET
✅ NEXTAUTH_URL
✅ OAUTH_GITHUB_CLIENT_ID
✅ OAUTH_GITHUB_CLIENT_SECRET
```

#### ❌ **依赖安装失败**
**错误症状**:
- `npm ERR! network`
- `Error: Cannot find module`
- `peer dependency warnings`

**解决方案**:
```yaml
# 在工作流中添加更详细的日志
- name: Install dependencies
  run: |
    npm ci --verbose
    npm ls --depth=0
```

#### ❌ **TypeScript 类型错误**
**错误症状**:
- `tsc --noEmit` 失败
- `Type errors found`

**解决方案**:
```bash
# 本地检查类型错误
npx tsc --noEmit --skipLibCheck
```

#### ❌ **数据库连接失败**
**错误症状**:
- `Can't reach database server`
- `Connection refused`
- `Invalid connection string`

**解决方案**:
```yaml
# 在 CI 中使用测试数据库
env:
  DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/test_blog_db"
```

#### ❌ **构建失败**
**错误症状**:
- `next build` 失败
- `Module build failed`
- `Out of memory`

**解决方案**:
```yaml
# 增加内存限制
- name: Build application
  run: NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

#### ❌ **权限问题**
**错误症状**:
- `Permission denied`
- `GITHUB_TOKEN` 权限不足

**解决方案**:
```yaml
# 在工作流中添加必要权限
permissions:
  contents: read
  pull-requests: write
  actions: read
  security-events: write
```

## 🛠 调试工具

### 1. 本地验证脚本
创建并运行以下脚本来验证本地环境：

```bash
#!/bin/bash
echo "🔍 验证 GitHub Actions 环境..."

# 检查 Node.js 版本
echo "Node.js 版本: $(node --version)"
echo "npm 版本: $(npm --version)"

# 检查依赖
echo "检查 package.json..."
if [ -f "package.json" ]; then
  echo "✅ package.json 存在"
else
  echo "❌ package.json 不存在"
fi

# 检查 Prisma
echo "检查 Prisma 配置..."
npx prisma validate 2>/dev/null && echo "✅ Prisma schema 有效" || echo "❌ Prisma schema 无效"

# 检查 TypeScript
echo "检查 TypeScript..."
npx tsc --noEmit --skipLibCheck 2>/dev/null && echo "✅ TypeScript 类型检查通过" || echo "❌ TypeScript 类型错误"

# 检查构建
echo "检查构建..."
npm run build 2>/dev/null && echo "✅ 构建成功" || echo "❌ 构建失败"

echo "🎉 验证完成！"
```

### 2. 环境变量检查清单

**本地开发环境** (`.env.local`):
```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```

**GitHub Secrets** (注意变量名差异):
```bash
DATABASE_URL=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://your-app.vercel.app
OAUTH_GITHUB_CLIENT_ID=...
OAUTH_GITHUB_CLIENT_SECRET=...
```

### 3. 最小化测试工作流
如果所有工作流都失败，先创建一个最简单的测试：

```yaml
# .github/workflows/test.yml
name: Basic Test
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm --version
      - run: node --version
```

## 🚨 紧急修复

### 如果所有工作流都失败了：

1. **暂时禁用失败的工作流**:
   - 前往 `.github/workflows/`
   - 重命名文件扩展名 `.yml` → `.yml.disabled`

2. **逐个启用并测试**:
   - 先启用 `ci.yml`
   - 修复后再启用其他

3. **回滚到之前的工作版本**:
   ```bash
   git revert [commit-hash]
   ```

## 📋 详细错误分析

### CI 工作流失败
```bash
# 常见问题:
1. Node.js 版本不匹配
2. 依赖安装失败
3. TypeScript 错误
4. 测试数据库连接失败
```

### 部署工作流失败
```bash
# 常见问题:
1. Vercel Token 无效
2. 环境变量缺失
3. 构建过程失败
4. 数据库迁移失败
```

### 安全扫描失败
```bash
# 常见问题:
1. Snyk Token 配置错误（可选）
2. CodeQL 分析超时
3. 依赖漏洞警告（非致命）
```

## 💬 获取帮助

1. **查看具体错误信息**:
   - GitHub Actions 日志
   - 失败步骤的详细输出

2. **检查工作流语法**:
   ```bash
   # 使用 GitHub CLI 验证
   gh workflow view
   ```

3. **对比工作的配置**:
   - 检查其他成功的项目
   - 参考官方文档示例

提供具体的错误信息，我可以给出更精准的解决方案！ 