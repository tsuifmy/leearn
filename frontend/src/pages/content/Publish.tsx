import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Publish: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    difficulty: 'beginner',
    type: 'article',
    category: '',
    description: ''
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const categories = [
    '前端开发', '后端开发', '移动开发', '数据科学', 
    '人工智能', '设计', '产品管理', '其他'
  ];

  const difficulties = [
    { value: 'beginner', label: '初级', color: 'bg-green-100 text-green-800' },
    { value: 'intermediate', label: '中级', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'advanced', label: '高级', color: 'bg-red-100 text-red-800' }
  ];

  const contentTypes = [
    { value: 'article', label: '📝 文章', description: '详细的学习教程或知识分享' },
    { value: 'course', label: '🎓 课程', description: '系统性的学习课程' },
    { value: 'question', label: '❓ 问题', description: '学习中遇到的问题求助' },
    { value: 'experience', label: '💡 经验', description: '学习心得和经验分享' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // TODO: 处理文件上传
    console.log('文件拖放:', e.dataTransfer.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 实现内容发布逻辑
    console.log('发布内容:', formData);
    alert('内容发布成功！');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 顶部面包屑导航 */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-700">首页</Link>
            <span>/</span>
            <span className="text-gray-900">发布内容</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主编辑区域 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              {/* 页面标题 */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 发布学习内容</h1>
                <p className="text-gray-600">分享你的知识，帮助更多人学习成长</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 内容类型选择 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    内容类型 *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {contentTypes.map((type) => (
                      <label key={type.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value={type.value}
                          checked={formData.type === type.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                          formData.type === type.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{type.label}</div>
                              <div className="text-sm text-gray-500">{type.description}</div>
                            </div>
                            {formData.type === type.value && (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 标题 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    标题 *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-lg"
                    placeholder="请输入一个吸引人的标题..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.title.length}/100 字符
                  </p>
                </div>

                {/* 简介 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    内容简介
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-none"
                    placeholder="简要描述这篇内容的主要内容和学习收获..."
                  />
                </div>

                {/* 编辑器工具栏 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      正文内容 *
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setPreviewMode(!previewMode)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          previewMode
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {previewMode ? '编辑' : '预览'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 内容编辑区 */}
                {!previewMode ? (
                  <div>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      rows={15}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-none font-mono text-sm"
                      placeholder="在这里编写你的内容...&#10;&#10;支持 Markdown 格式：&#10;# 标题&#10;**粗体**&#10;*斜体*&#10;```代码块```&#10;- 列表项"
                      required
                    />
                  </div>
                ) : (
                  <div className="min-h-96 p-4 border-2 border-gray-200 rounded-xl bg-gray-50">
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-wrap">{formData.content || '暂无内容...'}</div>
                    </div>
                  </div>
                )}

                {/* 文件上传区域 */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="space-y-2">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="text-gray-600">
                      <p className="font-medium">拖拽文件到这里上传</p>
                      <p className="text-sm">或者 <button type="button" className="text-blue-600 hover:text-blue-700">点击浏览文件</button></p>
                    </div>
                    <p className="text-xs text-gray-500">支持图片、视频、文档等格式，最大 50MB</p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* 右侧设置面板 */}
          <div className="space-y-6">
            {/* 发布设置 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 发布设置</h3>
              
              {/* 分类 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分类 *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">选择分类</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* 难度等级 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  难度等级 *
                </label>
                <div className="space-y-2">
                  {difficulties.map((difficulty) => (
                    <label key={difficulty.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="difficulty"
                        value={difficulty.value}
                        checked={formData.difficulty === difficulty.value}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${difficulty.color}`}>
                        {difficulty.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 标签 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标签
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="用逗号分隔多个标签"
                />
                <p className="text-xs text-gray-500 mt-1">
                  例如：JavaScript, 前端开发, 教程
                </p>
              </div>

              {/* 发布按钮 */}
              <div className="space-y-3">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                >
                  🚀 立即发布
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  💾 保存草稿
                </button>
              </div>
            </div>

            {/* 发布指南 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 发布指南</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>选择合适的内容类型和分类</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>使用清晰明确的标题</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>提供详细的内容描述</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>添加相关标签便于搜索</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>使用图片和代码示例丰富内容</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
