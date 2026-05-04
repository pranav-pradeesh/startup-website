/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Landing from './components/Landing';
import Survey from './components/Survey';
import Result from './components/Result';
import Dashboard from './components/Dashboard';
import InsightDetails from './components/InsightDetails';
import type { View, SurveyResponse, BurnoutResult, Insight } from './types';

const MOCK_INSIGHTS: Insight[] = [
  {
    id: '1',
    problem: 'Excessive Context Switching',
    breakdown: 'A significant portion of the Engineering team reports deep work sessions being interrupted by un-triaged support requests, leading to "attention residue" and exhaustion.',
    solutions: [
      'Implement a "Duty Officer" rotation to handle all incoming interruptions.',
      'Mandate 4-hour "Interruption-Free" blocks across the department.',
      'Audit Slack channel density and consolidate redundant notifications.'
    ],
    preventiveActions: [
      'Bi-weekly workload reviews focusing on unplanned task ratios.',
      'Onboarding training for stakeholders on the priority triage system.'
    ],
    beforeStats: '72% High Stress',
    afterStats: '22% Expected Stress',
    suggestion: 'Adopt a rotating on-call system for non-critical triage.',
    impactScore: 85
  },
  {
    id: '2',
    problem: 'Support Degradation Pattern',
    breakdown: 'Signals indicate a disconnect between recent leadership changes and middle management communication, causing a spike in "Isolation" metrics observed over 14 days.',
    solutions: [
      'Facilitate specific cross-tier feedback loops without upper management present.',
      'Standardize management support templates for weekly syncs.',
      'Provide additional coaching for new managers on psychosocial risk factors.'
    ],
    preventiveActions: [
      'Implement monthly peer-support groups for managers.',
      'Revised leadership-to-staff communication protocols.'
    ],
    beforeStats: '4.2 Avg Support',
    afterStats: '8.1 Projected Support',
    suggestion: 'Strengthen feedback loops between upper and middle management.',
    impactScore: 65
  }
];

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [surveyResult, setSurveyResult] = useState<BurnoutResult | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  const calculateBurnout = (data: SurveyResponse): BurnoutResult => {
    // EE: Q1, Q2 (Sum: 2-10)
    const ee = data.q1 + data.q2;
    // DP: Q3, Q4 (Sum: 2-10)
    const dp = data.q3 + data.q4;
    // PA: Q5, Q6 (Sum: 2-10) - High PA is GOOD, so we subtract from max to get burnout contribution
    const paBurnoutContribution = (12 - (data.q5 + data.q6));

    // Max possible "burnout" sum is 10 + 10 + 10 = 30
    // Min possible is 2 + 2 + 2 = 6
    const totalScore = ee + dp + paBurnoutContribution;
    const score = Math.min(100, Math.round(((totalScore - 6) / 24) * 100));
    
    let level: 'Low' | 'Medium' | 'High' = 'Low';
    let explanation = "";

    if (score > 66) {
      level = 'High';
      explanation = "High emotional exhaustion and depersonalization detect significant burnout risk. Immediate intervention and workload restructuring are prioritized.";
    } else if (score > 33) {
      level = 'Medium';
      explanation = "Substantial signs of burnout detected. Focus on restoring personal accomplishment and reducing emotional strain through targeted supportive measures.";
    } else {
      level = 'Low';
      explanation = "Psychosocial markers are within optimal ranges. Personal accomplishment remains high while exhaustion levels are low.";
    }

    return { score, riskLevel: level, explanation };
  };

  const handleSurveyComplete = (data: SurveyResponse) => {
    const result = calculateBurnout(data);
    setSurveyResult(result);
    setView('result');
  };

  return (
    <div className="bg-bg text-stone-200 min-h-screen selection:bg-gold/30">
      {view === 'landing' && (
        <Landing
          onStart={() => setView('survey')}
          onViewDashboard={() => setView('dashboard')}
        />
      )}

      {view === 'survey' && (
        <Survey
          onComplete={handleSurveyComplete}
          onBack={() => setView('landing')}
        />
      )}

      {view === 'result' && surveyResult && (
        <Result
          result={surveyResult}
          onRestart={() => setView('survey')}
          onViewDashboard={() => setView('dashboard')}
        />
      )}

      {view === 'dashboard' && (
        <Dashboard
          insights={MOCK_INSIGHTS}
          onViewInsight={(insight) => {
            setSelectedInsight(insight);
            setView('insight');
          }}
          onBack={() => setView('landing')}
        />
      )}

      {view === 'insight' && selectedInsight && (
        <InsightDetails
          insight={selectedInsight}
          onBack={() => setView('dashboard')}
        />
      )}
    </div>
  );
}
