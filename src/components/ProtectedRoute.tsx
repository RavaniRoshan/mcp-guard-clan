import React from 'react';
import { useAuth } from '@/auth/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleLoginButton } from '@/components/GoogleLoginButton';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <GoogleLoginButton />
            <div className="text-center text-sm text-muted-foreground">
              <a href="/" className="text-primary hover:underline">
                Return to home page
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};