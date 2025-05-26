import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-20">
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">学乐无穷</h1>
        <p className="text-xl text-white/90 mb-8">因材施教，乐在其中。结识朋友，分享知识，AI助力成长！</p>
        <Home />
      </div>
    </div>
  );
}

export default App;
