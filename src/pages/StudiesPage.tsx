import { useState } from 'react';
import { Search, Bookmark, ExternalLink, X, Copy, ChevronDown } from 'lucide-react';
import { studies, studyTypes } from '../data/mockData';
import type { Study } from '../data/mockData';

function QualityDots({ quality }: { quality: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className={`quality-dot ${i <= quality ? 'active' : ''}`} />
      ))}
    </div>
  );
}

function StudyModal({ study, onClose }: { study: Study; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('abstract');
  const tabs = ['Full paper', 'Abstract', 'Details', 'Contribute', 'Comments', 'Video'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-modal bg-black/60" onClick={onClose}>
      <div className="bg-bg-card border border-border rounded-xl w-full max-w-3xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="overline">{study.category}</span>
              <span className="text-xs text-text-meta font-mono">{study.year}</span>
              <QualityDots quality={study.quality} />
            </div>
            <h2 className="text-lg font-semibold text-white leading-tight">{study.title}</h2>
          </div>
          <div className="flex gap-1">
            <button className="p-2 rounded-lg hover:bg-white/5 text-text-meta hover:text-accent"><Bookmark size={16} /></button>
            <button className="p-2 rounded-lg hover:bg-white/5 text-text-meta hover:text-accent"><Copy size={16} /></button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-text-meta hover:text-text-primary"><X size={16} /></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-5">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                activeTab === tab.toLowerCase()
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-meta hover:text-text-secondary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5">
          {activeTab === 'abstract' && (
            <div>
              <p className="text-sm text-text-secondary leading-relaxed">{study.abstract}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {study.tags.map(tag => (
                  <span key={tag} className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">{tag}</span>
                ))}
                {study.compounds.map(c => (
                  <span key={c} className="text-xs bg-accent-purple/10 text-accent-purple px-2 py-0.5 rounded-full">{c}</span>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="bg-bg-panel rounded-lg p-4">
                <div className="overline mb-2">Citation</div>
                <p className="text-sm text-text-secondary">
                  {study.authors.join(', ')}. <em>{study.journal}</em>. {study.year};{study.volume}{study.issue ? `(${study.issue})` : ''}:{study.pages}.
                </p>
                <div className="mt-3 space-y-1 text-xs text-text-meta">
                  <p>PMID: {study.pmid}</p>
                  <p>DOI: <a href={`https://doi.org/${study.doi}`} className="text-accent hover:underline">{study.doi}</a></p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-bg-panel rounded-lg p-3">
                  <div className="overline mb-1">Study Type</div>
                  <p className="text-sm text-text-secondary">{study.studyType}</p>
                </div>
                <div className="bg-bg-panel rounded-lg p-3">
                  <div className="overline mb-1">Quality</div>
                  <QualityDots quality={study.quality} />
                </div>
              </div>
            </div>
          )}
          {activeTab === 'full paper' && (
            <div className="text-center py-12">
              <p className="text-text-meta text-sm">Full text available via PubMed Central</p>
              <a href="#" className="text-accent text-sm hover:underline mt-2 inline-block">Open in PubMed →</a>
            </div>
          )}
          {!['abstract', 'details', 'full paper'].includes(activeTab) && (
            <div className="text-center py-12">
              <p className="text-text-meta text-sm">Coming soon</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border text-xs text-text-meta">
          <a href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`} className="text-accent hover:underline flex items-center gap-1">
            PubMed <ExternalLink size={10} />
          </a>
          <span>{study.readMinutes} min read</span>
        </div>
      </div>
    </div>
  );
}

export default function StudiesPage() {
  const [search, setSearch] = useState('');
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filtered = studies.filter(s => {
    const matchSearch = !search || 
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.abstract.toLowerCase().includes(search.toLowerCase()) ||
      s.authors.some(a => a.toLowerCase().includes(search.toLowerCase()));
    const matchType = selectedTypes.length === 0 || selectedTypes.includes(s.studyType);
    const matchCategory = !selectedCategory || s.category === selectedCategory;
    return matchSearch && matchType && matchCategory;
  });

  const allCategories = [...new Set(studies.map(s => s.category))];
  const allCompounds = [...new Set(studies.flatMap(s => s.compounds))];
  const allPathways = [...new Set(studies.flatMap(s => s.pathways))];

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="overline mb-1">RESEARCH / STUDIES</div>
        <h1 className="text-2xl font-bold text-white mb-1">Studies Library</h1>
        <p className="text-text-secondary text-sm mb-5">Evidence-based research indexed from PubMed. Filter by category, compound, or study type.</p>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-meta" />
          <input
            type="text"
            placeholder="Search studies, authors, journals…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-bg-panel border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-meta focus:outline-none focus:border-accent/50"
          />
        </div>
        <p className="text-xs text-text-meta mb-4">Title, abstract, authors, journal, year, tags</p>

        <div className="text-xs text-text-meta mb-4 font-mono">
          {filtered.length} results · page 1 of 1
        </div>

        {/* Study cards */}
        <div className="grid gap-3">
          {filtered.map(study => (
            <div
              key={study.id}
              onClick={() => setSelectedStudy(study)}
              className="bg-bg-card border border-border rounded-xl p-4 hover:border-accent/30 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="overline">{study.category}</span>
                  <span className="text-[10px] bg-bg-panel text-text-meta px-1.5 py-0.5 rounded font-mono">{study.year}</span>
                  <QualityDots quality={study.quality} />
                </div>
                <button className="p-1 rounded hover:bg-white/5 text-text-meta hover:text-accent">
                  <Bookmark size={14} />
                </button>
              </div>
              <h3 className="text-sm font-medium text-white mb-2 leading-snug">{study.title}</h3>
              <p className="text-xs text-text-secondary line-clamp-2 mb-3">{study.abstract}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {study.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full">{tag}</span>
                ))}
                {study.compounds.map(c => (
                  <span key={c} className="text-[10px] bg-accent-purple/10 text-accent-purple px-1.5 py-0.5 rounded-full">{c}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] text-text-meta">
                <span>{study.journal}</span>
                <span>{study.readMinutes} min read</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right filter rail */}
      <div className="w-64 border-l border-border p-4 overflow-y-auto flex-shrink-0 hidden lg:block">
        <h3 className="text-xs font-semibold text-text-secondary mb-3">FILTERS</h3>
        
        <div className="mb-5">
          <div className="overline mb-2">CATEGORY</div>
          {allCategories.map(cat => {
            const count = studies.filter(s => s.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                className={`w-full flex items-center justify-between px-2 py-1 rounded text-xs transition-colors ${
                  selectedCategory === cat ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <span>{cat}</span>
                <span className="text-text-meta font-mono">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="mb-5">
          <div className="overline mb-2">COMPOUNDS</div>
          {allCompounds.slice(0, 8).map(comp => {
            const count = studies.filter(s => s.compounds.includes(comp)).length;
            return (
              <div key={comp} className="flex items-center justify-between px-2 py-1 text-xs text-text-secondary">
                <span>{comp}</span>
                <span className="text-text-meta font-mono">{count}</span>
              </div>
            );
          })}
        </div>

        <div className="mb-5">
          <div className="overline mb-2">STUDY TYPE</div>
          {studyTypes.map(type => {
            const count = studies.filter(s => s.studyType === type).length;
            const isSelected = selectedTypes.includes(type);
            return (
              <button
                key={type}
                onClick={() => setSelectedTypes(isSelected ? selectedTypes.filter(t => t !== type) : [...selectedTypes, type])}
                className={`w-full flex items-center justify-between px-2 py-1 rounded text-xs transition-colors ${
                  isSelected ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <span>{type}</span>
                <span className="text-text-meta font-mono">{count}</span>
              </button>
            );
          })}
        </div>

        <div>
          <div className="overline mb-2">PATHWAY</div>
          {allPathways.map(pw => {
            const count = studies.filter(s => s.pathways.includes(pw)).length;
            return (
              <div key={pw} className="flex items-center justify-between px-2 py-1 text-xs text-text-secondary">
                <span>{pw}</span>
                <span className="text-text-meta font-mono">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedStudy && <StudyModal study={selectedStudy} onClose={() => setSelectedStudy(null)} />}
    </div>
  );
}
