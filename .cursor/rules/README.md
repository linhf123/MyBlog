# Cursor Rules for Blog Project

这些规则基于我们刚刚完成的 PostgreSQL 博客项目实现而创建，帮助维护代码质量和一致性。

## 规则列表

### 1. `project-structure.mdc` (Always Applied)
- **作用**: 总是应用，为所有文件提供项目结构指导
- **内容**: 项目架构、目录结构、数据流、核心功能概述
- **适用**: 所有文件

### 2. `database-patterns.mdc`
- **作用**: 数据库操作模式和最佳实践
- **适用文件**: `**/lib/data.ts`, `**/api/**/*.ts`, `scripts/*.ts`
- **内容**: Prisma 使用模式、CRUD 操作、错误处理、npm 脚本

### 3. `auth-patterns.mdc`
- **作用**: NextAuth.js 认证模式
- **适用文件**: `**/api/**/*.ts`, `**/lib/auth.ts`, `**/components/**/*.tsx`
- **内容**: 服务器端认证、客户端会话、环境变量、数据库架构

### 4. `api-routes.mdc`
- **作用**: API 路由标准结构和模式
- **适用文件**: `**/api/**/*.ts`
- **内容**: 标准结构、认证检查、错误处理、现有路由

### 5. `typescript-patterns.mdc`
- **作用**: TypeScript 类型定义和使用模式
- **适用文件**: `**/*.ts`, `**/*.tsx`
- **内容**: 类型定义、导入模式、组件 Props、异步函数返回类型

### 6. `development-workflow.mdc`
- **作用**: 开发工作流和最佳实践（手动触发）
- **适用**: 需要时手动应用
- **内容**: 环境设置、开发命令、代码质量指导、调试技巧

## 使用方式

- **自动应用**: `project-structure.mdc` 会自动应用到所有文件
- **文件类型触发**: 其他规则根据文件类型和路径自动触发
- **手动触发**: `development-workflow.mdc` 通过描述手动引用

## 规则更新

随着项目发展，可以：
1. 修改现有规则以反映新的模式
2. 添加新规则覆盖特定功能
3. 调整 `globs` 模式以匹配新的文件结构

## 规则格式

每个规则文件使用 Markdown 格式，包含：
- **Frontmatter**: 控制规则应用方式
- **文档**: 模式说明和代码示例
- **引用**: 使用 `[filename.ext](mdc:filename.ext)` 引用项目文件 