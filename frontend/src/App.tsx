import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Publish from './pages/content/Publish';
import Detail from './pages/content/Detail';
import Chat from './pages/ai/Chat';
import Profile from './pages/profile/Profile';

const AppContent: React.FC = () => {
  const location = useLocation();
  
  // 需要独立布局的页面（如登录、注册）
  const fullScreenPages = ['/login', '/register', '/ai-chat'];
  const isFullScreenPage = fullScreenPages.includes(location.pathname);
  
  // 首页需要特殊的背景和标题
  const isHomePage = location.pathname === '/';

  if (isFullScreenPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ai-chat" element={<Chat />} />
      </Routes>
    );
  }

  return (
    <div className={`min-h-screen ${isHomePage ? 'bg-gradient-to-br from-blue-400 to-purple-500' : 'bg-gray-50'}`}>
      <Navbar />
      
      {isHomePage && (
        <div className="flex flex-col items-center justify-center pt-20">
          <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">学乐无穷</h1>
          <p className="text-xl text-white/90 mb-8">因材施教，乐在其中。结识朋友，分享知识，AI助力成长！</p>
        </div>
      )}
      
      <div className={isHomePage ? 'flex flex-col items-center justify-center' : 'pt-16'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/content/:id" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
