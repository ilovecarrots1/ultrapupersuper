import { useState } from 'react';
import { Search, Lock, CheckCircle2, Circle, ChevronRight, BookOpen } from 'lucide-react';

const branches = [
  { id: '1', name: 'Foundations', concepts: 6, progress: 100, locked: false },
  { id: '2', name: 'Dopamine lifecycle', concepts: 4, progress: 75, locked: false },
  { id: '3', name: 'Dopamine receptors', concepts: 3, progress: 33, locked: false },
  { id: '4', name: 'Serotonin lifecycle', concepts: 3, progress: 0, locked: false },
  { id: '5', name: 'Serotonin receptors', concepts: 3, progress: 0, locked: true },
  { id: '6', name: 'Evidence & safety', concepts: 3, progress: 0, locked: true },
  { id: '7', name: 'Biosynthesis — enzyme lab', concepts: 2, progress: 0, locked: true },
];

const lessons = [
  { id: '1', title: 'What is a neuron?', branch: '1', status: 'done' },
  { id: '2', title: 'Neurotransmitter basics', branch: '1', status: 'done' },
  { id: '3', title: 'Receptor types overview', branch: '1', status: 'done' },
  { id: '4', title: 'Signal transduction', branch: '1', status: 'done' },
  { id: '5', title: 'Blood-brain barrier', branch: '1', status: 'done' },
  { id: '6', title: 'Neuroplasticity intro', branch: '1', status: 'done' },
  { id: '7', title: 'Dopamine synthesis', branch: '2', status: 'done' },
  { id: '8', title: 'Dopamine pathways', branch: '2', status: 'done' },
  { id: '9', title: 'Dopamine reuptake', branch: '2', status: 'done' },
  { id: '10', title: 'Dopamine & reward', branch: '2', status: 'available' },
  { id: '11', title: 'D1 receptor family', branch: '3', status: 'done' },
  { id: '12', title: 'D2 receptor family', branch: '3', status: 'available' },
  { id: '13', title: 'D3-D5 receptors', branch: '3', status: 'locked' },
];

export default function LearnPage() {
  const [selectedBranch, setSelectedBranch] = useState('1');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('list');
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);

  const currentBranch = branches.find(b => b.id === selectedBranch);
  const branchLessons = lessons.filter(l => l.branch === selectedBranch);
  const currentLesson = selectedLesson ? lessons.find(l => l.id === selectedLesson) : null;

  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(l => l.status === 'done').length;
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="overline mb-1">COURSE / NOOTROPICS</div>
            <h1 className="text-2xl font-bold text-white mb-1">Learn the brain, one connection at a time.</h1>
            <p className="text-text-secondary text-sm">Master neuropharmacology through structured lessons, skill trees, and interactive quizzes.</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold font-mono text-accent">{progress}%</div>
            <div className="text-xs text-text-meta">{completedLessons} / {totalLessons} lessons</div>
            <select className="mt-2 bg-bg-panel border border-border rounded-lg px-2 py-1 text-xs text-text-secondary">
              <option>Nootropics — 126 lessons</option>
              <option>Anabolic steroids — 88 lessons</option>
            </select>
          </div>
        </div>

        {/* Branches */}
        <div className="mb-6">
          <div className="overline mb-2">YOUR CURRICULUM</div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
            {branches.map(branch => (
              <button
                key={branch.id}
                onClick={() => { setSelectedBranch(branch.id); setSelectedLesson(null); }}
                className={`text-left p-3 rounded-xl border transition-colors ${
                  selectedBranch === branch.id 
                    ? 'border-accent bg-accent/5' 
                    : branch.locked 
                      ? 'border-border opacity-50 cursor-not-allowed' 
                      : 'border-border hover:border-accent/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-white">{branch.name}</span>
                  {branch.locked && <Lock size={12} className="text-text-meta" />}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-bg-panel rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all" 
                      style={{ width: `${branch.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-text-meta font-mono">{branch.concepts}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Lesson content or list */}
        {currentLesson ? (
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setSelectedLesson(null)} className="text-xs text-accent hover:underline">← Back to lessons</button>
            </div>
            <div className="overline mb-1">BRANCH 0{selectedBranch} · {currentBranch?.name}</div>
            <h2 className="text-xl font-bold text-white mb-4">{currentLesson.title}</h2>
            
            {/* Lesson sections */}
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">1. Introduction</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Neurotransmitters are chemical messengers that transmit signals across synapses between neurons. 
                  They are synthesized in the presynaptic neuron, stored in vesicles, and released into the synaptic cleft 
                  upon electrical stimulation. Each neurotransmitter has specific receptors it binds to, triggering 
                  downstream signaling cascades.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">2. Key Concepts</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Understanding the lifecycle of a neurotransmitter — from synthesis to release to reuptake or degradation — 
                  is fundamental to pharmacology. Most psychoactive compounds target one or more steps in this cycle.
                </p>
              </div>
            </div>

            {/* Callout */}
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mb-6">
              <div className="overline text-accent mb-2">THE CONNECTION TO KEEP</div>
              <p className="text-sm text-text-primary font-medium">
                Neuron = cell. Neurotransmitter = messenger. Receptor = responder.
              </p>
            </div>

            {/* Sources */}
            <div className="bg-bg-panel rounded-lg p-4 mb-6">
              <div className="overline mb-2">SOURCES & FURTHER READING · 4 REFERENCES</div>
              <div className="space-y-2">
                <a href="#" className="text-xs text-accent hover:underline block">Kandel ER, et al. Principles of Neural Science. 6th ed. McGraw-Hill; 2021.</a>
                <a href="#" className="text-xs text-accent hover:underline block">Stahl SM. Stahl's Essential Psychopharmacology. 5th ed. Cambridge; 2021.</a>
                <a href="#" className="text-xs text-accent hover:underline block">Purves D, et al. Neuroscience. 7th ed. Oxford; 2023.</a>
                <a href="#" className="text-xs text-accent hover:underline block">Reviewed: 2024-01-15</a>
              </div>
            </div>

            {/* Quiz */}
            <div className="bg-bg-panel rounded-xl p-4">
              <div className="overline mb-2">ONE QUICK CHECK</div>
              <p className="text-sm text-white mb-3">What is the primary role of a neurotransmitter?</p>
              <div className="space-y-2 mb-3">
                {['To generate electrical impulses', 'To transmit chemical signals across synapses', 'To produce myelin sheaths'].map((opt, i) => (
                  <label key={i} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                    quizAnswer === opt ? 'bg-accent/10 border border-accent/30' : 'hover:bg-white/5 border border-transparent'
                  }`}>
                    <input
                      type="radio"
                      name="quiz"
                      value={opt}
                      checked={quizAnswer === opt}
                      onChange={() => { setQuizAnswer(opt); setQuizChecked(false); }}
                      className="accent-accent"
                    />
                    <span className="text-sm text-text-secondary">{opt}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => setQuizChecked(true)}
                disabled={!quizAnswer}
                className="px-4 py-2 bg-accent text-white text-xs font-medium rounded-lg disabled:opacity-50 hover:bg-accent/90 transition-colors"
              >
                Check answer
              </button>
              {quizChecked && quizAnswer && (
                <div className={`mt-3 text-sm ${quizAnswer.includes('chemical signals') ? 'text-accent-green' : 'text-accent-red'}`}>
                  {quizAnswer.includes('chemical signals') 
                    ? '✓ Correct! Neurotransmitters transmit chemical signals across the synaptic cleft.'
                    : '✗ Not quite. Neurotransmitters are chemical messengers that transmit signals across synapses.'}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="overline">BRANCH 0{selectedBranch} · {currentBranch?.name}</div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs bg-accent text-white rounded-lg font-medium">Focus mode</button>
                <div className="flex bg-bg-panel rounded-lg p-0.5">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-2 py-1 text-xs rounded-md ${viewMode === 'list' ? 'bg-bg-card text-white' : 'text-text-meta'}`}
                  >List</button>
                  <button
                    onClick={() => setViewMode('tree')}
                    className={`px-2 py-1 text-xs rounded-md ${viewMode === 'tree' ? 'bg-bg-card text-white' : 'text-text-meta'}`}
                  >Tree</button>
                </div>
              </div>
            </div>

            {viewMode === 'list' ? (
              <div className="space-y-1">
                {branchLessons.map((lesson, i) => (
                  <button
                    key={lesson.id}
                    onClick={() => lesson.status !== 'locked' && setSelectedLesson(lesson.id)}
                    disabled={lesson.status === 'locked'}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                      lesson.status === 'locked'
                        ? 'border-border opacity-40 cursor-not-allowed'
                        : lesson.status === 'done'
                          ? 'border-accent-green/20 bg-accent-green/5 hover:border-accent-green/40'
                          : 'border-border hover:border-accent/30 bg-bg-card'
                    }`}
                  >
                    {lesson.status === 'done' ? (
                      <CheckCircle2 size={16} className="text-accent-green flex-shrink-0" />
                    ) : lesson.status === 'locked' ? (
                      <Lock size={16} className="text-text-meta flex-shrink-0" />
                    ) : (
                      <Circle size={16} className="text-accent flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <span className="text-sm text-white">{lesson.title}</span>
                    </div>
                    <ChevronRight size={14} className="text-text-meta" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-bg-card border border-border rounded-xl p-6">
                <div className="overline mb-3">YOUR LEARNING PATH</div>
                <div className="flex flex-col items-center gap-3">
                  {branchLessons.map((lesson, i) => (
                    <div key={lesson.id} className="flex flex-col items-center">
                      <button
                        onClick={() => lesson.status !== 'locked' && setSelectedLesson(lesson.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                          lesson.status === 'done'
                            ? 'border-accent-green bg-accent-green/20 text-accent-green'
                            : lesson.status === 'locked'
                              ? 'border-border text-text-meta opacity-40'
                              : 'border-accent bg-accent/10 text-accent'
                        }`}
                      >
                        {lesson.status === 'done' ? <CheckCircle2 size={16} /> : lesson.status === 'locked' ? <Lock size={14} /> : <BookOpen size={16} />}
                      </button>
                      <span className="text-[10px] text-text-meta mt-1 text-center max-w-[120px]">{lesson.title}</span>
                      {i < branchLessons.length - 1 && (
                        <div className={`w-0.5 h-4 ${lesson.status === 'done' ? 'bg-accent-green' : 'bg-border'}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right rail */}
      <div className="w-56 border-l border-border p-4 overflow-y-auto flex-shrink-0 hidden xl:block">
        <div className="overline mb-2">LEADS TO</div>
        {currentLesson ? (
          <div className="space-y-2">
            {branchLessons.filter(l => l.id !== currentLesson.id).slice(0, 3).map(l => (
              <button
                key={l.id}
                onClick={() => l.status !== 'locked' && setSelectedLesson(l.id)}
                className="w-full text-left text-xs text-accent hover:underline"
              >
                {l.title}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {branches.slice(0, 5).map(b => (
              <button
                key={b.id}
                onClick={() => setSelectedBranch(b.id)}
                className={`w-full text-left px-2 py-1 rounded text-xs ${
                  selectedBranch === b.id ? 'text-accent bg-accent/5' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
