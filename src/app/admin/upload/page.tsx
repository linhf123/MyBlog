'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  // 检查用户是否为管理员
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (session?.user) {
        try {
          const response = await fetch('/api/auth/check-admin');
          const result = await response.json();
          console.log('result', result);
          setIsAdmin(result.isAdmin);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setChecking(false);
    };

    if (status !== 'loading') {
      checkAdminStatus();
    }
  }, [session, status]);

  // 如果未登录，重定向到首页
  if (status === 'loading' || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    router.push('/');
    return null;
  }

  // 如果不是管理员，显示权限不足页面
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">权限不足</h1>
            <p className="text-gray-600 mb-4">
              抱歉，您没有权限访问此页面。只有管理员可以上传文章。
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage(null);
      
      // 读取文件内容用于预览
      try {
        const content = await selectedFile.text();
        setPreview(content);
             } catch {
         setMessage({ type: 'error', text: '无法读取文件内容' });
       }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: 'error', text: '请选择一个 Markdown 文件' });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/posts/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `文章上传成功！标题：${result.post.title}` });
        setFile(null);
        setPreview('');
        // 3秒后跳转到文章页面
        setTimeout(() => {
          router.push(`/posts/${result.post.id}`);
        }, 3000);
      } else {
        setMessage({ type: 'error', text: result.error || '上传失败' });
      }
         } catch {
       setMessage({ type: 'error', text: '网络错误，请稍后重试' });
     } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">上传 Markdown 文章</h1>
          
          {/* 文件上传区域 */}
          <div className="mb-6">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
              选择 Markdown 文件
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>上传文件</span>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".md"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">或拖拽到此处</p>
                </div>
                <p className="text-xs text-gray-500">仅支持 .md 文件</p>
              </div>
            </div>
          </div>

          {/* 文件信息 */}
          {file && (
            <div className="mb-6 p-4 bg-blue-50 rounded-md">
              <h3 className="text-sm font-medium text-blue-800 mb-2">已选择文件</h3>
              <p className="text-sm text-blue-600">文件名: {file.name}</p>
              <p className="text-sm text-blue-600">大小: {(file.size / 1024).toFixed(1)} KB</p>
            </div>
          )}

          {/* 消息提示 */}
          {message && (
            <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message.text}
            </div>
          )}

          {/* 上传按钮 */}
          <div className="mb-6">
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {uploading ? '上传中...' : '上传文章'}
            </button>
          </div>

          {/* 预览区域 */}
          {preview && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">文件预览</h3>
              <div className="bg-gray-50 p-4 rounded-md max-h-96 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">{preview}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 