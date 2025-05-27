import React from 'react';

const Detail: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">内容详情</h1>
      {/* 内容详情与评论区待实现 */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">示例标题</h2>
        <p className="mb-4">这里是内容正文...</p>
        <div className="flex gap-4">
          <button className="text-blue-500">点赞</button>
          <button className="text-green-500">评论</button>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded shadow">
        <h3 className="font-bold mb-2">评论区</h3>
        {/* 评论列表与输入框待实现 */}
      </div>
    </div>
  );
};

export default Detail;
