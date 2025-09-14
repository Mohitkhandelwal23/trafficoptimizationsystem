import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Shield, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onBackToLanding: () => void;
}

export function LoginPage({ onLogin, onBackToLanding }: LoginPageProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    otp: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      setStep('otp');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.otp) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-white/10 glow-primary">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-lg flex items-center justify-center glow-primary">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Netra Admin
          </CardTitle>
          <p className="text-muted-foreground">
            {step === 'credentials' ? 'AI Traffic Control System' : 'Enter verification code'}
          </p>
        </CardHeader>
        <CardContent>
          {step === 'credentials' ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 glow-primary">
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={credentials.otp}
                  onChange={(e) => setCredentials(prev => ({ ...prev, otp: e.target.value }))}
                  maxLength={6}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Check your authenticator app for the verification code
                </p>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 glow-primary">
                Sign In
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => setStep('credentials')}
              >
                Back
              </Button>
            </form>
          )}
          
          <div className="mt-6 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Demo credentials:</strong><br />
              Username: admin<br />
              Password: admin123<br />
              OTP: 123456
            </p>
          </div>

          <div className="mt-4 text-center">
            <Button 
              variant="ghost" 
              className="text-sm"
              onClick={onBackToLanding}
            >
              ← Back to Landing Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}