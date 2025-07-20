export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  userId?: string; // Optional link to User
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: {
    name: string;
    email: string;
    image?: string;
  };
  userId?: string; // Database user ID
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
} 