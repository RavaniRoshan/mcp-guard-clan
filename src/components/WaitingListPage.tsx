import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Mail, 
  CheckCircle, 
  ArrowLeft, 
  Users, 
  Zap, 
  Bell,
  Building,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";

export const WaitingListPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    company: "",
    role: "",
    mcpServers: "",
    useCase: "",
    notifications: true,
    updates: true
  });
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission (replace with actual API call when Supabase is connected)
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Successfully joined the waitlist!",
        description: "We'll notify you as soon as MCP Security Guardian is available.",
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-6">
          <Card className="max-w-2xl mx-auto text-center shadow-glow">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl">Welcome to the Guardian Family!</CardTitle>
              <CardDescription className="text-lg">
                You're now on the exclusive waitlist for MCP Security Guardian
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    You'll receive a confirmation email shortly
                  </li>
                  <li className="flex items-center">
                    <Bell className="h-4 w-4 mr-2 text-primary" />
                    Get early access when we launch (Q1 2025)
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-primary" />
                    Exclusive 50% discount for early adopters
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
                <Link to="/dashboard" className="flex-1">
                  <Button className="w-full">
                    {user ? "Go to Dashboard" : "View Live Demo"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                MCP Security Guardian
              </span>
            </Link>
            <div className="flex items-center space-x-2">
              {user ? (
                <Link to="/dashboard">
                  <Button variant="outline">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              🎯 Early Access Program
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Join the Security Revolution
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Be among the first to experience next-generation MCP server protection. 
              Get early access and exclusive benefits when we launch.
            </p>
            
            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">On Waitlist</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">50%</div>
                <div className="text-sm text-muted-foreground">Early Bird Discount</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-info">Q1 2025</div>
                <div className="text-sm text-muted-foreground">Expected Launch</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Join the Waitlist
                </CardTitle>
                <CardDescription>
                  Reserve your spot and get notified when we launch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Your Company"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select onValueChange={(value) => handleInputChange("role", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ciso">CISO</SelectItem>
                          <SelectItem value="security-engineer">Security Engineer</SelectItem>
                          <SelectItem value="devops">DevOps Engineer</SelectItem>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="architect">Solution Architect</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mcpServers">How many MCP servers do you currently run?</Label>
                    <Select onValueChange={(value) => handleInputChange("mcpServers", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 servers</SelectItem>
                        <SelectItem value="6-15">6-15 servers</SelectItem>
                        <SelectItem value="16-50">16-50 servers</SelectItem>
                        <SelectItem value="50+">50+ servers</SelectItem>
                        <SelectItem value="planning">Planning to deploy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="useCase">Primary Use Case (Optional)</Label>
                    <Textarea
                      id="useCase"
                      value={formData.useCase}
                      onChange={(e) => handleInputChange("useCase", e.target.value)}
                      placeholder="Tell us about your MCP security challenges or use case..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="notifications"
                        checked={formData.notifications}
                        onCheckedChange={(checked) => handleInputChange("notifications", checked as boolean)}
                      />
                      <Label htmlFor="notifications" className="text-sm">
                        Notify me when early access is available
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="updates"
                        checked={formData.updates}
                        onCheckedChange={(checked) => handleInputChange("updates", checked as boolean)}
                      />
                      <Label htmlFor="updates" className="text-sm">
                        Send me product updates and security insights
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Mail className="mr-2 h-4 w-4" />
                    Join Waitlist
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By joining, you agree to receive updates about MCP Security Guardian. 
                    Unsubscribe anytime.
                  </p>
                </form>
                
                {!user && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      Or continue with your Google account
                    </p>
                    <GoogleLoginButton onLoginSuccess={() => {
                      toast({
                        title: "Success",
                        description: "You've been logged in successfully!",
                      });
                    }} />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Early Access Benefits</h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: Zap,
                      title: "50% Early Bird Discount",
                      description: "Save hundreds on your first year subscription"
                    },
                    {
                      icon: Shield,
                      title: "Priority Access",
                      description: "Be the first to deploy when we launch in Q1 2025"
                    },
                    {
                      icon: User,
                      title: "Beta Testing Program", 
                      description: "Help shape the product with direct feedback"
                    },
                    {
                      icon: Building,
                      title: "Custom Onboarding",
                      description: "Dedicated setup assistance for your infrastructure"
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50">
                      <benefit.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="bg-gradient-card border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Why Join Now?</h3>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• MCP attacks are increasing 300% quarterly</li>
                    <li>• Current security tools aren't MCP-aware</li>
                    <li>• Early adopters get competitive advantage</li>
                    <li>• Limited early access spots available</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};