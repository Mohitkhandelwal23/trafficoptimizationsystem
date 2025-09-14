import { 
  LayoutDashboard, 
  Map, 
  Settings, 
  FileText, 
  BarChart3, 
  Brain, 
  TrafficCone,
  LogOut,
  Shield,
  Camera
} from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onBackToLanding: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'live-traffic', label: 'AI Video Analysis', icon: Camera },
  { id: 'live-map', label: 'Live Map', icon: Map },
  { id: 'signal-control', label: 'Signal Control', icon: TrafficCone },
  { id: 'e-challan', label: 'Violations & E-Challan', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'model-monitoring', label: 'Model Monitor', icon: Brain },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentPage, onPageChange, onBackToLanding }: SidebarProps) {
  return (
    <div className="w-64 bg-card/50 backdrop-blur-sm border-r border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-lg flex items-center justify-center glow-primary">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">Netra</h1>
            <p className="text-sm text-muted-foreground">AI Traffic Control</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start transition-all duration-300 ${
                currentPage === item.id 
                  ? 'bg-gradient-to-r from-pink-500/20 to-cyan-400/20 border border-pink-500/30 glow-primary' 
                  : 'hover:bg-white/5 hover:border-white/10'
              }`}
              onClick={() => onPageChange(item.id)}
            >
              <Icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:bg-white/5" onClick={onBackToLanding}>
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}