import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Courses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: '全部', icon: '📚' },
    { id: 'programming', name: '编程开发', icon: '💻' },
    { id: 'design', name: '设计创意', icon: '🎨' },
    { id: 'business', name: '商业管理', icon: '💼' },
    { id: 'language', name: '语言学习', icon: '🌍' },
    { id: 'science', name: '科学技术', icon: '🔬' }
  ];

  const levels = [
    { id: 'all', name: '全部级别' },
    { id: 'beginner', name: '初级' },
    { id: 'intermediate', name: '中级' },
    { id: 'advanced', name: '高级' }
  ];

  const courses = [
    {
      id: 1,
      title: 'React 从入门到精通',
      description: '深度学习 React 框架，包括 Hooks、Context、状态管理等核心概念',
      instructor: '张教授',
      category: 'programming',
      level: 'intermediate',
      duration: '24 小时',
      students: 12345,
      rating: 4.8,
      price: 'FREE',
      image: '⚛️',
      tags: ['React', 'JavaScript', '前端'],
      featured: true
    },
    {
      id: 2,
      title: 'Python 数据科学实战',
      description: '使用 Python 进行数据分析、可视化和机器学习，适合零基础学员',
      instructor: '李博士',
      category: 'programming',
      level: 'beginner',
      duration: '32 小时',
      students: 8901,
      rating: 4.9,
      price: '¥299',
      image: '🐍',
      tags: ['Python', '数据科学', '机器学习'],
      featured: false
    },
    {
      id: 3,
      title: 'UI/UX 设计思维训练',
      description: '系统学习用户体验设计方法论，提升设计思维和实践能力',
      instructor: '王设计师',
      category: 'design',
      level: 'beginner',
      duration: '18 小时',
      students: 15678,
      rating: 4.7,
      price: '¥199',
      image: '🎨',
      tags: ['UI设计', 'UX设计', '用户体验'],
      featured: true
    },
    {
      id: 4,
      title: 'Node.js 后端开发',
      description: '学习使用 Node.js 构建高性能后端应用，包括 Express、数据库操作等',
      instructor: '陈工程师',
      category: 'programming',
      level: 'intermediate',
      duration: '28 小时',
      students: 6543,
      rating: 4.6,
      price: '¥399',
      image: '🚀',
      tags: ['Node.js', '后端开发', 'Express'],
      featured: false
    },
    {
      id: 5,
      title: '商业数据分析',
      description: '掌握商业数据分析技能，学会用数据驱动商业决策',
      instructor: '刘分析师',
      category: 'business',
      level: 'intermediate',
      duration: '20 小时',
      students: 4321,
      rating: 4.5,
      price: '¥259',
      image: '📊',
      tags: ['数据分析', '商业智能', 'Excel'],
      featured: false
    },
    {
      id: 6,
      title: '英语口语进阶',
      description: '提升英语口语能力，掌握日常交流和商务英语技巧',
      instructor: 'Sarah 老师',
      category: 'language',
      level: 'intermediate',
      duration: '30 小时',
      students: 9876,
      rating: 4.8,
      price: '¥188',
      image: '🗣️',
      tags: ['英语', '口语', '商务英语'],
      featured: false
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const featuredCourses = courses.filter(course => course.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              探索无限知识
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              精选优质课程，助你在学习路上更进一步
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索课程、讲师或技能..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-lg rounded-full text-gray-900 border-0 focus:ring-4 focus:ring-blue-300 focus:outline-none"
              />
              <button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {featuredCourses.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🌟 精选课程
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <Link 
                  key={course.id}
                  to={`/content/${course.id}`}
                  className="group block"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-yellow-200">
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-t-2xl flex items-center justify-center text-6xl">
                        {course.image}
                      </div>
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        精选
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {levels.find(l => l.id === course.level)?.name}
                        </span>
                        <div className="flex items-center">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>👨‍🏫 {course.instructor}</span>
                        <span>⏱️ {course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">{course.price}</span>
                        <span className="text-sm text-gray-500">{course.students.toLocaleString()} 学员</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters and Course List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">课程分类</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                      }`}
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">难度级别</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {levels.map((level) => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              全部课程 ({filteredCourses.length})
            </h2>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>最新发布</option>
              <option>评分最高</option>
              <option>学员最多</option>
              <option>价格最低</option>
            </select>
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Link 
                key={course.id}
                to={`/content/${course.id}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-2xl flex items-center justify-center text-6xl">
                    {course.image}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {levels.find(l => l.id === course.level)?.name}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>👨‍🏫 {course.instructor}</span>
                      <span>⏱️ {course.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">{course.price}</span>
                      <span className="text-sm text-gray-500">{course.students.toLocaleString()} 学员</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">未找到相关课程</h3>
              <p className="text-gray-600 mb-6">尝试调整搜索条件或浏览其他分类</p>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                  setSearchTerm('');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                重置筛选条件
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
