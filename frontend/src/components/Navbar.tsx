import React from 'react';

const Navbar = () => (
  <nav className="w-full flex items-center justify-between px-8 py-4 bg-white/80 shadow-md">
    <div className="text-2xl font-bold text-blue-600">学乐无穷</div>
    <div className="space-x-4">
      <a href="#" className="text-blue-500 hover:underline">首页</a>
      <a href="#" className="text-blue-500 hover:underline">知识库</a>
      <a href="#" className="text-blue-500 hover:underline">社区</a>
      <a href="#" className="text-blue-500 hover:underline">AI助理</a>
      <a href="#" className="text-blue-500 hover:underline">登录</a>
    </div>
  </nav>
);

export default Navbar;
