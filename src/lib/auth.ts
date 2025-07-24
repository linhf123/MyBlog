import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
})

// 检查用户是否为管理员
export function isAdmin(userEmail: string | null | undefined, userId: string | null | undefined): boolean {
  if (!userEmail && !userId) return false;
  
  // 从环境变量中获取管理员配置
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];
  const adminUserIds = process.env.ADMIN_USER_IDS?.split(',').map(id => id.trim()) || [];
  
  console.log('adminEmails', userEmail, adminEmails);
  // 检查邮箱是否在管理员列表中
  if (userEmail && adminEmails.includes(userEmail)) {
    return true;
  }
  
  // 检查用户ID是否在管理员列表中
  if (userId && adminUserIds.includes(userId)) {
    return true;
  }
  
  return false;
}

// 服务端检查当前用户是否为管理员
export async function isCurrentUserAdmin(): Promise<boolean> {
  const session = await auth();
  console.log('session', session);
  if (!session?.user) return false;
  
  return isAdmin(session.user.email, session.user.id);
} 