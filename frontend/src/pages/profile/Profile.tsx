import React, { useState } from 'react';
import LearningScene3D from '../../components/LearningScene3D';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  
  // 模拟用户数据
  const user = {
    name: '李学习',
    email: 'lixuexi@example.com',
    avatar: '👨‍🎓',
    title: '前端开发工程师',
    bio: '热爱学习新技术，专注于前端开发和用户体验设计。希望通过学乐无穷平台不断提升自己的技能。',
    location: '上海, 中国',
    joinDate: '2023年12月',
    stats: {
      coursesCompleted: 12,
      hoursLearned: 156,
      streak: 15,
      points: 2450
    },
    interests: ['JavaScript', 'React', 'Vue.js', 'Node.js', 'TypeScript', 'UI设计'],
    achievements: [
      { name: '学习新手', icon: '🎯', description: '完成第一门课程' },
      { name: '坚持不懈', icon: '🔥', description: '连续学习15天' },
      { name: '知识分享者', icon: '📚', description: '发布了第一篇文章' },
      { name: '社区活跃', icon: '💬', description: '获得100个赞' }
    ],
    recentCourses: [
      { name: 'React 进阶开发', progress: 85, lastAccessed: '今天' },
      { name: 'TypeScript 实战', progress: 60, lastAccessed: '昨天' },
      { name: 'Vue.js 核心概念', progress: 100, lastAccessed: '3天前' }
    ]
  };

  const tabs = [
    { id: 'overview', name: '概览', icon: '📊' },
    { id: 'courses', name: '学习进度', icon: '📚' },
    { id: 'achievements', name: '成就', icon: '🏆' },
    { id: 'settings', name: '设置', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* 3D Learning Scene */}
      <div className="relative h-96 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Stars Background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.6 + 0.2
              }}
            ></div>
          ))}
        </div>
        
        {/* Three.js 3D Scene */}
        <div className="relative h-full">
          <LearningScene3D className="absolute inset-0" />
        </div>
        
        {/* Floating UI Elements with enhanced styling */}
        <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md rounded-xl p-4 text-white transform hover:scale-105 transition-all duration-300 animate-float border border-white/20 shadow-2xl">
          <div className="text-sm opacity-80 mb-1">当前状态</div>
          <div className="text-lg font-bold flex items-center">
            专注学习中 
            <span className="ml-2 animate-bounce">🎯</span>
          </div>
        </div>
        
        <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md rounded-xl p-4 text-white transform hover:scale-105 transition-all duration-300 animate-float border border-white/20 shadow-2xl" 
             style={{ animationDelay: '1s' }}>
          <div className="text-sm opacity-80 mb-1">学习时长</div>
          <div className="text-lg font-bold flex items-center">
            2小时 30分钟
            <span className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></span>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all duration-300 animate-float border border-white/20 shadow-2xl"
             style={{ animationDelay: '2s' }}>
          <div className="text-sm flex items-center">
            沉浸式学习环境 
            <span className="ml-2 animate-spin text-yellow-400">✨</span>
          </div>
        </div>
        
        {/* 学习进度指示器 */}
        <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md rounded-xl p-4 text-white animate-float border border-white/20 shadow-2xl"
             style={{ animationDelay: '0.5s' }}>
          <div className="text-xs opacity-80 mb-2">今日进度</div>
          <div className="w-24 h-3 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 animate-pulse"
                 style={{ width: '75%' }}></div>
          </div>
          <div className="text-xs mt-2 text-green-400 font-semibold">75% 完成</div>
        </div>
        
        {/* 3D Scene Info Banner */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-xl p-4 text-white border border-white/20 shadow-2xl max-w-xs">
          <div className="text-sm opacity-90 mb-2">🎮 互动提示</div>
          <div className="text-xs opacity-80 leading-relaxed">
            移动鼠标控制视角<br/>
            悬停缩放查看细节<br/>
            欣赏实时RGB灯效
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-4xl">
                {user.avatar}
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors">
                ✏️
              </button>
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <p className="text-lg text-gray-600 mb-2">{user.title}</p>
              <p className="text-gray-600 max-w-2xl mb-4">{user.bio}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  📍 {user.location}
                </span>
                <span className="flex items-center">
                  📅 加入于 {user.joinDate}
                </span>
                <span className="flex items-center">
                  ✉️ {user.email}
                </span>
              </div>
            </div>
            
            {/* Edit Button */}
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              编辑资料
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl p-4 text-white text-center">
              <div className="text-2xl font-bold">{user.stats.coursesCompleted}</div>
              <div className="text-sm opacity-90">完成课程</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl p-4 text-white text-center">
              <div className="text-2xl font-bold">{user.stats.hoursLearned}</div>
              <div className="text-sm opacity-90">学习小时</div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-xl p-4 text-white text-center">
              <div className="text-2xl font-bold">{user.stats.streak}</div>
              <div className="text-sm opacity-90">连续天数</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl p-4 text-white text-center">
              <div className="text-2xl font-bold">{user.stats.points}</div>
              <div className="text-sm opacity-90">学习积分</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Recent Learning */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">最近学习</h3>
                <div className="space-y-4">
                  {user.recentCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{course.name}</h4>
                        <p className="text-sm text-gray-500">最后访问: {course.lastAccessed}</p>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-sm font-medium text-gray-600">
                        {course.progress}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">兴趣标签</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Achievements */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">最新成就</h3>
                <div className="space-y-4">
                  {user.achievements.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-lg">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">快速操作</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                    浏览课程
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                    发布内容
                  </button>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                    AI 助手
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-2xl mx-auto mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.name}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Other tabs content can be added similarly */}
      </div>
    </div>
  );
};

export default Profile;
