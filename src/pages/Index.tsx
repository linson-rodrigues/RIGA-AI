import { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { RoleSelector } from '@/components/dashboard/RoleSelector';
import { SecurityOverview } from '@/components/dashboard/SecurityOverview';
import { ThreatDetection } from '@/components/dashboard/ThreatDetection';

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [activeView, setActiveView] = useState('overview');

  // Show role selector if no role is selected
  if (!selectedRole) {
    return <RoleSelector onRoleSelect={setSelectedRole} />;
  }

  // Render the appropriate dashboard content based on active view
  const renderDashboardContent = () => {
    switch (activeView) {
      case 'overview':
        return <SecurityOverview />;
      case 'threats':
      case 'ai-threats':
      case 'prompt-injection':
      case 'secrets-leak':
        return <ThreatDetection />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {activeView.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h2>
              <p className="text-muted-foreground">
                This module is under development. Coming soon!
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <DashboardSidebar 
        activeView={activeView}
        onViewChange={setActiveView}
        userRole={selectedRole}
      />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {renderDashboardContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
