import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Shield, 
  Users, 
  FileText, 
  Activity 
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  capabilities: string[];
}

const roles: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access and configuration',
    icon: Shield,
    color: 'primary',
    capabilities: [
      'System Configuration',
      'User Management',
      'Global Policies',
      'All Dashboards'
    ]
  },
  {
    id: 'soc',
    name: 'Security Operations',
    description: 'Real-time threat monitoring and response',
    icon: Activity,
    color: 'destructive',
    capabilities: [
      'Threat Detection',
      'Incident Response',
      'Security Monitoring',
      'Alert Management'
    ]
  },
  {
    id: 'grc',
    name: 'GRC Analyst',
    description: 'Governance, risk, and compliance management',
    icon: FileText,
    color: 'success',
    capabilities: [
      'Compliance Tracking',
      'Risk Assessment',
      'Audit Reports',
      'Policy Management'
    ]
  },
  {
    id: 'devops',
    name: 'DevOps Engineer',
    description: 'Development operations and automation',
    icon: Users,
    color: 'warning',
    capabilities: [
      'CI/CD Monitoring',
      'Automation Rules',
      'Performance Metrics',
      'Infrastructure Security'
    ]
  }
];

interface RoleSelectorProps {
  onRoleSelect: (role: string) => void;
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to SentinelAI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unified AI Security & Governance Platform
          </p>
          <p className="text-sm text-muted-foreground">
            Select your role to access your personalized dashboard
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.id}
                className="p-6 cursor-pointer transition-smooth hover:cyber-glow hover:scale-105 hover:border-primary/40"
                onClick={() => onRoleSelect(role.id)}
              >
                <div className="space-y-4">
                  {/* Icon and Title */}
                  <div className="space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-lg bg-gradient-cyber">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-foreground">
                        {role.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Key Capabilities
                    </p>
                    <div className="space-y-1">
                      {role.capabilities.map((capability, index) => (
                        <div 
                          key={index}
                          className="text-xs text-muted-foreground flex items-center gap-2"
                        >
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {capability}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Select Button */}
                  <Button 
                    className="w-full transition-bounce hover:bg-primary/90"
                    onClick={() => onRoleSelect(role.id)}
                  >
                    Access Dashboard
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-4">
            <Badge variant="success">SOC 2 Type II</Badge>
            <Badge variant="success">ISO 27001</Badge>
            <Badge variant="success">NIST AI RMF</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Enterprise-grade security and compliance built-in
          </p>
        </div>
      </div>
    </div>
  );
}