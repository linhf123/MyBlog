import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 确保DATABASE_URL存在
if (!process.env.DATABASE_URL) {
  // 在CI构建环境中，使用占位符URL而不是抛出错误
  if (process.env.CI === 'true' || process.env.NODE_ENV === 'test') {
    console.log('⚠️  No DATABASE_URL in CI environment, using placeholder');
    process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@localhost:5432/placeholder';
  } else {
    throw new Error(
      'DATABASE_URL is not defined. Please check your environment variables.'
    )
  }
}

// 创建Prisma客户端实例
function createPrismaClient() {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query'] : [],
      // 在CI环境中禁用某些功能以避免连接错误
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });
  } catch (error) {
    console.error('❌ Failed to create Prisma client:', error);
    
    // 在CI环境中，创建一个mock客户端以避免构建失败
    if (process.env.CI === 'true' || process.env.NODE_ENV === 'test') {
      console.log('⚠️  Creating placeholder Prisma client for CI environment');
      // 返回一个基本的Prisma客户端，即使连接会失败
      return new PrismaClient({
        log: [],
        datasources: {
          db: {
            url: process.env.DATABASE_URL
          }
        }
      });
    }
    
    throw error;
  }
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 