import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'course';
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "你好！我是学乐无穷的AI助教小乐，很高兴为你服务！🎓\n\n我可以帮助你：\n• 解答学习问题\n• 推荐适合的课程\n• 制定学习计划\n• 提供学习方法建议\n\n请问有什么可以帮助你的吗？",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "我想学习前端开发，有什么推荐吗？",
    "如何制定有效的学习计划？",
    "Python和JavaScript哪个更适合初学者？",
    "我的学习进度怎么样？"
  ];

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('前端') || lowerMessage.includes('javascript') || lowerMessage.includes('react')) {
      return "前端开发是一个很棒的选择！🚀\n\n我建议你按照这个路径学习：\n1. HTML & CSS 基础\n2. JavaScript 核心概念\n3. React 框架\n4. 实际项目练习\n\n我们有完整的前端开发课程体系，要不要我推荐几个适合你的课程？";
    }
    
    if (lowerMessage.includes('python')) {
      return "Python 是非常适合初学者的编程语言！🐍\n\n特点：\n• 语法简洁易懂\n• 应用领域广泛\n• 社区支持强大\n• 学习资源丰富\n\n无论是数据科学、Web开发还是人工智能，Python都是很好的选择。要从哪个方向开始呢？";
    }
    
    if (lowerMessage.includes('学习计划') || lowerMessage.includes('计划')) {
      return "制定学习计划很重要！📚 让我为你提供一些建议：\n\n✅ SMART原则：\n• Specific（具体）\n• Measurable（可衡量）\n• Achievable（可实现）\n• Relevant（相关）\n• Time-bound（有时限）\n\n建议每天学习1-2小时，每周完成一个小项目。要不要我帮你制定一个个性化的学习计划？";
    }
    
    if (lowerMessage.includes('进度') || lowerMessage.includes('学得怎么样')) {
      return "想查看学习进度吗？📊\n\n你可以在个人中心查看详细的学习数据：\n• 学习时长统计\n• 课程完成度\n• 知识点掌握情况\n• 学习成就\n\n保持学习的连续性很重要，继续加油！💪";
    }
    
    return "这是一个很好的问题！🤔 让我为你详细分析一下...\n\n基于你的问题，我建议你可以：\n1. 先了解相关的基础知识\n2. 通过实践加深理解\n3. 多与同学交流讨论\n\n还有什么想深入了解的吗？我会继续为你提供帮助！";
  };

  const handleSendMessage = (message?: string) => {
    const messageText = message || inputMessage;
    if (!messageText.trim()) return;

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: getAIResponse(messageText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* 顶部导航栏 */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回主页
          </Link>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-bold text-white">乐</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">AI学习助教</h1>
            </div>
          </div>
          <div className="w-20"></div> {/* 占位符保持居中 */}
        </div>
      </div>

      {/* 主聊天区域 */}
      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
        {/* 快捷问题 */}
        {messages.length === 1 && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">💡 试试问我这些问题：</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(question)}
                  className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group"
                >
                  <span className="text-gray-700 group-hover:text-blue-700">{question}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-2xl ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* 头像 */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isUser 
                    ? 'bg-blue-500' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  <span className="text-white text-sm font-medium">
                    {message.isUser ? '我' : '乐'}
                  </span>
                </div>
                
                {/* 消息气泡 */}
                <div className={`px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.text}
                  </div>
                  <p className={`text-xs mt-2 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* AI正在输入指示器 */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-2xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">乐</span>
                </div>
                <div className="px-4 py-3 bg-white rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div className="border-t bg-white/80 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="输入你的问题，小乐随时为你解答..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping || !inputMessage.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
            >
              <span>发送</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
