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
import Courses from './pages/courses/Courses';
import Learning from './pages/learning/Learning';
import Search from './pages/search/Search';
import NotFound from './pages/NotFound';
import Test from './pages/Test';

const AppContent: React.FC = () => {
  const location = useLocation();
  
  // 需要独立布局的页面（如登录、注册）
  const fullScreenPages = ['/login', '/register', '/ai-chat'];
  const isFullScreenPage = fullScreenPages.includes(location.pathname);

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/search" element={<Search />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/content/:id" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
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
