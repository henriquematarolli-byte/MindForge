
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import { MOCK_COMPETITORS, MOCK_POSTS } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <div className="flex">
        <Sidebar competitors={MOCK_COMPETITORS} />
        <main className="flex-1 min-w-0">
          <Header />
          <div className="p-4 sm:p-6 lg:p-8">
            <Dashboard posts={MOCK_POSTS} />
          </div>
        </main>
      </div>
      <Chatbot />
    </div>
  );
};

export default App;
