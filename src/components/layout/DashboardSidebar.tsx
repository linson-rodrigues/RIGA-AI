import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Activity, 
  FileText, 
  Settings, 
  Users, 
  AlertTriangle, 
  BarChart3, 
  Database, 
  Lock, 
  Brain,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import sentinelLogo from '@/assets/sentinel-logo.png';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  userRole: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: 'default' | 'destructive' | 'warning' | 'success';
  children?: NavItem[];
  roles: string[];
}

const navigationItems: NavItem[] = [
  {
    id: 'overview',
    label: 'Security Overview',
    icon: Shield,
    roles: ['admin', 'soc', 'grc', 'devops']
  },
  {
    id: 'threats',
    label: 'Threat Detection',
    icon: AlertTriangle,
    badge: '12',
    badgeVariant: 'destructive',
    roles: ['admin', 'soc', 'devops'],
    children: [
      { id: 'ai-threats', label: 'AI Threats', icon: Brain, roles: ['admin', 'soc'] },
      { id: 'prompt-injection', label: 'Prompt Injection', icon: Activity, roles: ['admin', 'soc'] },
      { id: 'secrets-leak', label: 'Secrets Exposure', icon: Lock, roles: ['admin', 'soc', 'devops'] }
    ]
  },
  {
    id: 'compliance',
    label: 'Compliance & GRC',
    icon: FileText,
    roles: ['admin', 'grc'],
    children: [
      { id: 'frameworks', label: 'Frameworks', icon: BarChart3, roles: ['admin', 'grc'] },
      { id: 'audits', label: 'Audit Reports', icon: FileText, roles: ['admin', 'grc'] },
      { id: 'policies', label: 'Policy Management', icon: Settings, roles: ['admin', 'grc'] }
    ]
  },
  {
    id: 'governance',
    label: 'AI Governance',
    icon: Brain,
    badge: '3',
    badgeVariant: 'warning',
    roles: ['admin', 'grc'],
    children: [
      { id: 'model-registry', label: 'Model Registry', icon: Database, roles: ['admin', 'grc'] },
      { id: 'usage-analytics', label: 'Usage Analytics', icon: BarChart3, roles: ['admin', 'grc'] },
      { id: 'risk-assessment', label: 'Risk Assessment', icon: AlertTriangle, roles: ['admin', 'grc'] }
    ]
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: Activity,
    roles: ['admin', 'devops', 'soc'],
    children: [
      { id: 'monitoring', label: 'Real-time Monitoring', icon: Activity, roles: ['admin', 'devops', 'soc'] },
      { id: 'incidents', label: 'Incident Response', icon: AlertTriangle, roles: ['admin', 'soc'] },
      { id: 'automation', label: 'Automation', icon: Settings, roles: ['admin', 'devops'] }
    ]
  },
  {
    id: 'users',
    label: 'User Management',
    icon: Users,
    roles: ['admin']
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    roles: ['admin', 'grc', 'devops', 'soc']
  }
];

const roleLabels = {
  admin: 'Administrator',
  soc: 'Security Operations',
  grc: 'GRC Analyst',
  devops: 'DevOps Engineer'
};

export function DashboardSidebar({ activeView, onViewChange, userRole }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['threats', 'compliance']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isAccessible = (item: NavItem) => {
    return item.roles.includes(userRole) || userRole === 'admin';
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    if (!isAccessible(item)) return null;

    const isActive = activeView === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);

    return (
      <div key={item.id} className="space-y-1">
        <Button
          variant={isActive ? "default" : "ghost"}
          size="sm"
          className={cn(
            "w-full justify-start transition-smooth",
            level > 0 && "ml-4 w-[calc(100%-1rem)]",
            isActive && "bg-primary text-primary-foreground cyber-glow",
            !isActive && "hover:bg-secondary/50 hover:text-foreground"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              onViewChange(item.id);
            }
          }}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <Badge 
              variant={item.badgeVariant || 'default'} 
              className="ml-auto text-xs px-1.5 py-0.5"
            >
              {item.badge}
            </Badge>
          )}
          {hasChildren && (
            isExpanded ? (
              <ChevronDown className="ml-1 h-3 w-3" />
            ) : (
              <ChevronRight className="ml-1 h-3 w-3" />
            )
          )}
        </Button>
        
        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {item.children?.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
        <img 
          src={sentinelLogo} 
          alt="SentinelAI" 
          className="h-8 w-8"
        />
        <div>
          <h1 className="text-lg font-semibold text-sidebar-foreground">SentinelAI</h1>
          <p className="text-xs text-muted-foreground">AI Security Platform</p>
        </div>
      </div>

      {/* User Role Badge */}
      <div className="p-4 border-b border-sidebar-border">
        <Badge variant="outline" className="w-full justify-center py-1">
          {roleLabels[userRole as keyof typeof roleLabels] || 'Unknown Role'}
        </Badge>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
        {navigationItems.map(item => renderNavItem(item))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground text-center">
          <p>v1.0.0 • Enterprise</p>
          <p className="mt-1">SOC 2 Type II Compliant</p>
        </div>
      </div>
    </div>
  );
}