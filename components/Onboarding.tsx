import React, { useState } from 'react';
import { Youtube, Instagram, Check, ArrowRight, Loader2, HelpCircle } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [instagramKey, setInstagramKey] = useState('');
  const [youtubeKey, setYoutubeKey] = useState('');
  const [connecting, setConnecting] = useState<'instagram' | 'youtube' | null>(null);
  const [connected, setConnected] = useState({ instagram: false, youtube: false });

  const handleConnect = (platform: 'instagram' | 'youtube') => {
    setConnecting(platform);
    // Simulate API verification
    setTimeout(() => {
      setConnected(prev => ({ ...prev, [platform]: true }));
      setConnecting(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-4 relative">
       <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
       <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

      <div className="w-full max-w-2xl bg-card border border-gray-800 rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Connect Your Accounts</h2>
            <p className="text-gray-400">Link your social media profiles to enable AI analytics and posting.</p>
        </div>

        <div className="space-y-6 mb-8">
            {/* Instagram Section */}
            <div className={`p-6 rounded-xl border transition-all ${connected.instagram ? 'bg-green-500/10 border-green-500/30' : 'bg-gray-900/50 border-gray-700'}`}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 rounded-lg text-white">
                            <Instagram size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Instagram</h3>
                            <p className="text-xs text-gray-500">Connect to Instagram Graph API</p>
                        </div>
                    </div>
                    {connected.instagram && <div className="flex items-center gap-1 text-green-400 text-sm font-medium"><Check size={16} /> Connected</div>}
                </div>
                
                {!connected.instagram && (
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <input 
                                    type="password" 
                                    placeholder="Enter Instagram API Key"
                                    value={instagramKey}
                                    onChange={(e) => setInstagramKey(e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg pl-3 pr-10 py-2 text-sm outline-none focus:border-primary"
                                />
                                <div className="absolute right-3 top-2 text-gray-500 cursor-help" title="Found in Meta for Developers Dashboard">
                                    <HelpCircle size={16} />
                                </div>
                            </div>
                            <button 
                                onClick={() => handleConnect('instagram')}
                                disabled={!instagramKey || connecting === 'instagram'}
                                className="bg-white text-gray-900 font-medium px-4 py-2 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50 min-w-[100px] flex items-center justify-center"
                            >
                                {connecting === 'instagram' ? <Loader2 className="animate-spin" size={16} /> : 'Connect'}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 pl-1">
                            Use your App Secret or Access Token from the Meta Developer Portal.
                        </p>
                    </div>
                )}
            </div>

            {/* YouTube Section */}
            <div className={`p-6 rounded-xl border transition-all ${connected.youtube ? 'bg-green-500/10 border-green-500/30' : 'bg-gray-900/50 border-gray-700'}`}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-600 rounded-lg text-white">
                            <Youtube size={24} />
                        </div>
                         <div>
                            <h3 className="font-bold text-white">YouTube</h3>
                            <p className="text-xs text-gray-500">Data API Integration</p>
                        </div>
                    </div>
                     {connected.youtube && <div className="flex items-center gap-1 text-green-400 text-sm font-medium"><Check size={16} /> Connected</div>}
                </div>

                {!connected.youtube && (
                    <div className="flex gap-3">
                         <input 
                            type="text" 
                            placeholder="Enter YouTube API Key"
                            value={youtubeKey}
                            onChange={(e) => setYoutubeKey(e.target.value)}
                            className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                        <button 
                            onClick={() => handleConnect('youtube')}
                            disabled={!youtubeKey || connecting === 'youtube'}
                             className="bg-white text-gray-900 font-medium px-4 py-2 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50 min-w-[100px] flex items-center justify-center"
                        >
                             {connecting === 'youtube' ? <Loader2 className="animate-spin" size={16} /> : 'Connect'}
                        </button>
                    </div>
                )}
            </div>
        </div>

        <div className="flex justify-end gap-3">
             <button 
                onClick={onComplete} // Skip
                className="text-gray-500 hover:text-white px-4 py-2 font-medium transition-colors"
            >
                Skip for now
            </button>
            <button 
                onClick={onComplete}
                className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
                Continue to Dashboard <ArrowRight size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;