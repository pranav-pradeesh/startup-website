import { motion } from 'motion/react';
import { RefreshCcw, LayoutDashboard, Brain, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BurnoutResult } from '@/types';

interface ResultProps {
  result: BurnoutResult;
  onRestart: () => void;
  onViewDashboard: () => void;
}

export default function Result({ result, onRestart, onViewDashboard }: ResultProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-rose-500';
      case 'Medium': return 'text-amber-500';
      default: return 'text-emerald-500';
    }
  };

  const getRiskBorder = (level: string) => {
    switch (level) {
      case 'High': return 'border-rose-500/20';
      case 'Medium': return 'border-amber-500/20';
      default: return 'border-emerald-500/20';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gold/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl w-full bg-bg-alt border border-white/5 relative z-10 shadow-2xl"
      >
        {/* Decorative Header */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        
        <div className="p-12">
          <header className="mb-16 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span className="mono-label">Diagnostic Output</span>
              </div>
              <h1 className="text-5xl font-serif italic text-white">Personal Burnout Profile</h1>
            </div>
            <div className="text-right">
              <span className="mono-label block mb-1">Session ID</span>
              <span className="font-mono text-xs text-stone-600">{Math.random().toString(36).substring(7).toUpperCase()}</span>
            </div>
          </header>

          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4 flex flex-col items-center justify-center border-r border-white/5 pr-12">
              <div className="relative mb-6">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="76"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="transparent"
                    className="text-white/5"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="76"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    initial={{ strokeDasharray: "477.52", strokeDashoffset: "477.52" }}
                    animate={{ strokeDashoffset: 477.52 - (477.52 * result.score) / 100 }}
                    transition={{ duration: 2, ease: "circOut" }}
                    className={getRiskColor(result.riskLevel)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-serif font-bold italic text-white">{result.score}%</span>
                </div>
              </div>
              <span className="mono-label text-[9px] text-stone-500">Cumulative Load Index</span>
            </div>

            <div className="md:col-span-8 flex flex-col justify-center">
              <span className="mono-label block mb-2">Primary Risk Vector</span>
              <h2 className={cn("text-6xl font-serif font-bold italic mb-6 leading-none", getRiskColor(result.riskLevel))}>
                {result.riskLevel} Case
              </h2>
              <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono tracking-widest w-fit", getRiskBorder(result.riskLevel), getRiskColor(result.riskLevel))}>
                <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", result.riskLevel === 'Low' ? 'bg-emerald-500' : result.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-rose-500')} />
                MONITORING {result.riskLevel === 'High' ? 'CRITICAL' : 'REQUIRED'}
              </div>
            </div>
          </div>

          <div className="p-10 bg-gold-dim border border-gold/10 relative overflow-hidden group mb-16">
            <Brain className="absolute -right-8 -bottom-8 w-40 h-40 text-gold/5 transition-transform duration-1000 group-hover:scale-110" />
            <div className="flex items-center gap-2 mb-6 text-gold">
              <span className="mono-label text-gold">AI Strategist Conclusion</span>
            </div>
            <p className="text-white text-xl font-light leading-relaxed italic relative z-10">
              "{result.explanation}"
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <button
              onClick={onRestart}
              className="flex-1 btn-outline justify-center h-14"
            >
              <RefreshCcw className="w-4 h-4" />
              RETRAIN DIAGNOSTIC
            </button>
            <button
              onClick={onViewDashboard}
              className="flex-1 btn-primary justify-center h-14"
            >
              <LayoutDashboard className="w-4 h-4" />
              ACCESS CORPORATE DASHBOARD
            </button>
          </div>
        </div>

        {/* Decorative Footer */}
        <div className="p-8 border-t border-white/5 bg-white/[0.02] flex justify-between items-center text-[9px] font-mono text-stone-600 uppercase tracking-[0.3em]">
          <span>Security Protocol 4.0 // Encrypted Host</span>
          <span>© 2026 Resylia Intelligence</span>
        </div>
      </motion.div>
    </div>
  );
}
