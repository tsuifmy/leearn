import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">个人资料</h1>
      {/* 个人信息展示与编辑待实现 */}
      <div className="bg-white p-6 rounded shadow">
        <p>用户名：示例用户</p>
        <p>邮箱：user@example.com</p>
        <p>兴趣标签：前端、AI、教育</p>
      </div>
    </div>
  );
};

export default Profile;
