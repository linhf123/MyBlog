import Link from 'next/link';
import { format } from 'date-fns';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
  index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 p-8 group transform hover:scale-[1.02] hover:-translate-y-1 relative">
      {/* 文章头部 */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <Link href={`/posts/${post.id}`}>
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-blue-600 transition-all duration-300 leading-tight">
              {post.title}
            </h2>
          </Link>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-medium text-xs">
                {post.author.charAt(0)}
              </div>
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-indigo-600 font-medium">
                {format(new Date(post.createdAt), 'MMMM d, yyyy')}
              </span>
            </div>
          </div>
        </div>
        
        {/* 装饰性数字 */}
        <div className="text-6xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors duration-300 select-none">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
      
      {/* 文章摘要 */}
      <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
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
        
        <Link 
          href={`/posts/${post.id}`}
          className="group/btn inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-all duration-300"
        >
          <span>阅读全文</span>
          <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
      
      {/* 悬停效果装饰 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl"></div>
    </article>
  );
} 