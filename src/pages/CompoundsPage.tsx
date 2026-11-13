import { useState } from 'react';
import { Search, FlaskConical, ArrowRight } from 'lucide-react';
import { compounds, categories } from '../data/mockData';
import type { Compound } from '../data/mockData';

function EvidenceBadge({ evidence }: { evidence: string }) {
  const colors = {
    human: 'bg-accent-green/10 text-accent-green',
    preclinical: 'bg-accent-orange/10 text-accent-orange',
    limited: 'bg-accent-yellow/10 text-accent-yellow',
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colors[evidence as keyof typeof colors]}`}>
      {evidence}
    </span>
  );
}

function CompoundProfile({ compound, onClose }: { compound: Compound; onClose: () => void }) {
  const [tab, setTab] = useState('overview');
  const tabs = ['Overview', 'Mechanisms', 'Interactions', 'Dosing', 'Studies', 'Safety'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-modal bg-black/60" onClick={onClose}>
      <div className="bg-bg-card border border-border rounded-xl w-full max-w-3xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent-purple/20 flex items-center justify-center">
              <FlaskConical size={24} className="text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{compound.name}</h2>
              <p className="text-xs text-text-meta">{compound.synonyms.join(' · ')}</p>
            </div>
            <div className="ml-auto">
              <EvidenceBadge evidence={compound.evidence} />
            </div>
          </div>
          <div className="flex gap-1">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setTab(t.toLowerCase())}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  tab === t.toLowerCase() ? 'bg-accent/10 text-accent' : 'text-text-meta hover:text-text-secondary'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">
          {tab === 'overview' && (
            <div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{compound.description}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-bg-panel rounded-lg p-3">
                  <div className="overline mb-2">Class</div>
                  <p className="text-sm text-text-secondary">{compound.class}</p>
                </div>
                <div className="bg-bg-panel rounded-lg p-3">
                  <div className="overline mb-2">Evidence Level</div>
                  <EvidenceBadge evidence={compound.evidence} />
                </div>
              </div>
            </div>
          )}
          {tab === 'mechanisms' && (
            <div className="space-y-2">
              {compound.mechanisms.map((m, i) => (
                <div key={i} className="flex items-center gap-3 bg-bg-panel rounded-lg px-3 py-2.5">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm text-text-secondary">{m}</span>
                </div>
              ))}
            </div>
          )}
          {tab === 'interactions' && (
            <div className="space-y-2">
              {compound.interactions.map((m, i) => (
                <div key={i} className="flex items-center gap-3 bg-bg-panel rounded-lg px-3 py-2.5">
                  <div className="w-2 h-2 rounded-full bg-accent-orange" />
                  <span className="text-sm text-text-secondary">{m}</span>
                </div>
              ))}
            </div>
          )}
          {!['overview', 'mechanisms', 'interactions'].includes(tab) && (
            <div className="text-center py-12 text-text-meta text-sm">
              {tab === 'dosing' && 'Dosing protocols vary by compound and indication. Consult research literature.'}
              {tab === 'studies' && 'Related studies will appear here.'}
              {tab === 'safety' && 'Safety profile data compiled from available literature.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CompoundsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCompound, setSelectedCompound] = useState<Compound | null>(null);

  const filtered = compounds.filter(c => {
    const matchSearch = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.class.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !selectedCategory || c.class === selectedCategory;
    return matchSearch && matchCategory;
  });

  const compoundClasses = [...new Set(compounds.map(c => c.class))];

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="overline mb-1">TOOLS / COMPOUNDS</div>
      <h1 className="text-2xl font-bold text-white mb-1">Compounds</h1>
      <p className="text-text-secondary text-sm mb-5">Browse the full database of compounds with mechanisms, interactions, and evidence levels.</p>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-meta" />
        <input
          type="text"
          placeholder="Search compounds — name, class, or what it does…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-bg-panel border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-meta focus:outline-none focus:border-accent/50"
        />
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setSelectedCategory('')}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            !selectedCategory ? 'border-accent text-accent bg-accent/10' : 'border-border text-text-secondary hover:text-text-primary'
          }`}
        >
          All ({compounds.length})
        </button>
        {compoundClasses.map(cat => {
          const count = compounds.filter(c => c.class === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                selectedCategory === cat ? 'border-accent text-accent bg-accent/10' : 'border-border text-text-secondary hover:text-text-primary'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs text-text-meta">
        <span>{filtered.length} compounds · click any compound for the full breakdown</span>
        <div className="flex items-center gap-3 ml-auto">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-green" /> Human</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-orange" /> Preclinical</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-yellow" /> Limited</span>
        </div>
      </div>

      {/* Compound grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map(compound => (
          <div
            key={compound.id}
            onClick={() => setSelectedCompound(compound)}
            className="bg-bg-card border border-border rounded-xl p-4 hover:border-accent/30 cursor-pointer transition-colors group"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/10 to-accent-purple/10 flex items-center justify-center flex-shrink-0">
                <FlaskConical size={18} className="text-accent" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white group-hover:text-accent transition-colors">{compound.name}</h3>
                <p className="text-[10px] text-text-meta truncate">{compound.synonyms[0]}</p>
              </div>
            </div>
            <p className="text-xs text-text-secondary line-clamp-2 mb-3">{compound.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[10px] text-text-meta">
                <span>{compound.mechanisms.length} mechanisms</span>
                <span>{compound.interactions.length} interactions</span>
              </div>
              <EvidenceBadge evidence={compound.evidence} />
            </div>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Full profile</span>
              <ArrowRight size={10} />
            </div>
          </div>
        ))}
      </div>
      
      {selectedCompound && <CompoundProfile compound={selectedCompound} onClose={() => setSelectedCompound(null)} />}
    </div>
  );
}
