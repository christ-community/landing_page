import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
}

const EmptyState = ({
  icon: Icon = Inbox,
  title,
  description,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-background rounded-2xl border border-dashed border-border/50">
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <Icon className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm">{description}</p>
    </div>
  );
};

export default EmptyState; 