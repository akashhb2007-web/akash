import React from 'react';
import { LayoutDashboard, Lightbulb, Image, TrendingUp, Settings, Zap } from 'lucide-react';
import { NavSection } from '../types';

interface SidebarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentSection, onNavigate }) => {
  const navItems = [
    { id: NavSection.Dashboard, label: 'Overview', icon: LayoutDashboard },
    { id: NavSection.Generator, label: 'Idea Generator', icon: Lightbulb },
    { id: NavSection.MediaStudio, label: 'Media Studio', icon: Image },
    { id: NavSection.Trends, label: 'Trend Watch', icon: TrendingUp },
  ];

  return (
    <div className="w-20 md:w-64 h-screen bg-card border-r border-gray-800 flex flex-col flex-shrink-0 sticky top-0">
      <div className="p-6 flex items-center justify-center md:justify-start gap-3">
        <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
          <Zap size={20} fill="currentColor" />
        </div>
        <span className="hidden md:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          SocialFlow
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary/20 text-white shadow-lg shadow-primary/10 border border-primary/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-primary' : ''} />
              <span className="hidden md:block font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
           onClick={() => onNavigate(NavSection.Settings)}
           className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            currentSection === NavSection.Settings ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
           }`}
        >
          <Settings size={20} />
          <span className="hidden md:block font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;