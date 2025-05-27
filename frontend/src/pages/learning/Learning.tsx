import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Learning: React.FC = () => {
  const [activeTab, setActiveTab] = useState('current');
  
  const currentCourses = [
    {
      id: 1,
      title: 'React 从入门到精通',
      instructor: '张教授',
      progress: 65,
      nextLesson: '第12章：Context API',
      timeSpent: '18.5小时',
      totalTime: '24小时',
      image: '⚛️',
      lastAccessed: '2小时前',
      difficulty: 'intermediate'
    },
    {
      id: 2,
      title: 'Python 数据科学实战',
      instructor: '李博士',
      progress: 30,
      nextLesson: '第5章：数据可视化',
      timeSpent: '8.2小时',
      totalTime: '32小时',
      image: '🐍',
      lastAccessed: '1天前',
      difficulty: 'beginner'
    },
    {
      id: 3,
      title: 'UI/UX 设计思维训练',
      instructor: '王设计师',
      progress: 85,
      nextLesson: '第15章：用户测试',
      timeSpent: '14.8小时',
      totalTime: '18小时',
      image: '🎨',
      lastAccessed: '3小时前',
      difficulty: 'beginner'
    }
  ];

  const completedCourses = [
    {
      id: 4,
      title: 'JavaScript 基础教程',
      instructor: '陈老师',
      completedDate: '2024-01-10',
      timeSpent: '16小时',
      grade: 'A+',
      image: '📜',
      certificate: true
    },
    {
      id: 5,
      title: 'HTML & CSS 入门',
      instructor: '刘老师',
      completedDate: '2023-12-20',
      timeSpent: '12小时',
      grade: 'A',
      image: '🌐',
      certificate: true
    }
  ];

  const weeklyGoal = {
    target: 10, // 10 hours per week
    current: 6.5,
    streakDays: 15
  };

  const achievements = [
    { name: '学习新手', icon: '🎯', unlocked: true, date: '2023-12-01' },
    { name: '坚持不懈', icon: '🔥', unlocked: true, date: '2024-01-05' },
    { name: '知识分享者', icon: '📚', unlocked: true, date: '2024-01-12' },
    { name: '专家级', icon: '🏆', unlocked: false, requirement: '完成10门课程' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">我的学习</h1>
          <p className="text-gray-600">跟踪你的学习进度，保持学习动力</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Weekly Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">本周目标</h3>
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">进度</span>
                    <span className="font-medium">{weeklyGoal.current}/{weeklyGoal.target} 小时</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(weeklyGoal.current / weeklyGoal.target) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    还需 {weeklyGoal.target - weeklyGoal.current} 小时完成本周目标
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">学习连击</h3>
                  <span className="text-2xl">🔥</span>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-1">
                    {weeklyGoal.streakDays}
                  </div>
                  <p className="text-sm text-gray-600">连续学习天数</p>
                  <p className="text-xs text-gray-500 mt-2">保持每日学习习惯！</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">总学习时长</h3>
                  <span className="text-2xl">⏰</span>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500 mb-1">
                    156
                  </div>
                  <p className="text-sm text-gray-600">小时</p>
                  <p className="text-xs text-gray-500 mt-2">相当于 6.5 天!</p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('current')}
                    className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'current'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    正在学习 ({currentCourses.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'completed'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    已完成 ({completedCourses.length})
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'current' && (
                  <div className="space-y-6">
                    {currentCourses.map((course) => (
                      <div key={course.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
                              {course.image}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
                              <p className="text-gray-600">👨‍🏫 {course.instructor}</p>
                              <p className="text-sm text-gray-500">最后访问: {course.lastAccessed}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{course.progress}%</div>
                            <div className="text-sm text-gray-500">{course.timeSpent} / {course.totalTime}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">学习进度</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">下一课:</p>
                            <p className="font-medium text-gray-900">{course.nextLesson}</p>
                          </div>
                          <div className="flex space-x-3">
                            <Link
                              to={`/content/${course.id}`}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                              继续学习
                            </Link>
                            <button className="border border-gray-200 text-gray-600 hover:border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors">
                              详情
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'completed' && (
                  <div className="space-y-4">
                    {completedCourses.map((course) => (
                      <div key={course.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-xl">
                              {course.image}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                              <p className="text-gray-600">👨‍🏫 {course.instructor}</p>
                              <p className="text-sm text-gray-500">完成于: {course.completedDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">{course.grade}</div>
                            <div className="text-sm text-gray-500">{course.timeSpent}</div>
                            {course.certificate && (
                              <div className="text-xs text-green-600 mt-1">🏆 已获得证书</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">快速操作</h3>
              <div className="space-y-3">
                <Link
                  to="/courses"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 block text-center"
                >
                  浏览更多课程
                </Link>
                <Link
                  to="/ai-chat"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 block text-center"
                >
                  AI 学习助手
                </Link>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  制定学习计划
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">成就系统</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.unlocked 
                        ? 'bg-yellow-50 border border-yellow-200' 
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                      achievement.unlocked ? 'bg-yellow-400' : 'bg-gray-300'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                        {achievement.name}
                      </div>
                      {achievement.unlocked ? (
                        <div className="text-xs text-gray-500">{achievement.date}</div>
                      ) : (
                        <div className="text-xs text-gray-400">{achievement.requirement}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Reminder */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">学习提醒</h3>
              <p className="text-blue-100 text-sm mb-4">
                每日学习30分钟，养成良好习惯
              </p>
              <button className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                设置提醒
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
