import { motion } from 'motion/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { AlertCircle, TrendingUp, Users, Brain, ArrowRight, Shield, Zap, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Insight } from '@/types';

const TREND_DATA = [
  { name: 'Mon', score: 45, baseline: 40 },
  { name: 'Tue', score: 52, baseline: 40 },
  { name: 'Wed', score: 61, baseline: 42 },
  { name: 'Thu', score: 58, baseline: 42 },
  { name: 'Fri', score: 72, baseline: 45 },
  { name: 'Sat', score: 68, baseline: 45 },
  { name: 'Sun', score: 75, baseline: 48 },
];

interface DashboardProps {
  insights: Insight[];
  onViewInsight: (insight: Insight) => void;
  onBack: () => void;
}

export default function Dashboard({ insights, onViewInsight, onBack }: DashboardProps) {
  return (
    <div className="min-h-screen bg-bg text-stone-300 font-sans selection:bg-gold/30">
      {/* Top Bar */}
      <nav className="border-b border-white/5 bg-bg-alt/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={onBack} className="flex items-center gap-2 group cursor-pointer text-stone-500 hover:text-white transition-colors">
              <Shield className="w-4 h-4 text-gold" />
              <span className="font-serif italic text-lg tracking-tight">Resylia Intelligence</span>
            </button>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex gap-6 font-mono text-[9px] uppercase tracking-widest text-stone-500">
              <span className="text-gold">Overview</span>
              <span className="hover:text-white cursor-not-allowed">Teams</span>
              <span className="hover:text-white cursor-not-allowed">Policy</span>
              <span className="hover:text-white cursor-not-allowed">Settings</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-500" />
              <input 
                type="text" 
                placeholder="Search metrics..." 
                className="bg-white/5 border border-white/5 rounded-full py-1.5 pl-9 pr-4 text-xs font-mono outline-none focus:border-gold/30 transition-all w-48 focus:w-64"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-gold-dim border border-gold/20 flex items-center justify-center text-[10px] font-mono text-gold">JD</div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto p-8 grid grid-cols-12 gap-8">
        {/* Header Section */}
        <header className="col-span-12 mb-4 flex justify-between items-end">
          <div>
            <div className="mono-label mb-2 flex items-center gap-2">
              <Zap className="w-3 h-3 text-gold" />
              Live Organizational Diagnostic
            </div>
            <h1 className="text-6xl font-serif italic text-white leading-none">Global Insights</h1>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/5 border border-white/5 rounded-sm flex flex-col">
              <span className="mono-label text-[8px] opacity-50">Data Integrity</span>
              <span className="text-emerald-500 font-mono text-xs">99.8% VERIFIED</span>
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/5 rounded-sm flex flex-col">
              <span className="mono-label text-[8px] opacity-50">Reporting Period</span>
              <span className="text-white font-mono text-xs">LAST 7 DAYS</span>
            </div>
          </div>
        </header>

        {/* Left Column: Stats & Analytics */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Main Metric Grid */}
          <div className="grid grid-cols-4 gap-4">
            <DashboardStat 
              label="Burnout Risk"
              value="Elevated"
              subValue="68.4"
              trend="+12.4%"
              isRisk={true}
            />
            <DashboardStat 
              label="Engagement"
              value="Healthy"
              subValue="84%"
              trend="-2.1%"
              isRisk={false}
            />
            <DashboardStat 
              label="Support Gap"
              value="Critical"
              subValue="18.2"
              trend="+8.4%"
              isRisk={true}
            />
            <DashboardStat 
              label="Active Signal"
              value="Dense"
              subValue="942 pts"
              trend="+310"
              isRisk={false}
            />
          </div>

          {/* Large Area Chart Container */}
          <div className="bg-bg-alt border border-white/5 p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <TrendingUp className="w-32 h-32" />
            </div>
            
            <div className="flex justify-between items-start mb-12">
              <div>
                <h3 className="text-2xl font-serif italic text-white mb-2">Burnout Propagation Trend</h3>
                <p className="text-stone-500 text-xs font-light max-w-sm">Comparing current organizational risk against 90-day seasonal baseline averages.</p>
              </div>
              <div className="flex gap-8 font-mono text-[9px] uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span>AI Projected Risk</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <div className="w-2 h-2 bg-stone-800 rounded-sm" />
                  <span>Baseline Pattern</span>
                </div>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TREND_DATA}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C8A84B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C8A84B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.1)" 
                    fontSize={10} 
                    fontFamily="JetBrains Mono"
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.1)" 
                    fontSize={10} 
                    fontFamily="JetBrains Mono"
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0C0C1C', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono'
                    }}
                    cursor={{ stroke: 'rgba(200,168,75,0.2)', strokeWidth: 2 }}
                    itemStyle={{ color: '#C8A84B' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="baseline" 
                    stroke="rgba(255,255,255,0.1)" 
                    fill="transparent" 
                    strokeDasharray="5 5"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#C8A84B" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: AI Action Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-bg-alt border border-white/5 p-8 flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
              <Brain className="w-12 h-12 text-gold/5" />
            </div>
            
            <header className="mb-10">
              <span className="mono-label text-gold block mb-2">Priority Investigations</span>
              <h3 className="text-3xl font-serif italic text-white">AI Problem Detection</h3>
            </header>

            <div className="space-y-4 flex-1">
              {insights.map((insight) => (
                <motion.div
                  key={insight.id}
                  whileHover={{ x: 4 }}
                  className="group cursor-pointer bg-white/[0.02] border border-white/5 p-6 hover:border-gold/30 hover:bg-gold-dim transition-all"
                  onClick={() => onViewInsight(insight)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-gold/10 rounded-sm">
                      <AlertCircle className="w-4 h-4 text-gold" />
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="text-[9px] font-mono text-stone-500 mr-2">RISK IMPACT</span>
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={cn("w-1 h-3 rounded-full", i <= (insight.impactScore / 25) ? "bg-gold" : "bg-white/5")} />
                      ))}
                    </div>
                  </div>
                  <h4 className="text-white font-serif italic text-xl mb-2 group-hover:text-gold transition-colors">
                    {insight.problem}
                  </h4>
                  <p className="text-stone-500 text-xs font-light leading-snug mb-6 line-clamp-2">
                    {insight.suggestion}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-gold uppercase tracking-[0.2em]">Deploy Action Plan</span>
                    <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>

            <footer className="mt-8 pt-6 border-t border-white/5">
              <div className="bg-gold text-bg p-5 rounded-sm flex items-center justify-between group cursor-pointer hover:bg-gold/90 transition-all">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5" />
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase">Consult AI Strategist</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardStat({ label, value, subValue, trend, isRisk }: any) {
  return (
    <div className="bg-bg-alt border border-white/5 p-6 relative group hover:border-white/20 transition-all">
      <div className="flex justify-between items-start mb-6">
        <span className="mono-label text-[9px]">{label}</span>
        <div className={cn(
          "px-2 py-0.5 rounded-full text-[8px] font-mono",
          isRisk ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
        )}>
          {trend}
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-serif italic text-white">{value}</div>
        <div className="font-mono text-xs text-stone-500">{subValue}</div>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 bg-gold/20 w-0 group-hover:w-full transition-all duration-500" />
    </div>
  );
}
