import { useLocation, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Calendar, Quote, Map, Brain, GraduationCap, 
  FlaskConical, Layers, Calculator, ClipboardList,
  Users, MessageSquare, FileText,
  ShoppingBag, Search, HelpCircle, User, ChevronLeft, ChevronRight
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const navGroups = [
  {
    label: 'RESEARCH',
    items: [
      { icon: BookOpen, label: 'Studies', path: '/studies' },
      { icon: Calendar, label: 'Today', path: '/today' },
      { icon: Quote, label: 'Citation', path: '/citation' },
      { icon: Map, label: 'Map', path: '/map' },
      { icon: Brain, label: 'Brain', path: '/brain' },
      { icon: GraduationCap, label: 'Learn', path: '/learn' },
    ]
  },
  {
    label: 'TOOLS',
    items: [
      { icon: FlaskConical, label: 'Compounds', path: '/compounds' },
      { icon: Layers, label: 'Stack', path: '/compounds' },
      { icon: Calculator, label: 'Calories', path: '/compounds' },
      { icon: ClipboardList, label: 'Protocol Log', path: '/compounds' },
    ]
  },
  {
    label: 'COMMUNITY',
    items: [
      { icon: Users, label: 'Community', path: '/compounds' },
      { icon: MessageSquare, label: 'Posts', path: '/compounds' },
      { icon: FileText, label: 'Notebook', path: '/notebook', badge: 3 },
    ]
  },
  {
    label: 'SUPPORT',
    items: [
      { icon: ShoppingBag, label: 'Shop', path: '/shop' },
      { icon: Search, label: 'Browse', path: '/browse' },
      { icon: HelpCircle, label: 'Suggest', path: '/browse' },
    ]
  },
];

export default function Sidebar({ open, onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className={`${open ? 'w-[232px]' : 'w-0 overflow-hidden'} flex-shrink-0 bg-bg-panel border-r border-border flex flex-col transition-all duration-200 relative`}>
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-6 z-10 w-6 h-6 bg-bg-card border border-border rounded-full flex items-center justify-center text-text-meta hover:text-accent"
      >
        {open ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
      </button>
      
      {/* Logo */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-green flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="6" cy="12" r="3" fill="white" opacity="0.9"/>
              <circle cx="18" cy="12" r="3" fill="white" opacity="0.9"/>
              <path d="M9 12 L15 12" stroke="white" strokeWidth="2" strokeDasharray="2 2"/>
              <circle cx="12" cy="8" r="1.5" fill="white" opacity="0.6"/>
              <path d="M8 10 L12 8 L16 10" stroke="white" strokeWidth="1" opacity="0.5"/>
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold">
              <span className="text-white">Neuro</span>
              <span className="text-accent">Difference</span>
            </div>
            <div className="text-[10px] text-text-meta font-mono">
              v2.4.0 — 1,247 compounds · 8,392 studies
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-3">
            <div className="overline px-2 py-1.5">{group.label}</div>
            {group.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                    isActive 
                      ? 'bg-accent/10 text-accent' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  <item.icon size={16} className={isActive ? 'text-accent' : 'text-text-meta'} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-[10px] bg-accent/20 text-accent px-1.5 py-0.5 rounded-full font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Account */}
      <div className="border-t border-border px-2 py-3">
        <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors">
          <User size={16} className="text-text-meta" />
          <span>Account</span>
        </button>
      </div>
    </aside>
  );
}
