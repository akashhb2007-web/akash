export enum ContentPlatform {
  Instagram = 'Instagram',
  YouTube = 'YouTube',
  TikTok = 'TikTok'
}

export interface ContentIdea {
  title: string;
  description: string;
  platform: ContentPlatform;
  estimatedEngagement: string;
  script?: string;
  hashtags?: string[];
}

export interface GeneratedMedia {
  type: 'image' | 'video';
  url: string;
  prompt: string;
}

export interface Trend {
  topic: string;
  volume: string;
  growth: number;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

export enum NavSection {
  Dashboard = 'Dashboard',
  Generator = 'Generator',
  MediaStudio = 'MediaStudio',
  Trends = 'Trends',
  Settings = 'Settings'
}

export interface ChartDataPoint {
  name: string;
  followers: number;
  engagement: number;
}