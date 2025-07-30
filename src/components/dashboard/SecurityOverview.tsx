import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Activity,
  TrendingUp,
  TrendingDown,
  Brain,
  Lock,
  FileText
} from 'lucide-react';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  status: 'success' | 'warning' | 'destructive';
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const securityMetrics: MetricCard[] = [
  {
    title: 'Threat Detection Rate',
    value: '99.8%',
    change: '+0.2%',
    trend: 'up',
    status: 'success',
    icon: Shield,
    description: 'AI threats blocked in real-time'
  },
  {
    title: 'Policy Violations',
    value: '12',
    change: '-5',
    trend: 'down',
    status: 'warning',
    icon: AlertTriangle,
    description: 'Active violations requiring attention'
  },
  {
    title: 'Compliance Score',
    value: '94%',
    change: '+2%',
    trend: 'up',
    status: 'success',
    icon: FileText,
    description: 'SOC 2, ISO 27001, NIST AI RMF'
  },
  {
    title: 'Secrets Exposed',
    value: '0',
    change: '0',
    trend: 'up',
    status: 'success',
    icon: Lock,
    description: 'No active secrets exposures'
  }
];

const recentThreats = [
  {
    id: 1,
    type: 'Prompt Injection',
    severity: 'high',
    source: 'api.company.com',
    blocked: true,
    timestamp: '2 minutes ago'
  },
  {
    id: 2,
    type: 'Jailbreak Attempt',
    severity: 'critical',
    source: 'chat.internal.com',
    blocked: true,
    timestamp: '15 minutes ago'
  },
  {
    id: 3,
    type: 'PII Extraction',
    severity: 'medium',
    source: 'app.platform.com',
    blocked: true,
    timestamp: '1 hour ago'
  },
  {
    id: 4,
    type: 'Token Injection',
    severity: 'high',
    source: 'dev.environment.com',
    blocked: false,
    timestamp: '3 hours ago'
  }
];

const complianceFrameworks = [
  { name: 'SOC 2 Type II', score: 98, status: 'success' },
  { name: 'ISO 27001', score: 92, status: 'success' },
  { name: 'NIST AI RMF', score: 89, status: 'warning' },
  { name: 'GDPR', score: 96, status: 'success' }
];

export function SecurityOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Overview</h1>
          <p className="text-muted-foreground mt-1">
            Real-time AI security and compliance monitoring
          </p>
        </div>
        <Badge variant="success" className="px-3 py-1">
          <Activity className="w-3 h-3 mr-1" />
          All Systems Operational
        </Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {securityMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="metric-card hover:cyber-glow">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-foreground">
                      {metric.value}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <TrendIcon className={`h-3 w-3 ${
                        metric.status === 'success' ? 'text-success' : 
                        metric.status === 'warning' ? 'text-warning' : 'text-destructive'
                      }`} />
                      <span className={`${
                        metric.status === 'success' ? 'text-success' : 
                        metric.status === 'warning' ? 'text-warning' : 'text-destructive'
                      }`}>
                        {metric.change}
                      </span>
                      <span className="text-muted-foreground">vs last week</span>
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={metric.status} 
                  className="status-indicator w-3 h-3 p-0"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {metric.description}
              </p>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Threats */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold">Recent Threats</h3>
            <Badge variant="destructive" className="ml-auto">
              {recentThreats.filter(t => !t.blocked).length} Active
            </Badge>
          </div>
          
          <div className="space-y-3">
            {recentThreats.map((threat) => (
              <div 
                key={threat.id}
                className="flex items-center justify-between p-3 rounded-lg bg-background-secondary border border-card-border"
              >
                <div className="flex items-center gap-3">
                  {threat.blocked ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  <div>
                    <div className="font-medium text-sm">{threat.type}</div>
                    <div className="text-xs text-muted-foreground">{threat.source}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={
                      threat.severity === 'critical' ? 'destructive' :
                      threat.severity === 'high' ? 'warning' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {threat.severity}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {threat.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance Status */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Compliance Frameworks</h3>
          </div>
          
          <div className="space-y-4">
            {complianceFrameworks.map((framework, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{framework.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{framework.score}%</span>
                    <Badge 
                      variant={framework.status as "success" | "warning" | "destructive"}
                      className="status-indicator w-2 h-2 p-0"
                    />
                  </div>
                </div>
                <Progress 
                  value={framework.score} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 rounded-lg bg-gradient-cyber border border-primary/20">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">AI Governance Score</span>
              <Badge variant="success" className="ml-auto">94%</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Meeting all major AI compliance requirements
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}