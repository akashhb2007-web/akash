import React, { useState } from 'react';
import { Mail, Phone, ArrowRight, Loader2 } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [method, setMethod] = useState<'selection' | 'phone'>('selection');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtp) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowOtp(true);
      }, 1000);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLoginSuccess();
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-4 relative overflow-hidden">
        {/* Background blobs */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

        <div className="w-full max-w-md bg-card border border-gray-800 rounded-2xl p-8 shadow-2xl relative z-10">
            <div className="text-center mb-8">
                 <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  SocialFlow AI
                </h1>
                <p className="text-gray-400 mt-2">Sign in to manage your growth</p>
            </div>

            {method === 'selection' ? (
                <div className="space-y-4">
                    <button 
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20}/> : <Mail size={20} />}
                        Continue with Google
                    </button>
                    
                    <button 
                         onClick={() => setMethod('phone')}
                         className="w-full bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-700 border border-gray-700 transition-colors"
                    >
                        <Phone size={20} />
                        Continue with Phone
                    </button>
                </div>
            ) : (
                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                    {!showOtp ? (
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Phone Number</label>
                            <input 
                                type="tel" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1 (555) 000-0000"
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-primary"
                                required
                            />
                        </div>
                    ) : (
                        <div className="space-y-2 animate-fade-in">
                             <label className="text-sm text-gray-400">Enter OTP</label>
                            <input 
                                type="text" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="000000"
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-primary text-center letter-spacing-2 text-xl"
                                required
                            />
                            <p className="text-xs text-gray-500 text-center">Sent to {phone}</p>
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (
                            <>
                                {showOtp ? 'Verify & Login' : 'Send Code'} <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    <button 
                        type="button"
                        onClick={() => {
                            setMethod('selection');
                            setShowOtp(false);
                            setPhone('');
                            setOtp('');
                        }}
                        className="w-full text-sm text-gray-500 hover:text-gray-300"
                    >
                        Back to options
                    </button>
                </form>
            )}
        </div>
    </div>
  );
};

export default Login;