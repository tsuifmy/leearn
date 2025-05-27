import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-9xl mb-4">🔍</div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">页面未找到</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            抱歉，您访问的页面不存在。可能是链接错误或页面已被移动。
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            返回首页
          </Link>
          
          <div className="text-sm text-gray-500">
            或者尝试以下链接：
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link 
              to="/courses"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              浏览课程
            </Link>
            <Link 
              to="/learning"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              我的学习
            </Link>
            <Link 
              to="/ai-chat"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              AI助手
            </Link>
            <Link 
              to="/profile"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              个人中心
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-xs text-gray-400">
          如果问题持续存在，请联系我们的技术支持团队
        </div>
      </div>
    </div>
  );
};

export default NotFound;
