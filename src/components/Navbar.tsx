'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  // 检查用户是否为管理员
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (session?.user) {
        try {
          const response = await fetch('/api/auth/check-admin');
          const result = await response.json();
          setIsAdmin(result.isAdmin);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    if (status !== 'loading') {
      checkAdminStatus();
    }
  }, [session, status]);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600/95 via-purple-600/95 to-blue-600/95 backdrop-blur-xl shadow-xl border-b border-white/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 animate-float">
              <span className="text-2xl">✨</span>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-indigo-100 transition-colors duration-300">
              我的博客
            </span>
          </Link>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="flex items-center space-x-2 text-indigo-100">
                <div className="w-4 h-4 bg-white/20 rounded-full animate-pulse-slow"></div>
                <span>加载中...</span>
              </div>
            ) : session ? (
              <div className="flex items-center space-x-4 animate-slide-in-left">
                <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
                  {session.user?.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-10 h-10 rounded-full ring-2 ring-white/30 shadow-lg hover:ring-white/50 transition-all duration-300"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-sm leading-tight">{session.user?.name}</span>
                    <span className="text-indigo-100/70 text-xs">已登录</span>
                  </div>
                </div>
                {isAdmin && (
                  <Link
                    href="/admin/upload"
                    className="flex items-center px-4 py-2 text-white hover:text-indigo-100 hover:bg-white/10 rounded-lg font-medium transition-all duration-200 border border-white/20 hover:border-white/30"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    上传
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200 text-white hover:text-indigo-100 hover:bg-white/10 border border-white/20 hover:border-white/30"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  登出
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('github')}
                className="group flex items-center space-x-3 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="group-hover:text-indigo-100 transition-colors duration-300">GitHub 登录</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 