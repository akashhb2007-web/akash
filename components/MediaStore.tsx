import React, { useState } from 'react';
import { Image as ImageIcon, Video, Loader2, Download, AlertTriangle } from 'lucide-react';
import { generateImage, generateVideo } from '../services/geminiService';

const MediaStore: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAPIKeySelection = async () => {
    if (mediaType === 'video' && window.aistudio) {
      try {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          await window.aistudio.openSelectKey();
        }
        return true;
      } catch (err) {
        console.error("API Key selection failed", err);
        return false;
      }
    }
    return true; // Images might use env key or also require selection if pro
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResultUrl(null);

    // Validate key for video
    if (mediaType === 'video') {
        if(!window.aistudio) {
            setError("Google AI Studio environment not detected. Video generation requires specific environment support.");
            return;
        }
        const keySelected = await handleAPIKeySelection();
        if (!keySelected) {
          setError("API Key selection is required for video generation.");
          return;
        }
    }

    setLoading(true);

    try {
      let url = '';
      if (mediaType === 'image') {
        url = await generateImage(prompt);
      } else {
        url = await generateVideo(prompt);
      }
      setResultUrl(url);
    } catch (err: any) {
      setError(err.message || "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold text-white">Media Studio</h2>
            <p className="text-gray-400">Create AI-generated visuals for your posts.</p>
        </div>
        {mediaType === 'video' && (
            <div className="flex items-center gap-2 text-xs text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                <AlertTriangle size={14} />
                <span>Requires Paid Billing Project (Veo)</span>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card p-6 rounded-2xl border border-gray-800 space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Media Type</label>
              <div className="grid grid-cols-2 gap-2 bg-gray-900 p-1 rounded-xl">
                <button
                  onClick={() => setMediaType('image')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                    mediaType === 'image' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <ImageIcon size={18} /> Image
                </button>
                <button
                  onClick={() => setMediaType('video')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                    mediaType === 'video' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Video size={18} /> Video
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl p-4 min-h-[150px] outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                placeholder={`Describe the ${mediaType} you want to generate...`}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Generate Asset'}
            </button>
            
             {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            
            {mediaType === 'video' && !loading && (
                 <button 
                    onClick={async () => {
                         if(window.aistudio) await window.aistudio.openSelectKey();
                    }}
                    className="w-full text-xs text-gray-500 hover:text-gray-300 underline text-center"
                >
                    Change API Key (Billing)
                </button>
            )}
          </div>
          
           <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-xl">
               <h4 className="text-blue-400 text-sm font-bold mb-1">Tip</h4>
               <p className="text-blue-300/80 text-xs leading-relaxed">
                   For best results, include lighting (e.g., "cinematic lighting"), style (e.g., "photorealistic", "3D render"), and mood in your prompt.
               </p>
           </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-2 bg-black/40 rounded-2xl border border-gray-800 flex items-center justify-center relative overflow-hidden min-h-[400px]">
          {loading ? (
            <div className="text-center space-y-4">
              <Loader2 className="animate-spin text-primary w-12 h-12 mx-auto" />
              <p className="text-gray-400 animate-pulse">
                {mediaType === 'video' ? 'Synthesizing video (this may take a minute)...' : 'Rendering image...'}
              </p>
            </div>
          ) : resultUrl ? (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {mediaType === 'image' ? (
                <img src={resultUrl} alt="Generated" className="max-w-full max-h-full rounded-lg shadow-2xl" />
              ) : (
                <video src={resultUrl} controls className="max-w-full max-h-full rounded-lg shadow-2xl" />
              )}
              <a 
                href={resultUrl} 
                download={`generated-media.${mediaType === 'image' ? 'png' : 'mp4'}`}
                target="_blank"
                rel="noreferrer"
                className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
              >
                <Download size={20} />
              </a>
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <div className="mb-4 flex justify-center opacity-30">
                 {mediaType === 'image' ? <ImageIcon size={64} /> : <Video size={64} />}
              </div>
              <p>Your generated content will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaStore;