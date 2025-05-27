import React, { useState } from 'react';

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
        
        {/* 3D Scene Container with proper perspective */}
        <div className="relative h-full flex items-end justify-center pb-8" 
             style={{ 
               perspective: '2000px', 
               perspectiveOrigin: 'center 60%' 
             }}>
          
          {/* 3D Desktop Scene */}
          <div className="relative" 
               style={{ 
                 transformStyle: 'preserve-3d',
                 transform: 'rotateX(60deg) rotateY(0deg)'
               }}>
            
            {/* Desktop Surface - Horizontal Plane */}
            <div className="relative bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800 rounded-2xl shadow-2xl"
                 style={{ 
                   width: '400px',
                   height: '300px',
                   transform: 'translateZ(0px)',
                   backgroundImage: `
                     repeating-linear-gradient(90deg, 
                       rgba(139, 69, 19, 0.1) 0px, 
                       rgba(139, 69, 19, 0.1) 3px, 
                       transparent 3px, 
                       transparent 15px),
                     repeating-linear-gradient(0deg, 
                       rgba(139, 69, 19, 0.05) 0px, 
                       rgba(139, 69, 19, 0.05) 2px, 
                       transparent 2px, 
                       transparent 20px)
                   `,
                   boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.2), 0 30px 60px rgba(0,0,0,0.5)'
                 }}>
              
              {/* Monitor - Standing vertically on desk */}
              <div className="absolute bg-gradient-to-b from-gray-900 to-black rounded-lg border-2 border-gray-700"
                   style={{
                     width: '160px',
                     height: '100px',
                     left: '120px',
                     top: '80px',
                     transform: 'rotateX(-90deg) translateZ(50px)',
                     transformOrigin: 'bottom center',
                     boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
                   }}>
                {/* Monitor Screen */}
                <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 rounded-md p-2 relative overflow-hidden">
                  {/* Code Editor */}
                  <div className="w-full h-full bg-slate-900 rounded text-xs">
                    {/* Title bar */}
                    <div className="flex h-3 bg-gray-800 rounded-t mb-1">
                      <div className="flex space-x-1 p-0.5">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    {/* Code content */}
                    <div className="px-1 space-y-0.5 text-green-400 font-mono text-xs leading-tight">
                      <div>function learn() {'{'}</div>
                      <div className="ml-2 text-blue-400">const skill = study();</div>
                      <div className="ml-2 text-yellow-400">return skill;</div>
                      <div>{'}'}</div>
                    </div>
                  </div>
                  {/* Screen glow */}
                  <div className="absolute inset-0 bg-blue-500/20 rounded-md animate-pulse pointer-events-none"></div>
                </div>
              </div>
              
              {/* Monitor Stand */}
              <div className="absolute bg-gradient-to-b from-gray-600 to-gray-800 rounded"
                   style={{
                     width: '4px',
                     height: '40px',
                     left: '198px',
                     top: '130px',
                     transform: 'rotateX(-90deg) translateZ(10px)',
                     transformOrigin: 'bottom center'
                   }}></div>
              
              {/* Monitor Base */}
              <div className="absolute bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"
                   style={{
                     width: '60px',
                     height: '20px',
                     left: '170px',
                     top: '160px',
                     transform: 'translateZ(2px)',
                     boxShadow: '0 5px 15px rgba(0,0,0,0.6)'
                   }}></div>
              
              {/* Keyboard - Flat on desk */}
              <div className="absolute bg-gradient-to-b from-gray-300 to-gray-500 rounded-lg"
                   style={{
                     width: '120px',
                     height: '40px',
                     left: '140px',
                     top: '200px',
                     transform: 'translateZ(3px)',
                     boxShadow: '0 5px 15px rgba(0,0,0,0.4)'
                   }}>
                {/* Keyboard keys */}
                <div className="grid grid-cols-12 gap-0.5 p-1">
                  {[...Array(36)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-gray-100 rounded-sm shadow-inner"></div>
                  ))}
                </div>
                {/* Space bar */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-100 rounded-sm shadow-inner"></div>
              </div>
              
              {/* Mouse - Flat on desk */}
              <div className="absolute bg-gradient-to-b from-gray-300 to-gray-500 rounded-full"
                   style={{
                     width: '25px',
                     height: '35px',
                     left: '300px',
                     top: '220px',
                     transform: 'translateZ(3px)',
                     boxShadow: '0 5px 15px rgba(0,0,0,0.4)'
                   }}>
                <div className="w-1 h-4 bg-gray-400 mx-auto mt-2 rounded-full"></div>
                <div className="w-1 h-1 bg-red-400 rounded-full mx-auto mt-1 animate-pulse"></div>
              </div>
              
              {/* Left Speaker */}
              <div className="absolute bg-gradient-to-b from-gray-800 to-black rounded-lg"
                   style={{
                     width: '30px',
                     height: '50px',
                     left: '60px',
                     top: '100px',
                     transform: 'rotateX(-90deg) translateZ(25px)',
                     transformOrigin: 'bottom center',
                     boxShadow: '0 15px 30px rgba(0,0,0,0.6)'
                   }}>
                <div className="w-4 h-4 bg-gray-700 rounded-full mx-auto mt-3 border border-gray-600"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full mx-auto mt-2"></div>
                <div className="absolute w-1 h-1 bg-green-400 rounded-full top-1 right-1 animate-pulse"></div>
              </div>
              
              {/* Right Speaker */}
              <div className="absolute bg-gradient-to-b from-gray-800 to-black rounded-lg"
                   style={{
                     width: '30px',
                     height: '50px',
                     left: '310px',
                     top: '100px',
                     transform: 'rotateX(-90deg) translateZ(25px)',
                     transformOrigin: 'bottom center',
                     boxShadow: '0 15px 30px rgba(0,0,0,0.6)'
                   }}>
                <div className="w-4 h-4 bg-gray-700 rounded-full mx-auto mt-3 border border-gray-600"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full mx-auto mt-2"></div>
                <div className="absolute w-1 h-1 bg-green-400 rounded-full top-1 right-1 animate-pulse"></div>
              </div>
              
              {/* Coffee Cup */}
              <div className="absolute bg-gradient-to-b from-white to-gray-200 rounded-lg"
                   style={{
                     width: '25px',
                     height: '30px',
                     left: '320px',
                     top: '120px',
                     transform: 'translateZ(3px)',
                     boxShadow: '0 5px 15px rgba(0,0,0,0.4)'
                   }}>
                <div className="w-4 h-4 bg-amber-800 rounded-full mx-auto mt-2 opacity-80"></div>
                <div className="absolute -right-1 top-2 w-2 h-3 bg-gray-200 rounded-r-full border border-gray-300"></div>
                {/* Steam animation */}
                <div className="absolute top-0 left-3 space-y-1"
                     style={{ transform: 'translateY(-8px)' }}>
                  <div className="w-0.5 h-2 bg-gray-300 rounded-full opacity-40 animate-pulse"></div>
                  <div className="w-0.5 h-1 bg-gray-300 rounded-full opacity-30 animate-pulse" 
                       style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
              
              {/* Notebook */}
              <div className="absolute bg-gradient-to-b from-blue-200 to-blue-300 rounded"
                   style={{
                     width: '40px',
                     height: '55px',
                     left: '70px',
                     top: '180px',
                     transform: 'translateZ(2px) rotateZ(-15deg)',
                     boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                   }}>
                <div className="absolute inset-y-2 left-2 space-y-0.5">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-6 h-0.5 bg-blue-600 opacity-30 rounded"></div>
                  ))}
                </div>
              </div>
              
              {/* Pen */}
              <div className="absolute bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                   style={{
                     width: '2px',
                     height: '35px',
                     left: '95px',
                     top: '200px',
                     transform: 'translateZ(3px) rotateZ(25deg)',
                     boxShadow: '0 3px 8px rgba(0,0,0,0.3)'
                   }}></div>
            </div>
            
            {/* Computer Case - On the floor beside desk */}
            <div className="absolute bg-gradient-to-br from-gray-800 to-black rounded-lg border-2 border-gray-600"
                 style={{
                   width: '60px',
                   height: '120px',
                   left: '450px',
                   top: '200px',
                   transform: 'rotateX(-90deg) translateZ(60px)',
                   transformOrigin: 'bottom center',
                   boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
                 }}>
              {/* Power LED */}
              <div className="absolute w-2 h-2 bg-blue-500 rounded-full top-3 left-3 animate-pulse shadow-lg shadow-blue-500/50"></div>
              {/* Ventilation */}
              <div className="absolute right-2 top-8 space-y-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-8 h-0.5 bg-gray-600 rounded"></div>
                ))}
              </div>
              {/* USB ports */}
              <div className="absolute bottom-3 left-2 space-y-1">
                <div className="w-4 h-1 bg-gray-700 rounded-sm"></div>
                <div className="w-4 h-1 bg-gray-700 rounded-sm"></div>
              </div>
            </div>
          </div>
          
          {/* Ambient Lighting Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Monitor blue glow */}
            <div className="absolute w-80 h-40 bg-gradient-radial from-blue-400/30 via-blue-500/20 to-transparent rounded-full"
                 style={{ 
                   left: '50%', 
                   top: '40%', 
                   transform: 'translate(-50%, -50%)',
                   filter: 'blur(20px)'
                 }}></div>
            
            {/* Warm ambient light */}
            <div className="absolute w-96 h-96 bg-gradient-radial from-yellow-300/20 via-orange-400/10 to-transparent rounded-full"
                 style={{ 
                   left: '50%', 
                   top: '50%', 
                   transform: 'translate(-50%, -50%)',
                   filter: 'blur(30px)'
                 }}></div>
          </div>
        </div>
        
        {/* Floating UI Elements */}
        <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white transform hover:scale-105 transition-all duration-300 animate-float">
          <div className="text-sm opacity-80">当前状态</div>
          <div className="text-lg font-bold flex items-center">
            专注学习中 
            <span className="ml-2 animate-bounce">🎯</span>
          </div>
        </div>
        
        <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white transform hover:scale-105 transition-all duration-300 animate-float" 
             style={{ animationDelay: '1s' }}>
          <div className="text-sm opacity-80">学习时长</div>
          <div className="text-lg font-bold flex items-center">
            2小时 30分钟
            <span className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 text-white hover:bg-white/20 transition-all duration-300 animate-float"
             style={{ animationDelay: '2s' }}>
          <div className="text-sm flex items-center">
            沉浸式学习环境 
            <span className="ml-2 animate-spin text-yellow-400">✨</span>
          </div>
        </div>
        
        {/* 学习进度指示器 */}
        <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white animate-float"
             style={{ animationDelay: '0.5s' }}>
          <div className="text-xs opacity-80 mb-1">今日进度</div>
          <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000"
                 style={{ width: '75%' }}></div>
          </div>
          <div className="text-xs mt-1 text-green-400">75% 完成</div>
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
