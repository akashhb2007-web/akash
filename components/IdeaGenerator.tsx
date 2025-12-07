import React, { useState } from 'react';
import { Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import { ContentIdea, ContentPlatform } from '../types';
import { generateDailyIdeas } from '../services/geminiService';

const IdeaGenerator: React.FC = () => {
  const [niche, setNiche] = useState('Tech Reviews');
  const [platform, setPlatform] = useState<ContentPlatform>(ContentPlatform.Instagram);
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIdeas([]);
    try {
      const results = await generateDailyIdeas(niche, platform);
      setIdeas(results);
    } catch (error) {
      alert("Failed to generate ideas. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">AI Content Brainstorm</h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Generate viral content ideas tailored to your niche and audience in seconds.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="bg-card p-6 rounded-2xl border border-gray-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Your Niche</label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="e.g. Fitness, Digital Marketing, Travel"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as ContentPlatform)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            >
              {Object.values(ContentPlatform).map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Sparkles className="fill-current" /> Generate Ideas
            </>
          )}
        </button>
      </form>

      {ideas.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {ideas.map((idea, index) => (
            <div key={index} className="bg-card rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      idea.estimatedEngagement === 'High' ? 'bg-green-500/10 text-green-400' :
                      idea.estimatedEngagement === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {idea.estimatedEngagement} Potential
                    </span>
                    <h3 className="text-xl font-bold text-white">{idea.title}</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`${idea.title}\n\n${idea.script}`, index)}
                    className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedIndex === index ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                  </button>
                </div>
                
                <p className="text-gray-300">{idea.description}</p>
                
                {idea.script && (
                  <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800/50">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Script Outline</h4>
                    <p className="text-gray-300 text-sm whitespace-pre-wrap">{idea.script}</p>
                  </div>
                )}

                {idea.hashtags && (
                  <div className="flex flex-wrap gap-2">
                    {idea.hashtags.map((tag, i) => (
                      <span key={i} className="text-sm text-secondary hover:text-primary transition-colors cursor-pointer">
                        #{tag.replace('#', '')}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IdeaGenerator;