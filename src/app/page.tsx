import { getPosts } from '@/lib/data';
import PostCard from '@/components/PostCard';

export default async function Home() {
  const posts = await getPosts();
  
  return (
    <div className="space-y-12">
      {/* 页面标题 */}
      <div className="text-center py-16 animate-fade-in-up">
        <div className="relative max-w-4xl mx-auto">
          {/* 装饰性背景元素 */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
          <div className="absolute -top-10 left-1/4 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-30 animate-float"></div>
          <div className="absolute -top-10 right-1/4 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-25 animate-float" style={{animationDelay: '1s'}}></div>
          
          <div className="relative z-10">
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 animate-fade-in-up">
              欢迎来到我的博客
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              在这里我分享关于
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold"> 技术、生活和学习 </span>
              的内容
            </p>
            <p className="text-lg text-gray-500 mt-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              🚀 支持 GitHub 登录 • 💬 实时评论 • 📱 响应式设计
            </p>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 p-6 text-center transform hover:scale-[1.02] hover:-translate-y-1">
          <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">{posts.length}</div>
          <div className="text-gray-600 font-medium">篇文章</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 p-6 text-center transform hover:scale-[1.02] hover:-translate-y-1">
          <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">∞</div>
          <div className="text-gray-600 font-medium">种可能</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 p-6 text-center transform hover:scale-[1.02] hover:-translate-y-1">
          <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">💖</div>
          <div className="text-gray-600 font-medium">用心分享</div>
        </div>
      </div>

      {/* 文章列表标题 */}
      <div className="text-center animate-fade-in-up" style={{animationDelay: '0.8s'}}>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">最新文章</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* 文章列表 */}
      <div className="grid gap-8 lg:gap-10">
        {posts.map((post, index) => (
          <div 
            key={post.id}
            className="animate-fade-in-up"
            style={{
              animationDelay: `${1 + index * 0.1}s`,
              animationFillMode: 'backwards'
            }}
          >
            <PostCard post={post} index={index} />
          </div>
        ))}
      </div>

      {/* 空状态 */}
      {posts.length === 0 && (
        <div className="text-center py-20 animate-fade-in-up">
          <div className="relative">
            <div className="text-8xl mb-6 opacity-30 animate-float">📝</div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full blur-3xl opacity-10"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-400 mb-4">暂无文章</h3>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            正在努力创作中，敬请期待更多精彩内容...
          </p>
        </div>
      )}

      {/* 底部装饰 */}
      <div className="text-center py-16 animate-fade-in-up" style={{animationDelay: '1.5s'}}>
        <div className="flex items-center justify-center space-x-4 text-gray-400">
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
          <span className="text-sm font-medium">感谢您的阅读</span>
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
