import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [newComment, setNewComment] = useState('');
  
  // 模拟内容数据
  const content = {
    id: id || '1',
    title: 'JavaScript 异步编程深度解析',
    author: {
      name: '张教授',
      avatar: '👨‍🏫',
      title: '前端架构师',
      followers: '12.5K'
    },
    publishDate: '2024-01-15',
    readTime: '15 分钟',
    tags: ['JavaScript', '异步编程', 'Promise', 'async/await'],
    content: `
      在现代 JavaScript 开发中，异步编程是一个核心概念。本文将深入探讨 JavaScript 中的异步编程模式，
      从回调函数到 Promise，再到 async/await 语法糖。
      
      ## 什么是异步编程？
      
      异步编程允许程序在等待某些操作完成时继续执行其他任务，而不会阻塞主线程。这对于处理网络请求、
      文件操作、定时器等耗时操作至关重要。
      
      ## Promise 的工作原理
      
      Promise 是 JavaScript 中处理异步操作的一种更优雅的方式...
    `,
    likes: 324,
    views: 1520,
    comments: [
      {
        id: 1,
        author: '学习者小李',
        avatar: '👩‍💻',
        content: '这篇文章讲得太好了！终于理解了 Promise 的工作原理。',
        time: '2 小时前',
        likes: 12
      },
      {
        id: 2,
        author: '前端新手',
        avatar: '🧑‍💻',
        content: '请问有没有相关的实战项目可以练习？',
        time: '1 天前',
        likes: 8
      }
    ]
  };

  // 相关推荐课程数据
  const relatedCourses = [
    {
      id: 2,
      title: 'TypeScript 进阶开发',
      instructor: '王老师',
      rating: 4.7,
      image: '📘',
      price: 'FREE',
      students: 5432
    },
    {
      id: 3,
      title: 'Vue.js 核心概念',
      instructor: '李老师',
      rating: 4.6,
      image: '💚',
      price: '¥199',
      students: 7890
    },
    {
      id: 4,
      title: 'Node.js 后端开发',
      instructor: '陈老师',
      rating: 4.8,
      image: '🚀',
      price: '¥299',
      students: 3456
    }
  ];

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // 这里应该调用 API 提交评论
      console.log('提交评论:', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-blue-600">首页</Link>
            <span className="mx-2">›</span>
            <Link to="/courses" className="hover:text-blue-600">课程</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">内容详情</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {content.title}
          </h1>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xl mr-3">
                  {content.author.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{content.author.name}</div>
                  <div className="text-sm text-gray-600">{content.author.title} • {content.author.followers} 关注者</div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <span>{content.publishDate}</span>
                <span className="mx-2">•</span>
                <span>{content.readTime}</span>
                <span className="mx-2">•</span>
                <span>{content.views} 次阅读</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                  liked 
                    ? 'bg-red-50 border-red-200 text-red-600' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600'
                }`}
              >
                <span>{liked ? '❤️' : '🤍'}</span>
                <span>{content.likes + (liked ? 1 : 0)}</span>
              </button>
              
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full border transition-all duration-200 ${
                  bookmarked 
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-600' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-yellow-200 hover:text-yellow-600'
                }`}
              >
                <span>{bookmarked ? '🔖' : '📑'}</span>
              </button>
              
              <button className="p-2 rounded-full border border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600 transition-all duration-200">
                <span>📤</span>
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {content.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="prose max-w-none">
            {content.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim().startsWith('##')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                    {paragraph.replace('##', '').trim()}
                  </h2>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6">
                    {paragraph.trim()}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            评论 ({content.comments.length})
          </h3>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                你
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="写下你的想法..."
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    发布评论
                  </button>
                </div>
              </div>
            </div>
          </form>
          
          {/* Comments List */}
          <div className="space-y-6">
            {content.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                  {comment.avatar}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{comment.author}</span>
                      <span className="text-sm text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 ml-4">
                    <button className="text-sm text-gray-500 hover:text-red-600 transition-colors">
                      👍 {comment.likes}
                    </button>
                    <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                      回复
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Courses */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            相关推荐
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((course) => (
              <Link 
                key={course.id}
                to={`/content/${course.id}`}
                className="group block"
              >
                <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
                      {course.image}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-sm text-gray-600">👨‍🏫 {course.instructor}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-gray-600">{course.rating}</span>
                    </div>
                    <div className="text-gray-500">
                      {course.students.toLocaleString()} 学员
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{course.price}</span>
                      <span className="text-xs text-blue-600 group-hover:text-blue-700">
                        立即学习 →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
