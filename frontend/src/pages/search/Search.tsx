import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 模拟搜索数据
  const allContent = [
    {
      id: 1,
      type: 'course',
      title: 'React 从入门到精通',
      description: '深度学习 React 框架，包括 Hooks、Context、状态管理等核心概念',
      instructor: '张教授',
      rating: 4.8,
      students: 12345,
      image: '⚛️',
      tags: ['React', 'JavaScript', '前端'],
      price: 'FREE',
      duration: '24小时'
    },
    {
      id: 2,
      type: 'course',
      title: 'Python 数据科学实战',
      description: '使用 Python 进行数据分析、可视化和机器学习，适合零基础学员',
      instructor: '李博士',
      rating: 4.9,
      students: 8901,
      image: '🐍',
      tags: ['Python', '数据科学', '机器学习'],
      price: '¥299',
      duration: '32小时'
    },
    {
      id: 3,
      type: 'article',
      title: 'JavaScript 异步编程深度解析',
      description: '深入探讨 JavaScript 中的异步编程模式，从回调函数到 Promise',
      author: '前端专家',
      readTime: '15分钟',
      likes: 324,
      views: 1520,
      tags: ['JavaScript', '异步编程', 'Promise']
    },
    {
      id: 4,
      type: 'course',
      title: 'UI/UX 设计思维训练',
      description: '系统学习用户体验设计方法论，提升设计思维和实践能力',
      instructor: '王设计师',
      rating: 4.7,
      students: 15678,
      image: '🎨',
      tags: ['UI设计', 'UX设计', '用户体验'],
      price: '¥199',
      duration: '18小时'
    },
    {
      id: 5,
      type: 'article',
      title: 'Vue.js 3.0 新特性详解',
      description: 'Vue.js 3.0 带来了许多激动人心的新特性，让我们一起探索',
      author: 'Vue 开发者',
      readTime: '12分钟',
      likes: 256,
      views: 980,
      tags: ['Vue.js', '前端框架', 'JavaScript']
    }
  ];

  const filters = [
    { id: 'all', name: '全部', icon: '🔍' },
    { id: 'course', name: '课程', icon: '📚' },
    { id: 'article', name: '文章', icon: '📝' },
    { id: 'video', name: '视频', icon: '🎥' },
    { id: 'project', name: '项目', icon: '💻' }
  ];

  const sortOptions = [
    { id: 'relevance', name: '相关度' },
    { id: 'newest', name: '最新发布' },
    { id: 'rating', name: '评分最高' },
    { id: 'popular', name: '最受欢迎' }
  ];

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query, filter, sortBy]);

  const performSearch = (searchQuery: string) => {
    setLoading(true);
    // 模拟搜索延迟
    setTimeout(() => {
      let filteredResults = allContent.filter(item => {
        const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesFilter = filter === 'all' || item.type === filter;
        
        return matchesQuery && matchesFilter;
      });

      // 简单排序
      if (sortBy === 'rating') {
        filteredResults.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      } else if (sortBy === 'popular') {
        filteredResults.sort((a, b) => (b.students || b.views || 0) - (a.students || a.views || 0));
      }

      setResults(filteredResults);
      setLoading(false);
    }, 500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      performSearch(query.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索课程、文章、项目..."
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {query && (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                搜索结果："{query}"
              </h1>
              <p className="text-gray-600">
                找到 {results.length} 个相关结果
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">筛选条件</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">内容类型</label>
                  <div className="space-y-2">
                    {filters.map((filterOption) => (
                      <button
                        key={filterOption.id}
                        onClick={() => setFilter(filterOption.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                          filter === filterOption.id
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span>{filterOption.icon}</span>
                        <span>{filterOption.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">排序方式</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">快速操作</h3>
              <div className="space-y-3">
                <Link
                  to="/courses"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 block text-center"
                >
                  浏览全部课程
                </Link>
                <Link
                  to="/publish"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 block text-center"
                >
                  发布内容
                </Link>
                <Link
                  to="/ai-chat"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 block text-center"
                >
                  AI 学习助手
                </Link>
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 mt-4">搜索中...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-6">
                {results.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      {item.type === 'course' && (
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl flex-shrink-0">
                          {item.image}
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.type === 'course' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {item.type === 'course' ? '课程' : '文章'}
                          </span>
                          
                          {item.rating && (
                            <div className="flex items-center">
                              <span className="text-yellow-400">⭐</span>
                              <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                          <Link to={`/content/${item.id}`}>
                            {item.title}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <span>
                            👨‍🏫 {item.instructor || item.author}
                          </span>
                          {item.duration && <span>⏱️ {item.duration}</span>}
                          {item.readTime && <span>📖 {item.readTime}</span>}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.slice(0, 3).map((tag: string, index: number) => (
                            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          {item.type === 'course' ? (
                            <div className="flex items-center space-x-4">
                              <span className="text-lg font-bold text-gray-900">{item.price}</span>
                              <span className="text-sm text-gray-500">{item.students?.toLocaleString()} 学员</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-gray-500">❤️ {item.likes}</span>
                              <span className="text-sm text-gray-500">👁️ {item.views}</span>
                            </div>
                          )}
                          
                          <Link
                            to={`/content/${item.id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            {item.type === 'course' ? '查看课程' : '阅读文章'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">未找到相关内容</h3>
                <p className="text-gray-600 mb-6">
                  尝试使用不同的关键词，或者浏览我们的推荐内容
                </p>
                <div className="space-x-4">
                  <Link
                    to="/courses"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    浏览课程
                  </Link>
                  <button
                    onClick={() => {
                      setQuery('');
                      setResults([]);
                    }}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    清除搜索
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">开始搜索</h3>
                <p className="text-gray-600 mb-6">
                  在上方搜索框中输入关键词，发现感兴趣的课程和内容
                </p>
                <div className="grid md:grid-cols-3 gap-4 max-w-md mx-auto">
                  <button
                    onClick={() => setQuery('React')}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    React
                  </button>
                  <button
                    onClick={() => setQuery('Python')}
                    className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Python
                  </button>
                  <button
                    onClick={() => setQuery('设计')}
                    className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    设计
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
