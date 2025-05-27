import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      icon: "🧠",
      title: "AI 智能助教",
      description: "个性化学习路径，智能问答，让学习更高效",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: "👥",
      title: "社交学习",
      description: "与志同道合的伙伴一起学习，互相激励成长",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: "📚",
      title: "知识分享",
      description: "发布你的知识，帮助他人，建立专业影响力",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: "🎯",
      title: "个性化推荐",
      description: "基于你的兴趣和水平，推荐最适合的学习内容",
      color: "from-orange-500 to-yellow-400"
    }
  ];

  const courses = [
    {
      title: "JavaScript 从入门到精通",
      level: "初级",
      students: "12,345",
      rating: "4.8",
      image: "🚀",
      tags: ["前端", "编程", "JavaScript"]
    },
    {
      title: "Python 数据科学",
      level: "中级",
      students: "8,901",
      rating: "4.9",
      image: "🐍",
      tags: ["Python", "数据科学", "机器学习"]
    },
    {
      title: "设计思维训练",
      level: "入门",
      students: "15,678",
      rating: "4.7",
      image: "🎨",
      tags: ["设计", "创意", "思维"]
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white shadow-2xl rounded-b-3xl">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              学乐无穷
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-blue-100 max-w-3xl mx-auto">
              智能化学习平台，让每个人都能找到最适合自己的学习方式
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                to="/register"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-2xl"
              >
                开始免费学习
              </Link>
              <Link 
                to="/ai-chat"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-200"
              >
                体验 AI 助手
              </Link>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-300">50K+</div>
                <div className="text-blue-200">活跃学习者</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-300">10K+</div>
                <div className="text-blue-200">优质课程</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-300">200+</div>
                <div className="text-blue-200">专业讲师</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-300">24/7</div>
                <div className="text-blue-200">AI 支持</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight drop-shadow-lg">
              为什么选择学乐无穷？
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们结合最新的 AI 技术和教育理念，为你打造个性化的学习体验
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}> 
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight drop-shadow-lg">
              热门课程
            </h2>
            <p className="text-xl text-gray-600">
              从基础到进阶，总有适合你的课程
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Link 
                key={index}
                to={`/content/${index + 1}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-6xl">
                    {course.image}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {course.level}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{course.students} 名学员</p>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs px-2 py-1 rounded-md shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/courses"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-full transition-colors duration-200 shadow-lg hover:scale-105 transform"
            >
              查看所有课程
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 shadow-inner rounded-t-3xl">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            准备开始你的学习之旅吗？
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            加入数万名学习者，与 AI 助手一起探索知识的无限可能
          </p>
          <Link 
            to="/register"
            className="inline-flex items-center px-10 py-4 bg-white text-blue-600 font-bold rounded-full text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl border-2 border-blue-100"
          >
            免费注册，立即开始
            <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
