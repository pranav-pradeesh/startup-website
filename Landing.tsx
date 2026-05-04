import { motion } from 'motion/react';
import { ArrowRight, Activity, ShieldCheck, Zap, Brain, BarChart3, Lock } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
  onViewDashboard: () => void;
}

export default function Landing({ onStart, onViewDashboard }: LandingProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-bg/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="font-serif italic text-2xl tracking-tighter">Resylia</span>
          </div>
          <div className="hidden md:flex items-center gap-12 font-mono text-[10px] tracking-[0.2em] text-stone-500 uppercase">
            <a href="#" className="hover:text-gold transition-colors">Platform</a>
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Pricing</a>
          </div>
          <button onClick={onStart} className="px-5 py-2 border border-gold/30 text-gold font-mono text-[10px] tracking-widest rounded-sm hover:bg-gold hover:text-bg transition-all">
            GET STARTED
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-48 pb-24">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mono-label mb-8 flex items-center gap-4"
          >
            <span className="w-12 h-px bg-white/10" />
            AI-Powered Burnout Intelligence
            <span className="w-12 h-px bg-white/10" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-serif font-bold leading-[0.85] tracking-tighter mb-10"
          >
            Predict burnout <br />
            <span className="text-gold italic">before it costs you.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-stone-400 max-w-2xl mb-12 font-light leading-relaxed"
          >
            Identify psychosocial risks 4-6 weeks before turnover happens. 
            Real-time data for high-stakes environments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button onClick={onStart} className="btn-primary">
              START DEMO SURVEY
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={onViewDashboard} className="btn-outline">
              MANAGER DASHBOARD
            </button>
          </motion.div>
        </div>

        {/* Bento Feature Grid */}
        <section className="grid grid-cols-12 gap-6 mb-32">
          <div className="col-span-12 md:col-span-7 glass-panel p-10 group hover:border-gold/20 transition-all">
            <Activity className="w-10 h-10 text-gold mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl mb-4 italic">30-Second Signal Capture</h3>
            <p className="text-stone-400 font-light leading-relaxed mb-8 max-w-md">
              Low-friction daily check-ins deliver structured signals on energy, stress, and intent without "survey fatigue."
            </p>
            <div className="flex gap-4">
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-stone-500 uppercase tracking-widest">Slack Native</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-stone-500 uppercase tracking-widest">Web / Mobile</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 bg-gold-dim border border-white/5 p-10 relative overflow-hidden">
            <Brain className="w-32 h-32 text-gold/5 absolute -right-8 -bottom-8 rotate-12" />
            <Sparkles className="w-8 h-8 text-gold mb-8" />
            <h3 className="text-3xl mb-4 italic">Gemini-Driven Prediction</h3>
            <p className="text-stone-400 font-light leading-relaxed">
              Proprietary patterns analyzed by advanced LLMs to identify the "quiet resignation" phase before it starts.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 glass-panel p-10">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-8">
              <Lock className="w-5 h-5 text-stone-400" />
            </div>
            <h3 className="text-2xl mb-4 italic">Absolute Privacy</h3>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Enforced minimum cohort sizes and database-level encryption ensure trust is never broken.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 glass-panel p-10">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-8">
              <BarChart3 className="w-5 h-5 text-stone-400" />
            </div>
            <h3 className="text-2xl mb-4 italic">Turnover ROI Modeling</h3>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Quantify the financial impact of burnout and the savings generated by proactive intervention.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 glass-panel p-10 border-gold/20">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-8">
              <ShieldCheck className="w-5 h-5 text-gold" />
            </div>
            <h3 className="text-2xl mb-4 italic text-gold">SOC 2 Ready</h3>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Built for the private sector's rigorous compliance and security standards from day one.
            </p>
          </div>
        </section>

        {/* Dynamic Quote Section */}
        <section className="border-t border-white/5 pt-32 mb-32 flex flex-col md:flex-row gap-20">
          <div className="max-w-xl">
            <h2 className="text-5xl italic leading-tight mb-8 font-bold">
              "By the time someone resigns, <br />
              <span className="text-stone-500">you've already lost the battle."</span>
            </h2>
            <p className="text-stone-400 font-light mb-8 italic">
              — Chief People Officer at Global FinTech
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-8 font-mono">
            <div className="space-y-2">
              <span className="text-4xl text-gold">55%</span>
              <p className="text-[10px] text-stone-500 uppercase tracking-widest leading-tight">
                of professionals report burnout in 2024
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-4xl text-gold">$125K</span>
              <p className="text-[10px] text-stone-500 uppercase tracking-widest leading-tight">
                average replacement cost per senior hire
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-stone-700 rounded-full" />
            <span className="font-serif italic text-lg opacity-50">Resylia</span>
          </div>
          <p className="text-[10px] font-mono text-stone-600 uppercase tracking-[0.3em]">
            © 2026 Resilience Intelligence Systems
          </p>
        </div>
      </footer>
    </div>
  );
}

function Sparkles(props: any) {
  return (
    <svg 
      {...props}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}
