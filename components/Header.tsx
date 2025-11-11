
import React from 'react';
import { PlusIcon, DownloadIcon, UserCircleIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-white">Competitor Dashboard</h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-md transition-colors">
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Add Competitor</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-brand-blue hover:bg-blue-600 rounded-md transition-colors">
            <DownloadIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
          <UserCircleIcon className="w-8 h-8 text-slate-500"/>
        </div>
      </div>
    </header>
  );
};

export default Header;
