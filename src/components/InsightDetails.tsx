import { motion } from 'motion/react';
import { ChevronLeft, Info, CheckCircle2, TrendingUp, Sparkles, Brain, Target, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Insight } from '@/types';

interface InsightDetailsProps {
  insight: Insight;
  onBack: () => void;
}

export default function InsightDetails({ insight, onBack }: InsightDetailsProps) {
  return (
    <div className="min-h-screen bg-bg selection:bg-gold/30">
      {/* Top Navigation */}
      <nav className="border-b border-white/5 bg-bg-alt/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-8 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-[10px] tracking-widest uppercase">Terminate View</span>
          </button>
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-mono text-stone-500 uppercase tracking-widest">Priority Case 0{insight.id}</span>
            <span className="px-3 py-1 bg-gold/10 rounded-full text-[9px] font-mono text-gold uppercase tracking-widest font-bold">Action Required</span>
          </div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-8 py-20">
        <header className="mb-24 grid grid-cols-12 gap-12 items-end">
          <div className="col-span-12 lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <Brain className="w-5 h-5 text-gold" />
              <span className="mono-label text-gold">Root Cause Investigation</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-7xl font-serif italic text-white leading-tight mb-8"
            >
              {insight.problem}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-stone-400 text-2xl font-light leading-relaxed max-w-3xl italic"
            >
              "{insight.breakdown}"
            </motion.p>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col items-end">
            <div className="text-right mb-4">
              <span className="mono-label text-stone-500 block mb-1">Impact probability</span>
              <span className="text-5xl font-serif text-white italic">{insight.impactScore}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: `${insight.impactScore}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-20">
          {/* Detailed Solutions */}
          <div className="col-span-12 lg:col-span-7 space-y-20">
            <section>
              <div className="flex items-center gap-4 mb-12 border-b border-white/5 pb-4">
                <Target className="w-6 h-6 text-gold" />
                <h2 className="text-3xl font-serif italic text-white">Structural Interventions</h2>
              </div>
              <div className="space-y-6">
                {insight.solutions.map((solution, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="p-8 glass-panel group hover:bg-white/[0.08] transition-all relative"
                  >
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 font-serif text-4xl italic text-gold/20 group-hover:text-gold/40 transition-colors">0{i+1}</span>
                    <p className="text-stone-300 text-lg font-light leading-relaxed pl-4">{solution}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-12 border-b border-white/5 pb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                <h2 className="text-3xl font-serif italic text-white">Preventive Governance</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insight.preventiveActions.map((action, i) => (
                  <div key={i} className="p-6 border border-white/5 bg-white/[0.02] rounded-sm relative group overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/0 group-hover:bg-emerald-500/50 transition-all" />
                    <p className="text-stone-400 font-light text-sm italic leading-relaxed">{action}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Impact Stats Sidebar */}
          <aside className="col-span-12 lg:col-span-5 space-y-12">
            <div className="bg-bg-alt border border-white/5 p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <TrendingUp className="w-24 h-24" />
              </div>
              <h4 className="mono-label text-gold mb-12">Analytics Projection</h4>
              
              <div className="space-y-16">
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <span className="mono-label text-stone-500">Baseline Signal</span>
                    <ArrowDown className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="text-4xl font-serif italic text-white leading-none">{insight.beforeStats}</div>
                  <div className="mt-4 h-0.5 bg-rose-500/20 relative">
                    <div className="absolute left-0 top-0 h-full bg-rose-500 w-3/4" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-4">
                    <span className="mono-label text-emerald-500">Target Outcome</span>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-4xl font-serif italic text-emerald-500 leading-none">{insight.afterStats}</div>
                  <div className="mt-4 h-0.5 bg-emerald-500/20 relative">
                    <div className="absolute left-0 top-0 h-full bg-emerald-500 w-full" />
                  </div>
                  <p className="mt-6 text-[10px] font-mono text-stone-500 uppercase tracking-widest">Estimated 14-day realization window</p>
                </div>
              </div>
            </div>

            <div className="bg-gold text-bg p-8 relative group cursor-pointer hover:bg-gold/90 transition-all">
              <Sparkles className="absolute -right-4 -top-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
              <header className="flex items-center gap-3 mb-6 border-b border-bg/10 pb-4">
                <Brain className="w-5 h-5" />
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase">Auto-Deploy Strategy</span>
              </header>
              <p className="text-sm font-medium leading-relaxed mb-6">
                Authorize Gemini to draft personalized intervention messages for mid-level managers based on this investigation.
              </p>
              <div className="bg-bg text-gold py-3 px-6 rounded-sm text-center font-mono text-[10px] font-bold tracking-widest uppercase">
                INITIATE STREAMS
              </div>
            </div>

            <div className="p-8 border border-white/5 bg-white/[0.02] flex items-start gap-4">
              <Info className="w-5 h-5 text-stone-500 shrink-0" />
              <p className="text-[10px] font-mono text-stone-600 uppercase tracking-widest leading-relaxed">
                This investigation is generated using the Resylia Inference Engine 4.0. Data anonymization protocols are active. Individual identity is shielded.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
