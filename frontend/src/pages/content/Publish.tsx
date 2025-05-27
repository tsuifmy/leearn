import React, { useState } from 'react';

const Publish: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    difficulty: '1',
    type: 'article'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 实现内容发布逻辑
    console.log('发布内容:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">发布学习内容</h1>
          <p className="text-gray-600">分享你的知识，帮助更多人学习成长</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 标题 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标题 *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
              placeholder="请输入内容标题"
              required
            />
          </div>

          {/* 内容类型和难度 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                内容类型
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
              >
                <option value="article">文章</option>
                <option value="video">视频</option>
                <option value="audio">音频</option>
                <option value="course">课程</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                难度等级
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
              >
                <option value="1">入门级 ⭐</option>
                <option value="2">初级 ⭐⭐</option>
                <option value="3">中级 ⭐⭐⭐</option>
                <option value="4">高级 ⭐⭐⭐⭐</option>
                <option value="5">专家级 ⭐⭐⭐⭐⭐</option>
              </select>
            </div>
          </div>

          {/* 标签 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标签
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
              placeholder="请输入标签，用逗号分隔（如：JavaScript, 前端开发, 编程）"
            />
            <p className="text-sm text-gray-500 mt-1">标签帮助其他用户更容易找到你的内容</p>
          </div>

          {/* 内容编辑器 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              内容 *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={12}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-none"
              placeholder="开始编写你的内容..."
              required
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">支持 Markdown 格式</p>
              <p className="text-sm text-gray-500">{formData.content.length} 字符</p>
            </div>
          </div>

          {/* 文件上传 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              附件上传
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-200">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600 mb-2">点击上传或拖拽文件到此处</p>
              <p className="text-sm text-gray-500">支持图片、视频、音频和文档文件</p>
              <input type="file" className="hidden" multiple accept="image/*,video/*,audio/*,.pdf,.doc,.docx" />
            </div>
          </div>

          {/* 发布选项 */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-medium text-gray-700 mb-3">发布选项</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">允许评论</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">推送给关注者</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">加入推荐算法</span>
              </label>
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              保存草稿
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              立即发布
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Publish;
