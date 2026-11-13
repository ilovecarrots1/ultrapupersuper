import { useState } from 'react';
import { Search, RotateCw, Eye, Maximize2 } from 'lucide-react';
import { receptors } from '../data/mockData';

const receptorClasses = [
  { name: 'GABA', subtypes: ['GABA-A', 'GABA-B'], color: '#F85149' },
  { name: 'GLUTAMATE', subtypes: ['NMDA', 'AMPA', 'mGluR'], color: '#58A6FF' },
  { name: 'CANNABINOID', subtypes: ['CB1', 'CB2'], color: '#3FB950' },
  { name: 'MONOAMINES', subtypes: ['D1', 'D2', 'D3', '5-HT1A', '5-HT2A', '5-HT2B', '5-HT6', '5-HT7', 'DAT', 'SERT'], color: '#A371F7' },
  { name: 'OPIOID', subtypes: ['μ (MOR)', 'κ (KOR)', 'δ (DOR)'], color: '#D29922' },
  { name: 'ACETYLCHOLINE', subtypes: ['M1', 'M2', 'nAChR'], color: '#F778BA' },
  { name: 'OTHER', subtypes: ['Sigma-1', 'TAAR1', 'Trace Amine'], color: '#39D2C0' },
];

export default function BrainPage() {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [rotating, setRotating] = useState(true);
  const [pulse, setPulse] = useState(true);
  const [showNodes, setShowNodes] = useState(true);
  const [view, setView] = useState<'front' | 'side' | 'top'>('front');

  const selectedClassData = receptorClasses.find(c => c.name === selectedClass);
  const classReceptors = receptors.filter(r => selectedClass && r.class === selectedClass);

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="overline mb-1">RESEARCH / BRAIN ATLAS</div>
        <h1 className="text-2xl font-bold text-white mb-1">3D Brain Atlas</h1>
        <p className="text-text-secondary text-sm mb-5">Interactive brain atlas with receptor locations and ligand mappings.</p>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-meta" />
          <input
            type="text"
            placeholder="Search the brain atlas"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-bg-panel border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-meta focus:outline-none focus:border-accent/50"
          />
        </div>

        <div className="text-xs text-text-meta mb-4 font-mono">
          {receptors.length} targets · {receptorClasses.reduce((a, c) => a + c.subtypes.length, 0)} regions
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex bg-bg-panel rounded-lg p-0.5">
            {(['front', 'side', 'top'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                  view === v ? 'bg-bg-card text-white' : 'text-text-meta hover:text-text-secondary'
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setRotating(!rotating)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs border transition-colors ${
                rotating ? 'border-accent text-accent bg-accent/10' : 'border-border text-text-meta'
              }`}
            >
              <RotateCw size={12} /> Rotate
            </button>
            <button
              onClick={() => setPulse(!pulse)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs border transition-colors ${
                pulse ? 'border-accent text-accent bg-accent/10' : 'border-border text-text-meta'
              }`}
            >
              <Eye size={12} /> Pulse
            </button>
            <button
              onClick={() => setShowNodes(!showNodes)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs border transition-colors ${
                showNodes ? 'border-accent text-accent bg-accent/10' : 'border-border text-text-meta'
              }`}
            >
              Nodes
            </button>
          </div>
        </div>

        {/* Brain visualization */}
        <div className="bg-bg-card border border-border rounded-xl p-6 min-h-[450px] relative overflow-hidden">
          <svg 
            className="w-full h-[400px]" 
            viewBox="0 0 600 400"
            style={{ transform: view === 'side' ? 'rotateY(45deg)' : view === 'top' ? 'rotateX(30deg)' : 'none', transition: 'transform 0.5s' }}
          >
            {/* Brain outline */}
            <defs>
              <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#58A6FF" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#58A6FF" stopOpacity="0" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Brain shape - sagittal */}
            <ellipse cx="300" cy="200" rx="180" ry="150" fill="url(#brainGlow)" stroke="#262B33" strokeWidth="1" />
            <path 
              d="M 150 200 Q 150 100 250 80 Q 350 60 420 100 Q 480 140 470 200 Q 460 280 380 320 Q 300 350 220 320 Q 150 280 150 200"
              fill="none"
              stroke="#262B33"
              strokeWidth="1.5"
              opacity="0.6"
            />
            {/* Cerebellum */}
            <ellipse cx="400" cy="300" rx="60" ry="40" fill="none" stroke="#262B33" strokeWidth="1" opacity="0.4" />
            
            {/* Fiber tracts */}
            <path d="M 200 180 Q 280 160 350 180" fill="none" stroke="#58A6FF" strokeWidth="0.5" opacity="0.3" />
            <path d="M 220 220 Q 300 200 380 220" fill="none" stroke="#58A6FF" strokeWidth="0.5" opacity="0.3" />
            <path d="M 240 260 Q 310 240 370 260" fill="none" stroke="#58A6FF" strokeWidth="0.5" opacity="0.2" />

            {/* Receptor nodes */}
            {showNodes && receptors.map((rec, i) => {
              const angle = (i / receptors.length) * Math.PI * 2;
              const rx = 300 + Math.cos(angle) * (80 + (i % 3) * 40);
              const ry = 200 + Math.sin(angle) * (60 + (i % 3) * 30);
              const classData = receptorClasses.find(c => c.name === rec.class);
              const isSelected = selectedClass === rec.class;
              
              return (
                <g key={rec.id}>
                  <circle
                    cx={rx}
                    cy={ry}
                    r={isSelected ? 6 : 4}
                    fill={classData?.color || '#58A6FF'}
                    opacity={isSelected ? 1 : 0.6}
                    filter={isSelected ? 'url(#glow)' : undefined}
                    className={pulse ? 'pulse-glow' : ''}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                  {isSelected && (
                    <text
                      x={rx}
                      y={ry - 10}
                      textAnchor="middle"
                      fill={classData?.color}
                      fontSize="8"
                      fontFamily="Inter"
                    >
                      {rec.name}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Rotation animation */}
            {rotating && (
              <circle cx="300" cy="200" r="160" fill="none" stroke="#58A6FF" strokeWidth="0.3" opacity="0.2" strokeDasharray="4 4">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 300 200"
                  to="360 300 200"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </svg>
        </div>
      </div>

      {/* Right filter rail */}
      <div className="w-64 border-l border-border p-4 overflow-y-auto flex-shrink-0 hidden lg:block">
        <h3 className="text-xs font-semibold text-text-secondary mb-3">RECEPTOR CLASS</h3>
        
        {receptorClasses.map(cls => (
          <div key={cls.name} className="mb-3">
            <button
              onClick={() => setSelectedClass(selectedClass === cls.name ? null : cls.name)}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-colors ${
                selectedClass === cls.name ? 'bg-white/5 text-white' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: cls.color }} />
                <span className="font-medium">{cls.name}</span>
              </div>
              <span className="text-text-meta font-mono">{cls.subtypes.length}</span>
            </button>
            
            {selectedClass === cls.name && (
              <div className="ml-4 mt-1 space-y-0.5">
                {cls.subtypes.map(sub => (
                  <div key={sub} className="flex items-center justify-between px-2 py-1 text-[11px] text-text-meta">
                    <span>{sub}</span>
                    <span className="text-text-meta">
                      {receptors.filter(r => r.class === cls.name && r.subtype === sub).length || '—'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Ligand info */}
        {selectedClassData && classReceptors.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="overline mb-2">LIGANDS</div>
            {classReceptors.map(rec => (
              <div key={rec.id} className="mb-2">
                <div className="text-xs text-text-secondary font-medium">{rec.name}</div>
                <div className="text-[10px] text-text-meta">{rec.region}</div>
                {rec.ligands.map((l, i) => (
                  <div key={i} className="text-[10px] text-accent ml-2">
                    {l.compound} — {l.action}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
