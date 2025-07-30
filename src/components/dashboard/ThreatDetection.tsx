import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Shield, 
  Brain, 
  Lock, 
  Activity,
  Clock,
  MapPin,
  TrendingUp,
  Filter,
  Download
} from 'lucide-react';

interface ThreatEvent {
  id: string;
  type: 'prompt_injection' | 'jailbreak' | 'pii_extraction' | 'token_injection';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'blocked' | 'monitoring' | 'investigating';
  source: string;
  model: string;
  timestamp: string;
  description: string;
  confidence: number;
}

const threatEvents: ThreatEvent[] = [
  {
    id: '1',
    type: 'jailbreak',
    severity: 'critical',
    status: 'blocked',
    source: 'api.company.com',
    model: 'gpt-4',
    timestamp: '2 minutes ago',
    description: 'Attempted system prompt override with role injection',
    confidence: 98
  },
  {
    id: '2',
    type: 'prompt_injection',
    severity: 'high',
    status: 'blocked',
    source: 'chat.internal.com',
    model: 'claude-3',
    timestamp: '15 minutes ago',
    description: 'SQL injection attempt in user prompt',
    confidence: 94
  },
  {
    id: '3',
    type: 'pii_extraction',
    severity: 'medium',
    status: 'monitoring',
    source: 'app.platform.com',
    model: 'gpt-3.5-turbo',
    timestamp: '1 hour ago',
    description: 'Attempt to extract customer personal information',
    confidence: 87
  },
  {
    id: '4',
    type: 'token_injection',
    severity: 'high',
    status: 'investigating',
    source: 'dev.environment.com',
    model: 'local-llama',
    timestamp: '3 hours ago',
    description: 'Suspicious API token patterns detected in output',
    confidence: 91
  }
];

const threatTypeLabels = {
  prompt_injection: 'Prompt Injection',
  jailbreak: 'Jailbreak Attempt',
  pii_extraction: 'PII Extraction',
  token_injection: 'Token Injection'
};

const threatTypeIcons = {
  prompt_injection: Activity,
  jailbreak: AlertTriangle,
  pii_extraction: Shield,
  token_injection: Lock
};

const severityColors = {
  low: 'secondary',
  medium: 'warning',
  high: 'warning',
  critical: 'destructive'
} as const;

const statusColors = {
  blocked: 'success',
  monitoring: 'warning',
  investigating: 'destructive'
} as const;

export function ThreatDetection() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const filteredEvents = selectedSeverity === 'all' 
    ? threatEvents 
    : threatEvents.filter(event => event.severity === selectedSeverity);

  const threatStats = {
    total: threatEvents.length,
    blocked: threatEvents.filter(e => e.status === 'blocked').length,
    investigating: threatEvents.filter(e => e.status === 'investigating').length,
    critical: threatEvents.filter(e => e.severity === 'critical').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Threat Detection</h1>
          <p className="text-muted-foreground mt-1">
            Real-time AI security monitoring and threat analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-warning" />
            <div>
              <div className="text-2xl font-bold">{threatStats.total}</div>
              <div className="text-sm text-muted-foreground">Total Threats</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-success" />
            <div>
              <div className="text-2xl font-bold">{threatStats.blocked}</div>
              <div className="text-sm text-muted-foreground">Blocked</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-destructive" />
            <div>
              <div className="text-2xl font-bold">{threatStats.investigating}</div>
              <div className="text-sm text-muted-foreground">Investigating</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">99.2%</div>
              <div className="text-sm text-muted-foreground">Detection Rate</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Threat Events</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Threat Timeline */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {threatEvents.slice(0, 3).map((event) => {
                  const IconComponent = threatTypeIcons[event.type];
                  return (
                    <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-background-secondary">
                      <IconComponent className="h-5 w-5 text-warning mt-0.5" />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {threatTypeLabels[event.type]}
                          </span>
                          <Badge variant={severityColors[event.severity]} className="text-xs">
                            {event.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.source}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.timestamp}
                          </span>
                        </div>
                      </div>
                      <Badge variant={statusColors[event.status]} className="text-xs">
                        {event.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* AI Model Security */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">AI Model Security</h3>
              <div className="space-y-4">
                {[
                  { model: 'GPT-4', threats: 8, status: 'protected' },
                  { model: 'Claude-3', threats: 3, status: 'protected' },
                  { model: 'GPT-3.5-Turbo', threats: 5, status: 'monitoring' },
                  { model: 'Local-LLaMA', threats: 2, status: 'investigating' }
                ].map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background-secondary">
                    <div>
                      <div className="font-medium text-sm">{model.model}</div>
                      <div className="text-xs text-muted-foreground">
                        {model.threats} threats detected today
                      </div>
                    </div>
                    <Badge 
                      variant={
                        model.status === 'protected' ? 'success' :
                        model.status === 'monitoring' ? 'warning' : 'destructive'
                      }
                      className="text-xs"
                    >
                      {model.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant={selectedSeverity === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSeverity('all')}
            >
              All
            </Button>
            <Button
              variant={selectedSeverity === 'critical' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSeverity('critical')}
            >
              Critical
            </Button>
            <Button
              variant={selectedSeverity === 'high' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSeverity('high')}
            >
              High
            </Button>
            <Button
              variant={selectedSeverity === 'medium' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSeverity('medium')}
            >
              Medium
            </Button>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              {filteredEvents.map((event) => {
                const IconComponent = threatTypeIcons[event.type];
                return (
                  <div 
                    key={event.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-background-secondary border border-card-border hover:border-primary/20 transition-smooth"
                  >
                    <div className="flex items-center gap-4">
                      <IconComponent className="h-6 w-6 text-warning" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {threatTypeLabels[event.type]}
                          </span>
                          <Badge variant={severityColors[event.severity]}>
                            {event.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Source: {event.source}</span>
                          <span>Model: {event.model}</span>
                          <span>Confidence: {event.confidence}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant={statusColors[event.status]}>
                        {event.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {event.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Threat Trends</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Prompt Injections</span>
                  <div className="flex items-center gap-2">
                    <Progress value={75} className="w-24 h-2" />
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm">+15%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Jailbreak Attempts</span>
                  <div className="flex items-center gap-2">
                    <Progress value={45} className="w-24 h-2" />
                    <TrendingUp className="h-4 w-4 text-warning" />
                    <span className="text-sm">+8%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">PII Extraction</span>
                  <div className="flex items-center gap-2">
                    <Progress value={30} className="w-24 h-2" />
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm">-5%</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Detection Performance</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Accuracy</span>
                    <span>99.2%</span>
                  </div>
                  <Progress value={99.2} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>False Positive Rate</span>
                    <span>0.8%</span>
                  </div>
                  <Progress value={0.8} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Response Time</span>
                    <span>12ms avg</span>
                  </div>
                  <Progress value={85} />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}