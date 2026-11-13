import { useState } from 'react';
import { Search } from 'lucide-react';
import { goals } from '../data/mockData';

export default function MapPage() {
  const [search, setSearch] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<string | null>('8');
  const [activeTab, setActiveTab] = useState<'goals' | 'compounds' | 'pathways'>('goals');

  const selectedGoalData = goals.find(g => g.id === selectedGoal);
  const goalCompounds = selectedGoalData?.compounds || [];

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="overline mb-1">RESEARCH / MAP</div>
        <h1 className="text-2xl font-bold text-white mb-1">Pathway Map</h1>
        <p className="text-text-secondary text-sm mb-5">Explore connections between compounds, pathways, and biological goals.</p>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-meta" />
          <input
            type="text"
            placeholder="Search any compound, pathway or goal…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-bg-panel border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-meta focus:outline-none focus:border-accent/50"
          />
        </div>

        <div className="text-xs text-text-meta mb-4 font-mono">
          {goals.reduce((a, g) => a + g.compounds.length, 0)} compounds · {goals.length} pathways
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-6">
          {goals.map(g => (
            <button
              key={g.id}
              onClick={() => setSelectedGoal(g.id)}
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full border transition-all ${
                selectedGoal === g.id ? 'border-current opacity-100 scale-105' : 'border-border opacity-60 hover:opacity-100'
              }`}
              style={{ color: g.color, borderColor: selectedGoal === g.id ? g.color : undefined }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: g.color }} />
              {g.name}
            </button>
          ))}
        </div>

        {/* Graph visualization */}
        <div className="bg-bg-card border border-border rounded-xl p-6 min-h-[400px] relative overflow-hidden">
          <svg className="w-full h-[400px]" viewBox="0 0 800 400">
            {/* Compound nodes (left) */}
            {goalCompounds.map((comp, i) => {
              const y = 50 + (i * (300 / Math.max(goalCompounds.length - 1, 1)));
              return (
                <g key={comp}>
                  <rect
                    x="40"
                    y={y - 15}
                    width="140"
                    height="30"
                    rx="6"
                    fill="#191D24"
                    stroke={selectedGoalData?.color || '#58A6FF'}
                    strokeWidth="1"
                    opacity="0.9"
                  />
                  <text
                    x="110"
                    y={y + 4}
                    textAnchor="middle"
                    fill="#E6E8EB"
                    fontSize="11"
                    fontFamily="Inter"
                  >
                    {comp}
                  </text>
                  {/* Connection curves */}
                  {goals.filter(g => g.compounds.includes(comp)).map((goal, gi) => {
                    const targetY = 50 + (gi * 60) + 30;
                    return (
                      <path
                        key={goal.id}
                        d={`M 180 ${y} C 400 ${y}, 400 ${targetY}, 580 ${targetY}`}
                        fill="none"
                        stroke={goal.color}
                        strokeWidth="2"
                        opacity={selectedGoal === goal.id ? 0.8 : 0.2}
                      />
                    );
                  })}
                </g>
              );
            })}

            {/* Pathway/Goal nodes (right) */}
            {goals.map((goal, i) => {
              const y = 50 + (i * 35);
              return (
                <g key={goal.id}>
                  <rect
                    x="580"
                    y={y - 12}
                    width="180"
                    height="24"
                    rx="6"
                    fill="#191D24"
                    stroke={goal.color}
                    strokeWidth={selectedGoal === goal.id ? 2 : 1}
                    opacity={selectedGoal === goal.id ? 1 : 0.5}
                  />
                  <text
                    x="670"
                    y={y + 4}
                    textAnchor="middle"
                    fill={selectedGoal === goal.id ? goal.color : '#9AA3AD'}
                    fontSize="10"
                    fontFamily="Inter"
                  >
                    {goal.name}
                  </text>
                </g>
              );
            })}

            {/* Animated particles */}
            {selectedGoal && goalCompounds.length > 0 && (
              <>
                {goalCompounds.map((_, i) => {
                  const y = 50 + (i * (300 / Math.max(goalCompounds.length - 1, 1)));
                  return (
                    <circle key={i} r="3" fill={selectedGoalData?.color || '#58A6FF'} opacity="0.8">
                      <animateMotion
                        dur={`${2 + i * 0.5}s`}
                        repeatCount="indefinite"
                        path={`M 180 ${y} C 400 ${y}, 400 ${y}, 580 ${y}`}
                      />
                    </circle>
                  );
                })}
              </>
            )}
          </svg>

          {/* Info overlay */}
          {!selectedGoal && (
            <div className="absolute inset-0 flex items-center justify-center bg-bg-card/80">
              <p className="text-text-meta text-sm">Tap a goal or compound to see the pathway network</p>
            </div>
          )}
        </div>
      </div>

      {/* Left panel */}
      <div className="w-64 border-l border-border p-4 overflow-y-auto flex-shrink-0 hidden lg:block">
        {/* Tabs */}
        <div className="flex bg-bg-panel rounded-lg p-0.5 mb-4">
          {(['goals', 'compounds', 'pathways'] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${
                activeTab === t ? 'bg-bg-card text-white' : 'text-text-meta hover:text-text-secondary'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)} ({t === 'goals' ? goals.length : t === 'compounds' ? 12 : 8})
            </button>
          ))}
        </div>

        {activeTab === 'goals' && (
          <div className="space-y-1">
            {goals.map(g => (
              <button
                key={g.id}
                onClick={() => setSelectedGoal(g.id)}
                className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors ${
                  selectedGoal === g.id ? 'bg-accent/10 text-white' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: g.color }} />
                <span className="truncate">{g.name}</span>
                <span className="ml-auto text-text-meta font-mono">{g.compounds.length}</span>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'compounds' && (
          <div className="space-y-1">
            {goalCompounds.map(c => (
              <div key={c} className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-text-secondary">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>{c}</span>
              </div>
            ))}
            {goalCompounds.length === 0 && (
              <p className="text-xs text-text-meta px-2">Select a goal to see compounds</p>
            )}
          </div>
        )}

        {activeTab === 'pathways' && (
          <div className="space-y-1">
            {['Dopamine', 'Serotonin', 'GABA', 'Glutamate', 'mTOR', 'AMPK', 'NGF', 'NO system'].map(p => (
              <div key={p} className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-text-secondary">
                <span className="w-2 h-2 rounded-full bg-accent-purple" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
