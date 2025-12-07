import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend 
} from 'recharts';
import { ArrowUpRight, Users, Eye, MousePointerClick } from 'lucide-react';
import { ChartDataPoint } from '../types';

const mockData: ChartDataPoint[] = [
  { name: 'Mon', followers: 4000, engagement: 2400 },
  { name: 'Tue', followers: 4500, engagement: 2800 },
  { name: 'Wed', followers: 5100, engagement: 3200 },
  { name: 'Thu', followers: 4800, engagement: 2900 },
  { name: 'Fri', followers: 5400, engagement: 3600 },
  { name: 'Sat', followers: 6000, engagement: 4200 },
  { name: 'Sun', followers: 6500, engagement: 4800 },
];

const StatCard: React.FC<{ title: string; value: string; trend: string; icon: React.ElementType }> = ({ title, value, trend, icon: Icon }) => (
  <div className="bg-card p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-gray-800 rounded-xl text-primary">
        <Icon size={24} />
      </div>
      <span className="flex items-center text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
        +{trend} <ArrowUpRight size={14} className="ml-1" />
      </span>
    </div>
    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="text-gray-400 mt-1">Welcome back! Here's how your content is performing.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-card border border-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:border-primary">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Followers" value="124.5K" trend="12%" icon={Users} />
        <StatCard title="Impressions" value="1.2M" trend="8.5%" icon={Eye} />
        <StatCard title="Engagement Rate" value="4.8%" trend="2.1%" icon={MousePointerClick} />
        <StatCard title="Content Reach" value="850K" trend="15%" icon={Users} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-6">Audience Growth</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="followers" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorFollowers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-6">Engagement Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  cursor={{fill: '#334155', opacity: 0.2}}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} 
                />
                <Bar dataKey="engagement" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;