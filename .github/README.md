# GitHub Actions 工作流

本项目包含多个 GitHub Actions 工作流，用于自动化开发、测试、部署和维护流程。

## 🚀 工作流概览

### 1. CI (持续集成) - `ci.yml`
**触发条件**: Push 到主分支、PR 到主分支
**功能**:
- 代码质量检查 (ESLint)
- TypeScript 类型检查
- 构建测试
- 数据库 Schema 验证 (使用 PostgreSQL 16 服务)

### 2. 生产部署 - `deploy.yml`
**触发条件**: Push 到 main/master 分支
**功能**:
- 自动部署到 Vercel 生产环境
- 运行数据库迁移
- 支持条件种子数据 (commit message 包含 `[seed]`)

### 3. PR 预览部署 - `pr-preview.yml`
**触发条件**: PR 创建、更新、重新打开
**功能**:
- 为每个 PR 创建预览部署
- 自动在 PR 中评论预览链接
- 使用预览数据库环境

### 4. 安全扫描 - `security.yml`
**触发条件**: Push、PR、每周日定时
**功能**:
- 依赖安全扫描 (npm audit + Snyk)
- CodeQL 代码安全分析
- 密钥泄露检测 (TruffleHog)

### 5. 依赖更新 - `dependency-update.yml`
**触发条件**: 每周一定时、手动触发
**功能**:
- 自动更新依赖到最新版本
- 创建 PR 进行依赖更新
- Dependabot PR 自动合并 (非破坏性更新)

### 6. Dependabot 配置 - `dependabot.yml`
**功能**:
- 自动管理 npm 依赖更新
- 自动管理 GitHub Actions 更新
- 按 patch/minor/security 分组更新

## 🔧 配置要求

### GitHub Secrets
需要在 GitHub 仓库中配置以下 Secrets:

#### Vercel 部署
```
VERCEL_TOKEN          # Vercel API Token
VERCEL_ORG_ID         # Vercel 组织 ID
VERCEL_PROJECT_ID     # Vercel 项目 ID
```

#### 数据库
```
DATABASE_URL          # 生产数据库连接字符串
PREVIEW_DATABASE_URL  # 预览环境数据库连接字符串
```

#### 认证
```
NEXTAUTH_SECRET       # NextAuth.js 密钥
NEXTAUTH_URL          # 生产环境 URL
GITHUB_CLIENT_ID      # GitHub OAuth 客户端 ID
GITHUB_CLIENT_SECRET  # GitHub OAuth 客户端密钥
```

#### 安全扫描 (可选)
```
SNYK_TOKEN           # Snyk 安全扫描 Token
```

### GitHub Environments
创建 `production` 环境，并配置相应的保护规则。

## 📋 使用指南

### 部署到生产环境
1. 推送代码到 `main` 或 `master` 分支
2. CI 工作流自动运行
3. 通过后自动部署到 Vercel
4. 数据库迁移自动执行

### 预览部署
1. 创建 Pull Request
2. 系统自动创建预览部署
3. 预览链接会自动评论到 PR 中

### 手动触发依赖更新
1. 前往 Actions 标签页
2. 选择 "Dependency Updates" 工作流
3. 点击 "Run workflow"

### 强制种子数据
在 commit message 中包含 `[seed]` 标记，部署时会自动执行种子数据。

## 🔒 安全特性

- **依赖安全扫描**: 自动检测已知漏洞
- **代码安全分析**: GitHub CodeQL 分析
- **密钥检测**: 防止敏感信息泄露
- **自动化更新**: 及时修复安全漏洞

## 📊 监控和通知

- 所有工作流失败会发送邮件通知
- PR 预览部署状态实时更新
- 安全扫描结果在 Security 标签页查看
- 依赖更新自动创建 PR

## 🛠 自定义配置

### 修改构建环境
在各工作流的 `env` 部分调整环境变量。

### 调整安全扫描频率
修改 `security.yml` 中的 `cron` 表达式。

### 配置自动合并规则
在 `dependency-update.yml` 中调整自动合并逻辑。

## 📝 注意事项

1. **首次使用**: 确保所有必需的 Secrets 已配置
2. **数据库迁移**: 生产环境迁移前请确保备份
3. **环境隔离**: 预览环境使用独立的数据库
4. **安全扫描**: 建议启用 Snyk 获得更好的安全检测
5. **分支保护**: 建议为 main 分支启用保护规则 