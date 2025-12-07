import React, { useState, useEffect } from 'react';
import { analyzeTrends } from '../services/geminiService';
import { TrendingUp, RefreshCw, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const TrendAnalysis: React.FC = () => {
  const [niche, setNiche] = useState('Technology');
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchTrends = async () => {
    setLoading(true);
    const result = await analyzeTrends(niche);
    setAnalysis(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Trend Watch</h2>
          <p className="text-gray-400">Real-time analysis of what's viral in your industry.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-card p-6 rounded-2xl border border-gray-800 space-y-4">
                <label className="text-sm font-medium text-gray-300">Watch Topic</label>
                <div className="relative">
                    <input 
                        type="text" 
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl pl-10 pr-4 py-3 outline-none focus:border-primary"
                    />
                    <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
                </div>
                <button 
                    onClick={fetchTrends}
                    disabled={loading}
                    className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                   {loading ? <RefreshCw className="animate-spin" size={18} /> : <TrendingUp size={18} />}
                   Analyze Trends
                </button>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-6 rounded-2xl">
                <h3 className="text-primary font-bold mb-2">Why Trend Jacking?</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Posting about trending topics within 24 hours can increase reach by up to 300%. Use this tool to find relevant conversations and add your unique perspective.
                </p>
            </div>
        </div>

        <div className="lg:col-span-2">
            <div className="bg-card p-8 rounded-2xl border border-gray-800 min-h-[400px]">
                {loading ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                        <RefreshCw className="animate-spin w-8 h-8 text-secondary" />
                        <p>Scanning the web for viral signals...</p>
                    </div>
                ) : (
                    <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-primary prose-strong:text-secondary">
                        <ReactMarkdown>{analysis}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysis;