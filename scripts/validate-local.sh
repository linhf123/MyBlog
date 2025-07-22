#!/bin/bash

# GitHub Actions 本地环境验证脚本
# 用于检查项目是否准备好运行 GitHub Actions

echo "🔍 GitHub Actions 本地环境验证"
echo "================================="
echo ""

# 检查 Node.js 环境
echo "📦 检查 Node.js 环境..."
echo "Node.js 版本: $(node --version)"
echo "npm 版本: $(npm --version)"
echo ""

# 检查项目文件
echo "📂 检查项目文件..."
files_to_check=(
  "package.json"
  "package-lock.json"
  "prisma/schema.prisma"
  "src/lib/prisma.ts"
  "src/lib/auth.ts"
  "src/lib/data.ts"
  ".env.example"
)

for file in "${files_to_check[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file - 文件不存在"
  fi
done
echo ""

# 检查环境变量
echo "🔧 检查环境变量..."
if [ -f ".env.local" ]; then
  echo "✅ .env.local 存在"
  
  # 检查必需的环境变量
  required_vars=(
    "DATABASE_URL"
    "NEXTAUTH_SECRET"
    "NEXTAUTH_URL"
    "GITHUB_CLIENT_ID"
    "GITHUB_CLIENT_SECRET"
  )
  
  for var in "${required_vars[@]}"; do
    if grep -q "^$var=" .env.local; then
      echo "✅ $var 已配置"
    else
      echo "❌ $var - 未配置或格式错误"
    fi
  done
else
  echo "❌ .env.local 不存在"
  echo "💡 请复制 .env.example 到 .env.local 并配置"
fi
echo ""

# 检查依赖
echo "📋 检查依赖..."
if npm list --depth=0 >/dev/null 2>&1; then
  echo "✅ 依赖完整"
else
  echo "❌ 依赖不完整，运行: npm install"
fi
echo ""

# 检查 Prisma
echo "🗄️ 检查 Prisma..."
if npx prisma validate >/dev/null 2>&1; then
  echo "✅ Prisma schema 有效"
else
  echo "❌ Prisma schema 无效"
fi

if npx prisma generate >/dev/null 2>&1; then
  echo "✅ Prisma 客户端生成成功"
else
  echo "❌ Prisma 客户端生成失败"
fi
echo ""

# 检查 TypeScript
echo "📝 检查 TypeScript..."
if npx tsc --noEmit --skipLibCheck >/dev/null 2>&1; then
  echo "✅ TypeScript 类型检查通过"
else
  echo "❌ TypeScript 类型错误"
  echo "💡 运行查看详细错误: npx tsc --noEmit"
fi
echo ""

# 检查 ESLint
echo "🔍 检查 ESLint..."
if npm run lint >/dev/null 2>&1; then
  echo "✅ ESLint 检查通过"
else
  echo "❌ ESLint 检查失败"
  echo "💡 运行查看详细错误: npm run lint"
fi
echo ""

# 检查构建
echo "🏗️ 检查构建..."
if npm run build >/dev/null 2>&1; then
  echo "✅ 构建成功"
else
  echo "❌ 构建失败"
  echo "💡 运行查看详细错误: npm run build"
fi
echo ""

# 检查数据库连接（如果配置了）
echo "🔌 检查数据库连接..."
if [ -f ".env.local" ] && grep -q "DATABASE_URL" .env.local; then
  # 尝试连接数据库
  if npm run db:generate >/dev/null 2>&1; then
    echo "✅ 数据库连接正常"
  else
    echo "⚠️ 数据库连接可能有问题"
    echo "💡 检查 DATABASE_URL 配置和数据库状态"
  fi
else
  echo "⚠️ 未配置数据库连接"
fi
echo ""

# 检查 GitHub Actions 工作流文件
echo "🎬 检查 GitHub Actions 工作流..."
workflow_files=(
  ".github/workflows/ci.yml"
  ".github/workflows/deploy.yml"
  ".github/workflows/pr-preview.yml"
  ".github/workflows/security.yml"
  ".github/workflows/dependency-update.yml"
  ".github/dependabot.yml"
)

for file in "${workflow_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file - 工作流文件不存在"
  fi
done
echo ""

# 总结
echo "📊 验证总结"
echo "============"
echo "如果看到任何 ❌ 标记，请先修复这些问题再运行 GitHub Actions。"
echo ""
echo "🚀 下一步:"
echo "1. 修复所有 ❌ 标记的问题"
echo "2. 提交代码到 GitHub"
echo "3. 配置 GitHub Secrets (参考 scripts/setup-github-actions.md)"
echo "4. 创建 Pull Request 测试工作流"
echo ""
echo "🎉 验证完成！" 