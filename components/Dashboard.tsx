
import React from 'react';
import { Post } from '../types';
import { HeartIcon, ChatBubbleIcon } from './icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DashboardProps {
  posts: Post[];
}

const chartData = [
  { name: 'BrandCorp', posts: 18, engagement: 25 },
  { name: 'Innovate Inc.', posts: 25, engagement: 45 },
  { name: 'Market Movers', posts: 12, engagement: 15 },
  { name: 'Synergy Co', posts: 22, engagement: 30 },
  { name: 'Future Fwd', posts: 15, engagement: 35 },
];

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
    {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="w-full h-48 object-cover" />}
    <div className="p-4">
      <div className="flex items-center mb-3">
        <img src={post.competitorAvatar} alt={post.competitorName} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="font-bold text-white">{post.competitorName}</p>
          <p className="text-sm text-slate-400">{post.timestamp}</p>
        </div>
      </div>
      <p className="text-slate-300 mb-4 text-sm">{post.content}</p>
      <div className="flex items-center text-slate-400 text-sm">
        <div className="flex items-center mr-4">
          <HeartIcon className="w-4 h-4 mr-1 text-red-500" /> {post.likes.toLocaleString()}
        </div>
        <div className="flex items-center">
          <ChatBubbleIcon className="w-4 h-4 mr-1 text-sky-500" /> {post.comments.toLocaleString()}
        </div>
      </div>
    </div>
  </div>
);


const Dashboard: React.FC<DashboardProps> = ({ posts }) => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Activity Overview</h2>
        <div className="bg-slate-800 p-4 rounded-lg shadow-lg h-80">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
               <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
               <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} fontSize={12} />
               <YAxis tick={{ fill: '#94a3b8' }} fontSize={12} />
               <Tooltip
                 contentStyle={{
                   backgroundColor: '#1e293b',
                   borderColor: '#334155',
                   color: '#e2e8f0'
                 }}
                 cursor={{ fill: '#334155' }}
               />
               <Legend wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }}/>
               <Bar dataKey="posts" fill="#3b82f6" name="Posts (Last 30d)" />
               <Bar dataKey="engagement" fill="#8b5cf6" name="Avg. Engagement (%)" />
             </BarChart>
           </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Competitor Feed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
