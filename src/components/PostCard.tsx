import Link from 'next/link';
import { format } from 'date-fns';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
  index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className="block">
      <article className="bg-white/90 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-white/30 p-8 group relative will-change-transform cursor-pointer">
        {/* 文章头部 */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200 leading-tight mb-3">
              {post.title}
            </h2>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-medium text-xs">
                  {post.author.charAt(0)}
                </div>
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                </svg>
                <span className="text-indigo-600 font-medium">
                  {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>
          
          {/* 装饰性数字 */}
          <div className="text-6xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors duration-200 select-none">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
        
        {/* 文章摘要 */}
        <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-700 transition-colors duration-200">
          {post.excerpt}
        </p>
        
        {/* 底部操作区 */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-sm">阅读</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm">评论</span>
            </div>
          </div>
          
          {/* 阅读提示 */}
          <div className="inline-flex items-center space-x-2 text-indigo-600 group-hover:text-indigo-800 font-medium text-sm transition-colors duration-200">
            <span>阅读全文</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
        
        {/* 悬停效果装饰 - 简化版 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-t-2xl"></div>
      </article>
    </Link>
  );
} 