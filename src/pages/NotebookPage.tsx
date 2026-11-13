import { useState } from 'react';
import { Search, Plus, Bold, Italic, Code, Heading2, Quote, List, Tag, FileText } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  tagColors: Record<string, string>;
  compounds: string[];
  updatedAt: string;
}

const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Dopamine stacking ideas',
    content: '# Dopamine Stack Notes\n\nConsidering a combination approach for cognitive enhancement:\n\n- **L-Tyrosine** (500mg) — precursor\n- **9-Me-BC** — neurogenesis\n- [[Creatine]] — ATP support\n\n> The key is to support the full dopamine lifecycle, not just one step.\n\n## Interactions to watch\n- Avoid with MAOIs\n- Monitor for overstimulation\n\n#dopamine #stack #nootropics',
    tags: ['dopamine', 'stack', 'nootropics'],
    tagColors: { dopamine: '#58A6FF', stack: '#A371F7', nootropics: '#3FB950' },
    compounds: ['9-Me-BC', 'Creatine', 'L-Tyrosine'],
    updatedAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'mTOR pathway research',
    content: '# mTOR Inhibition Notes\n\nKey findings from recent studies:\n\n1. **Rapamycin** — most studied mTORC1 inhibitor\n2. Intermittent dosing may reduce side effects\n3. [[Metformin]] has indirect mTOR inhibition via AMPK\n\n## Open questions\n- Optimal dosing schedule?\n- Long-term immune effects?\n\n#longevity #mtor #rapamycin',
    tags: ['longevity', 'mtor', 'rapamycin'],
    tagColors: { longevity: '#3FB950', mtor: '#D29922', rapamycin: '#F85149' },
    compounds: ['Rapamycin', 'Metformin'],
    updatedAt: '2024-03-14',
  },
  {
    id: '3',
    title: 'GABA system overview',
    content: '# GABA Receptors\n\n## GABA-A\n- Ionotropic (Cl- channel)\n- Targets: benzodiazepines, alcohol, [[Phenibut]] (partial)\n- Fast inhibitory signaling\n\n## GABA-B\n- Metabotropic (G-protein coupled)\n- Targets: baclofen, [[Phenibut]] (full agonist)\n- Slower, modulatory effects\n\n#GABA #receptors #pharmacology',
    tags: ['GABA', 'receptors', 'pharmacology'],
    tagColors: { GABA: '#F85149', receptors: '#58A6FF', pharmacology: '#A371F7' },
    compounds: ['Phenibut'],
    updatedAt: '2024-03-12',
  },
];

export default function NotebookPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(initialNotes[0]);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'all' | 'quotes'>('all');
  const [editMode, setEditMode] = useState<'markdown' | 'preview' | 'focus'>('markdown');

  const filteredNotes = notes.filter(n => 
    !search || n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled note',
      content: '',
      tags: [],
      tagColors: {},
      compounds: [],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : n));
    if (selectedNote?.id === id) {
      setSelectedNote({ ...selectedNote, ...updates });
    }
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/^### (.+)$/gm, '<h3 class="text-sm font-semibold text-white mt-3 mb-1">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-base font-semibold text-white mt-4 mb-2">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-lg font-bold text-white mt-4 mb-2">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
      .replace(/\[\[(.+?)\]\]/g, '<span class="text-accent bg-accent/10 px-1 rounded cursor-pointer">$1</span>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-accent pl-3 text-text-secondary italic my-2">$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li class="text-text-secondary ml-4 list-disc">$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="text-text-secondary ml-4 list-decimal">$1</li>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="flex h-full">
      {/* Left panel - note list */}
      <div className="w-64 border-r border-border flex flex-col flex-shrink-0">
        <div className="p-3 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="overline">YOUR PRIVATE KNOWLEDGE BASE</div>
            <button onClick={createNote} className="p-1 rounded hover:bg-white/5 text-text-meta hover:text-accent">
              <Plus size={14} />
            </button>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-meta" />
            <input
              type="text"
              placeholder="Search your notes"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-bg-panel border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-meta focus:outline-none focus:border-accent/50"
            />
          </div>
          <div className="flex gap-1 mt-2">
            <button
              onClick={() => setView('all')}
              className={`flex-1 text-[10px] py-1 rounded ${view === 'all' ? 'bg-accent/10 text-accent' : 'text-text-meta'}`}
            >
              All notes ({notes.length})
            </button>
            <button
              onClick={() => setView('quotes')}
              className={`flex-1 text-[10px] py-1 rounded ${view === 'quotes' ? 'bg-accent/10 text-accent' : 'text-text-meta'}`}
            >
              Quote index (2)
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {filteredNotes.map(note => (
            <button
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`w-full text-left p-2.5 rounded-lg mb-1 transition-colors ${
                selectedNote?.id === note.id ? 'bg-accent/10 border border-accent/20' : 'hover:bg-white/5'
              }`}
            >
              <div className="text-xs font-medium text-white truncate">{note.title}</div>
              <div className="text-[10px] text-text-meta mt-0.5 truncate">
                {note.content.replace(/[#*>\[\]]/g, '').slice(0, 60)}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {note.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="w-1.5 h-1.5 rounded-full" style={{ background: note.tagColors[tag] || '#58A6FF' }} />
                ))}
                <span className="text-[9px] text-text-meta ml-auto">{note.updatedAt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedNote ? (
          <>
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <input
                type="text"
                value={selectedNote.title}
                onChange={e => updateNote(selectedNote.id, { title: e.target.value })}
                className="bg-transparent text-sm font-semibold text-white focus:outline-none flex-1"
              />
              <div className="flex items-center gap-1">
                <div className="flex bg-bg-panel rounded-lg p-0.5 mr-2">
                  {(['markdown', 'preview', 'focus'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setEditMode(mode)}
                      className={`px-2 py-1 text-[10px] rounded-md font-medium capitalize ${
                        editMode === mode ? 'bg-bg-card text-white' : 'text-text-meta'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                <button className="p-1.5 rounded hover:bg-white/5 text-text-meta hover:text-text-primary"><Bold size={14} /></button>
                <button className="p-1.5 rounded hover:bg-white/5 text-text-meta hover:text-text-primary"><Italic size={14} /></button>
                <button className="p-1.5 rounded hover:bg-white/5 text-text-meta hover:text-text-primary"><Code size={14} /></button>
                <button className="p-1.5 rounded hover:bg-white/5 text-text-meta hover:text-text-primary"><Heading2 size={14} /></button>
                <button className="p-1.5 rounded hover:bg-white/5 text-text-meta hover:text-text-primary"><Quote size={14} /></button>
                <button className="p-1.5 rounded hover:bg-white/5 text-text-meta hover:text-text-primary"><List size={14} /></button>
                <button className="p-1.5 rounded hover:bg-white/5 text-text-meta hover:text-text-primary"><Tag size={14} /></button>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-4">
              {editMode === 'markdown' && (
                <textarea
                  value={selectedNote.content}
                  onChange={e => updateNote(selectedNote.id, { content: e.target.value })}
                  placeholder="Start writing. Use Markdown for structure, #tags to organize ideas, and [[Note Title]] to connect your thinking."
                  className="w-full h-full bg-transparent text-sm text-text-secondary font-mono leading-relaxed resize-none focus:outline-none placeholder:text-text-meta"
                />
              )}
              {editMode === 'preview' && (
                <div 
                  className="text-sm text-text-secondary leading-relaxed prose-sm"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(selectedNote.content) }}
                />
              )}
              {editMode === 'focus' && (
                <div className="max-w-2xl mx-auto">
                  <textarea
                    value={selectedNote.content}
                    onChange={e => updateNote(selectedNote.id, { content: e.target.value })}
                    className="w-full h-full bg-transparent text-sm text-text-secondary leading-relaxed resize-none focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Bottom bar */}
            <div className="border-t border-border px-4 py-2">
              <div className="flex items-center gap-4">
                <div>
                  <div className="overline mb-1">TAGS</div>
                  <div className="flex items-center gap-1.5">
                    {selectedNote.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-bg-panel">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: selectedNote.tagColors[tag] || '#58A6FF' }} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {selectedNote.compounds.length > 0 && (
                  <div>
                    <div className="overline mb-1">CONNECTED COMPOUNDS</div>
                    <div className="flex items-center gap-1.5">
                      {selectedNote.compounds.map(c => (
                        <span key={c} className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent-purple/10 text-accent-purple">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-text-meta text-sm">
            <div className="text-center">
              <FileText size={32} className="mx-auto mb-2 opacity-30" />
              <p>Select a note or create a new one</p>
              <p className="text-xs mt-1">⌘N to create</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
