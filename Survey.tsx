import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SurveyResponse } from '@/types';

interface SurveyProps {
  onComplete: (data: SurveyResponse) => void;
  onBack: () => void;
}

const OPTIONS = [
  { label: 'Never', value: 1 },
  { label: 'Rarely', value: 2 },
  { label: 'Sometimes', value: 3 },
  { label: 'Often', value: 4 },
  { label: 'Very often', value: 5 },
];

const QUESTIONS = [
  {
    id: 'q1',
    label: 'I feel emotionally drained from my work.',
    category: 'Emotional Exhaustion (EE)',
    description: 'Feeling used up at the end of the workday.',
  },
  {
    id: 'q2',
    label: 'I feel fatigued when I get up in the morning and have to face another day on the job.',
    category: 'Emotional Exhaustion (EE)',
    description: 'A sense of dread before starting your duties.',
  },
  {
    id: 'q3',
    label: 'I worry that this job is hardening me emotionally.',
    category: 'Depersonalization (DP)',
    description: 'Treating colleagues or clients as if they were impersonal objects.',
  },
  {
    id: 'q4',
    label: 'I feel I have become more callous toward people since I took this job.',
    category: 'Depersonalization (DP)',
    description: 'Developing a cynical or detached attitude.',
  },
  {
    id: 'q5',
    label: 'I can easily understand how my colleagues feel about things.',
    category: 'Personal Accomplishment (PA)',
    description: 'Feeling effective and connected within the organization.',
  },
  {
    id: 'q6',
    label: 'I feel I am positively influencing other people\'s lives through my work.',
    category: 'Personal Accomplishment (PA)',
    description: 'Sensing the value and impact of your contributions.',
  },
];

export default function Survey({ onComplete, onBack }: SurveyProps) {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Partial<SurveyResponse>>({});

  const isLastStep = step === QUESTIONS.length - 1;

  const currentQuestion = QUESTIONS[step];
  const currentValue = responses[currentQuestion.id as keyof SurveyResponse];

  const handleSelect = (value: number) => {
    const nextResponses = { ...responses, [currentQuestion.id]: value };
    setResponses(nextResponses);
    
    if (isLastStep) {
      onComplete(nextResponses as SurveyResponse);
    } else {
      setTimeout(() => setStep(s => s + 1), 300);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background detail */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
      </div>

      <div className="max-w-xl w-full relative z-10">
        <header className="mb-20 flex justify-between items-center">
          <button
            onClick={onBack}
            className="mono-label hover:text-white transition-colors"
          >
            &larr; ABORT SESSION
          </button>
          <div className="flex gap-1.5">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 w-12 transition-all duration-700",
                  i <= step ? "bg-gold" : "bg-white/5"
                )}
              />
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-4 h-4 text-gold/40" />
              <span className="mono-label text-gold">{currentQuestion.category}</span>
            </div>
            
            <h2 className="text-4xl font-serif font-bold italic mb-4 leading-[1.1] text-white">
              {currentQuestion.label}
            </h2>
            <p className="text-stone-500 font-light mb-16 text-lg max-w-sm">
              {currentQuestion.description}
            </p>

            <div className="space-y-3 mb-20">
              {OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full p-6 border transition-all text-left flex justify-between items-center group",
                    currentValue === option.value 
                      ? "bg-gold text-bg border-gold shadow-[0_0_24px_rgba(200,168,75,0.2)]" 
                      : "bg-white/5 border-white/5 hover:border-white/20 text-stone-300"
                  )}
                >
                  <span className="font-serif italic text-xl">{option.label}</span>
                  <div className={cn(
                    "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                    currentValue === option.value ? "border-bg" : "border-stone-700 group-hover:border-stone-500"
                  )}>
                    {currentValue === option.value && <div className="w-2.5 h-2.5 bg-bg rounded-full" />}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center bg-bg-alt/50 backdrop-blur-sm p-4 border border-white/5">
          <button
            onClick={() => step > 0 && setStep(s => s - 1)}
            disabled={step === 0}
            className={cn(
              "text-stone-500 hover:text-white transition-colors flex items-center gap-2 font-mono text-xs px-4 py-2",
              step === 0 && "opacity-20 cursor-not-allowed"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            PREVIOUS QUESTION
          </button>
          <div className="mono-label opacity-30 text-[10px]">
            SECURE INPUT MODE
          </div>
        </div>
      </div>
    </div>
  );
}
