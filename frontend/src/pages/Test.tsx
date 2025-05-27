import React from 'react';

const Test: React.FC = () => {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Tailwind CSS 测试</h1>
        <p className="text-gray-600">如果你看到红色背景和这个白色卡片，说明 Tailwind CSS 正在工作！</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          测试按钮
        </button>
      </div>
    </div>
  );
};

export default Test;
