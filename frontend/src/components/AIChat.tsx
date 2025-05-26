import React, { useState } from 'react';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState([
    { type: 'ai', text: '你好！我是你的AI学习助手，有什么问题可以问我哦！' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { type: 'ai', text: data.answer }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { type: 'ai', text: '抱歉，AI助手暂时无法回应，请稍后再试。' }]);
    }
    
    setInput('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-center">🤖 AI学习助手</h3>
      
      <div className="h-64 overflow-y-auto mb-4 border rounded-lg p-3">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg max-w-xs ${
              msg.type === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="请输入你的问题..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          发送
        </button>
      </div>
    </div>
  );
};

export default AIChat;
