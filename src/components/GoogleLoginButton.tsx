import React from 'react';
import { Button } from '@/components/ui/button';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/auth/firebaseConfig';
import { useToast } from '@/hooks/use-toast';

interface GoogleLoginButtonProps {
  onLoginSuccess?: () => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onLoginSuccess }) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: 'Success',
        description: 'You have been logged in successfully!',
      });
      onLoginSuccess?.();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to log in with Google. Please try again.',
        variant: 'destructive',
      });
      console.error('Google login error:', err);
    }
  };

  return (
    <Button 
      onClick={handleGoogleLogin} 
      disabled={loading}
      variant="outline"
      className="w-full"
    >
      <div className="mr-2 h-4 w-4 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />
      {loading ? 'Logging in...' : 'Continue with Google'}
    </Button>
  );
};