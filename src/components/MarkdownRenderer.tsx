interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderMarkdown = (text: string) => {
    // 增强的 Markdown 渲染器
    let html = text
      // 标题
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4 text-gray-800 border-l-4 border-indigo-400 pl-6 py-2 bg-gradient-to-r from-indigo-50 to-transparent rounded-r-lg">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6 text-gray-800 border-l-4 border-purple-500 pl-6 py-3 bg-gradient-to-r from-purple-50 to-transparent rounded-r-lg">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-8 text-gradient-secondary text-center py-4 border-b-2 border-gradient-to-r from-indigo-500 to-purple-500">$1</h1>')
      // 粗体
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded">$1</strong>')
      // 斜体
      .replace(/\*(.*?)\*/gim, '<em class="italic text-purple-600">$1</em>')
      // 列表项
      .replace(/^- (.*$)/gim, '<li class="ml-8 mb-3 text-gray-700 relative flex items-start"><span class="absolute -left-6 top-2 w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span><span class="leading-relaxed">$1</span></li>')
      // 链接
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-indigo-600 hover:text-indigo-800 font-medium underline decoration-2 decoration-indigo-200 hover:decoration-indigo-400 transition-all duration-200" target="_blank" rel="noopener noreferrer">$1</a>')
      // 代码块（行内）
      .replace(/`([^`]+)`/gim, '<code class="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-1 rounded-lg text-sm font-mono border border-indigo-200 shadow-sm">$1</code>')
      // 代码块（多行）
      .replace(/```([^`]+)```/gim, '<pre class="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6 rounded-xl my-6 overflow-x-auto shadow-lg border border-gray-700"><code class="font-mono text-sm leading-relaxed">$1</code></pre>')
      // 引用
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-400 bg-gradient-to-r from-indigo-50 to-transparent pl-6 py-4 my-6 italic text-gray-700 rounded-r-lg shadow-sm">$1</blockquote>')
      // 分隔线
      .replace(/^---$/gim, '<hr class="my-8 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent">')
      // 换行
      .replace(/\n\n/gim, '</p><p class="mb-4 leading-relaxed text-gray-700">')
      .replace(/\n/gim, '<br />');

    // 包装段落
    html = '<p class="mb-4 leading-relaxed text-gray-700">' + html + '</p>';
    
    // 清理空段落
    html = html.replace(/<p[^>]*><\/p>/g, '');
    
    return html;
  };

  return (
    <div className="prose prose-lg max-w-none">
      <div 
        className="text-gray-700 leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      />
      
      {/* 阅读进度指示器 */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <div className="flex items-center justify-center space-x-2 text-gray-400">
          <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          <span className="text-sm font-medium ml-4">阅读完毕</span>
        </div>
      </div>
    </div>
  );
} 