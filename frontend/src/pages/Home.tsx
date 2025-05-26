import React from 'react';
import Card from '../components/Card';
import AIChat from '../components/AIChat';

const Home = () => {
  const sampleContents = [
    {
      title: "JavaScript基础入门",
      description: "从零开始学习JavaScript，掌握现代前端开发必备技能。包含变量、函数、对象等核心概念。",
      author: "小明",
      likes: 42,
      tags: ["JavaScript", "前端", "编程入门"]
    },
    {
      title: "数学思维训练",
      description: "培养逻辑思维，提升数学解题能力。适合各年龄段学习者，从基础到进阶。",
      author: "数学老师",
      likes: 28,
      tags: ["数学", "逻辑思维", "教育"]
    },
    {
      title: "英语口语练习",
      description: "地道英语表达，日常对话练习。AI助教帮你纠正发音，提升口语自信。",
      author: "English Teacher",
      likes: 35,
      tags: ["英语", "口语", "语言学习"]
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">热门学习内容</h2>
        <p className="text-lg text-white/90">发现感兴趣的知识，开启学习之旅</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sampleContents.map((content, index) => (
          <Card
            key={index}
            title={content.title}
            description={content.description}
            author={content.author}
            likes={content.likes}
            tags={content.tags}
          />
        ))}
      </div>
      
      <div className="flex justify-center">
        <AIChat />
      </div>
    </div>
  );
};

export default Home;
