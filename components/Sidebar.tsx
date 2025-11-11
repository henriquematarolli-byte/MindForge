
import React from 'react';
import { Competitor } from '../types';
import { ChartBarIcon } from './icons';

interface SidebarProps {
  competitors: Competitor[];
}

const Sidebar: React.FC<SidebarProps> = ({ competitors }) => {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex-col h-screen sticky top-0 hidden lg:flex">
      <div className="flex items-center justify-center h-16 border-b border-slate-800">
        <ChartBarIcon className="w-8 h-8 text-brand-blue" />
        <h2 className="ml-2 text-2xl font-bold text-white">Monitor</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <h3 className="px-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">Competitors</h3>
        <ul>
          {competitors.map((c, index) => (
            <li key={c.id}>
              <a href="#" className={`flex items-center p-2 space-x-3 rounded-md transition-colors ${index === 0 ? 'bg-slate-700/50 text-white' : 'hover:bg-slate-700/50 text-slate-300'}`}>
                <div className="relative">
                    <img src={c.avatarUrl} alt={c.name} className="w-8 h-8 rounded-full" />
                    <span className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-slate-900 ${c.status === 'online' ? 'bg-green-400' : 'bg-slate-500'}`}></span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{c.name}</p>
                  <p className="text-xs text-slate-400 truncate">{c.handle}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
