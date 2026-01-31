'use client';

import { useState, useEffect } from 'react';
import { LoginForm } from '@/components/dashboard/LoginForm';
import { BulkEmailSender } from '@/components/dashboard/BulkEmailSender';
import { BlobUploader } from '@/components/dashboard/BlobUploader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'email' | 'media'>('email');

  useEffect(() => {
    // Check if already authenticated
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/dashboard/auth');
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/10 flex items-center justify-center">
        <div className="text-center stack">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-muted border-t-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="dashboard-shell">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="flex flex-col border-r border-border/40 bg-white min-h-screen">
          <div className="flex items-center gap-3 px-6 py-6">
            <a href="/" className="flex items-center">
              <img src="/Logo .PNG" alt="Christ Community" width={48} height={48} />
            </a>
            <div className="text-sm font-semibold text-foreground">Dashboard</div>
          </div>

          <nav className="px-4 pb-6">
            <div className="space-y-2">
              <button
                type="button"
                className={cn(
                  'w-full text-left px-4 py-3 text-sm font-medium rounded-[var(--radius)] border transition-colors',
                  activeTab === 'email'
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'bg-white text-muted-foreground border-border/40 hover:bg-muted/20'
                )}
                onClick={() => setActiveTab('email')}
              >
                Bulk Email
              </button>
              <button
                type="button"
                className={cn(
                  'w-full text-left px-4 py-3 text-sm font-medium rounded-[var(--radius)] border transition-colors',
                  activeTab === 'media'
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'bg-white text-muted-foreground border-border/40 hover:bg-muted/20'
                )}
                onClick={() => setActiveTab('media')}
              >
                Media Library
              </button>
            </div>
          </nav>

          <div className="mt-auto px-4 pb-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={async () => {
                await fetch('/api/dashboard/auth', { method: 'DELETE' });
                window.location.reload();
              }}
            >
              Logout
            </Button>
          </div>
        </aside>

        <main className="bg-white">
          <div className="px-6 py-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-semibold text-foreground">
                {activeTab === 'email' ? 'Bulk Email' : 'Media Library'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {activeTab === 'email'
                  ? 'Create and send bulk announcements to your recipients.'
                  : 'Upload, review, and delete event media.'}
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              {activeTab === 'email' && <BulkEmailSender />}
              {activeTab === 'media' && <BlobUploader />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
