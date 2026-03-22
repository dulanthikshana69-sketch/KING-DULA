import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Download, CheckCircle2, AlertCircle, Terminal, Smartphone, Settings, Cpu } from 'lucide-react';

export default function App() {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [isInjected, setIsInjected] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-8));
  };

  const handleToggle = () => {
    setStatus('processing');
    setProgress(0);
    setLogs([]);
    addLog(isInjected ? 'Initiating removal process...' : 'Initiating injection process...');
  };

  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus('success');
            const newState = !isInjected;
            setIsInjected(newState);
            addLog(newState ? 'Injection successful! (ON)' : 'File removed successfully! (OFF)');
            return 100;
          }
          
          const next = prev + Math.random() * 20;
          if (prev < 30 && next >= 30) addLog('Verifying storage access...');
          if (prev < 60 && next >= 60) addLog(isInjected ? 'Deleting localconfig.json...' : 'Copying localconfig.json...');
          if (prev < 90 && next >= 90) addLog('Updating system state...');
          
          return next;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [status, isInjected]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-yellow-500/30">
      {/* Header */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold tracking-tighter text-xl">KING DULA</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> ARM64-V8A</span>
            <span className="flex items-center gap-1"><Smartphone className="w-3 h-3" /> ANDROID 14</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Info */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-6xl font-black tracking-tighter leading-none">
              ON/OFF <span className="text-yellow-500">TOGGLE</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-md">
              Easily activate or deactivate your configuration with a single tap. 
              The app remembers your last state automatically.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Current State', value: isInjected ? 'ACTIVE (ON)' : 'INACTIVE (OFF)' },
              { label: 'Target', value: 'com.dts.freefireth' },
              { label: 'Persistence', value: 'SharedPreferences' },
              { label: 'Build', value: 'Release-APK' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{item.label}</div>
                <div className={`font-mono text-sm ${item.label === 'Current State' ? (isInjected ? 'text-green-500' : 'text-zinc-500') : ''}`}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-2xl hover:bg-yellow-400 transition-all flex items-center gap-2 shadow-lg shadow-yellow-500/20">
              <Download className="w-5 h-5" />
              DOWNLOAD APK
            </button>
          </div>
        </div>

        {/* Right Side: Phone Simulator */}
        <div className="relative flex justify-center">
          <div className="absolute -inset-4 bg-yellow-500/10 blur-3xl rounded-full" />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-[320px] h-[640px] bg-[#121212] rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden relative"
          >
            {/* Phone Screen Content */}
            <div className="h-full flex flex-col p-6">
              <div className="mt-12 text-center space-y-1">
                <h2 className="text-2xl font-black text-yellow-500 tracking-tighter">KING DULA</h2>
                <p className="text-xs text-zinc-500 uppercase tracking-widest">File Injector</p>
              </div>

              <div className="mt-6 flex justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-yellow-500/20 overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-6">
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-32 h-32 rounded-full border-2 border-dashed border-yellow-500/30 flex items-center justify-center"
                    >
                      <Shield className={`w-12 h-12 transition-colors ${isInjected ? 'text-green-500' : 'text-yellow-500/50'}`} />
                    </motion.div>
                  )}
                  {status === 'processing' && (
                    <motion.div
                      key="processing"
                      className="relative w-32 h-32"
                    >
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="60"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          className="text-zinc-800"
                        />
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="60"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray="377"
                          animate={{ strokeDashoffset: 377 - (377 * progress) / 100 }}
                          className={isInjected ? 'text-red-500' : 'text-green-500'}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-mono text-xl font-bold">
                        {Math.round(progress)}%
                      </div>
                    </motion.div>
                  )}
                  {status === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`w-32 h-32 rounded-full flex items-center justify-center ${isInjected ? 'bg-green-500/20' : 'bg-zinc-500/20'}`}
                    >
                      <CheckCircle2 className={`w-16 h-16 ${isInjected ? 'text-green-500' : 'text-zinc-500'}`} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="w-full space-y-4">
                  <button 
                    onClick={handleToggle}
                    disabled={status === 'processing'}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl ${
                      status === 'processing' 
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                        : isInjected 
                          ? 'bg-red-600 text-white hover:bg-red-500 shadow-red-500/20' 
                          : 'bg-green-600 text-white hover:bg-green-500 shadow-green-500/20'
                    }`}
                  >
                    {status === 'processing' ? 'PROCESSING...' : isInjected ? 'OFF / REMOVE' : 'ON / INJECT'}
                  </button>
                  
                  <div className={`text-center text-xs font-bold uppercase tracking-widest ${isInjected ? 'text-green-500' : 'text-zinc-500'}`}>
                    {isInjected ? 'Status: Active' : 'Status: Inactive'}
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Terminal className="w-3 h-3" />
                    <span>SYSTEM LOGS</span>
                  </div>
                  <div className="bg-black rounded-xl p-3 h-32 font-mono text-[10px] overflow-hidden border border-white/5">
                    {logs.length === 0 && <span className="text-zinc-700 italic">Waiting for process...</span>}
                    {logs.map((log, i) => (
                      <div key={i} className="text-zinc-400 mb-1 leading-tight">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center pb-4">
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest">v1.0.0 | Created by King Dula</p>
              </div>
            </div>

            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl" />
          </motion.div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="max-w-5xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="text-yellow-500" />,
              title: "Scoped Storage",
              desc: "Fully compatible with Android 11-14 storage restrictions using MANAGE_EXTERNAL_STORAGE."
            },
            {
              icon: <CheckCircle2 className="text-yellow-500" />,
              title: "Auto-Directory",
              desc: "Automatically detects and creates missing game directories before injection."
            },
            {
              icon: <AlertCircle className="text-yellow-500" />,
              title: "Safe Overwrite",
              desc: "Ensures clean installation by safely overwriting existing configuration files."
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-yellow-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-bold">KING DULA INJECTOR</span>
          </div>
          <div className="text-zinc-600 text-xs">
            © 2026 King Dula. For educational purposes only.
          </div>
        </div>
      </footer>
    </div>
  );
}
