import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { getPostById } from '@/lib/data';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Comments from '@/components/Comments';

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 返回导航 */}
      <div className="animate-fade-in">
        <Link 
          href="/"
          className="group inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium transition-all duration-300"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>返回首页</span>
        </Link>
      </div>

      {/* 文章内容 */}
      <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 p-8 lg:p-12 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
        {/* 文章头部 */}
        <header className="mb-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
              {post.title}
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {post.author.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-800">{post.author}</div>
                  <div className="text-sm text-gray-500">作者</div>
                </div>
              </div>
              
              <div className="w-px h-8 bg-gray-200"></div>
              
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="text-left">
                  <div className="font-semibold text-indigo-600">
                    {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                  </div>
                  <div className="text-sm text-gray-500">发布日期</div>
                </div>
              </div>
              
              <div className="w-px h-8 bg-gray-200"></div>
              
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-left">
                  <div className="font-semibold text-gray-800">5 分钟</div>
                  <div className="text-sm text-gray-500">阅读时间</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 分隔线 */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10"></div>

        {/* 文章正文 */}
        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* 文章底部 */}
        <footer className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 text-sm">分享文章:</span>
              <div className="flex items-center space-x-2">
                <button className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="sr-only">分享到 Twitter</span>
                  <span className="text-sm font-bold">T</span>
                </button>
                <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="sr-only">分享到 Facebook</span>
                  <span className="text-sm font-bold">f</span>
                </button>
                <button className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="sr-only">分享到微信</span>
                  <span className="text-sm font-bold">微</span>
                </button>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              最后更新: {format(new Date(post.updatedAt), 'MMMM d, yyyy')}
            </div>
          </div>
        </footer>
      </article>

      {/* 评论区 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 p-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
        <Comments postId={post.id} />
      </div>
    </div>
  );
}

// 生成静态参数
export async function generateStaticParams() {
  const posts = await import('@/lib/data').then(module => module.getPosts());
  
  return posts.map((post) => ({
    id: post.id,
  }));
} 