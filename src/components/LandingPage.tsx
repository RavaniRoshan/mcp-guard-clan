import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Zap, 
  Eye, 
  Bell, 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Menu, 
  X,
  Github,
  Twitter
} from "lucide-react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                MCP Security Guardian
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </a>
              <Link to="/dashboard">
                <Button variant="outline">View Demo</Button>
              </Link>
              <Button>Get Started</Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-muted-foreground hover:text-foreground">
                  Features
                </a>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </a>
                <a href="#testimonials" className="text-muted-foreground hover:text-foreground">
                  Testimonials
                </a>
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full">View Demo</Button>
                </Link>
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-critical/5"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              🚀 Now Supporting OpenAI, Anthropic & Claude MCP Servers
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Stop MCP Server Attacks
              <span className="bg-gradient-hero bg-clip-text text-transparent block">
                Before They Happen
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Advanced security monitoring for Model Context Protocol servers. Detect prompt injection, 
              tool poisoning, and context manipulation attacks in real-time with AI-powered threat analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Live Demo
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Deploy in 2 minutes • No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">12ms</div>
              <div className="text-muted-foreground">Average Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success">99.9%</div>
              <div className="text-muted-foreground">Attack Detection Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-info">50K+</div>
              <div className="text-muted-foreground">Threats Blocked Daily</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning">24/7</div>
              <div className="text-muted-foreground">Continuous Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Complete MCP Security Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive protection against the latest attack vectors targeting Model Context Protocol servers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Real-time Threat Detection",
                description: "AI-powered analysis using GPT-5-codex and DeepSeek V3.1 to identify attacks as they happen",
                color: "primary"
              },
              {
                icon: Zap,
                title: "Instant Response",
                description: "Block malicious requests in under 12ms with our lightning-fast detection engine",
                color: "warning"
              },
              {
                icon: Eye,
                title: "Attack Replay & Analysis",
                description: "Detailed forensics with full attack reconstruction and payload analysis",
                color: "info"
              },
              {
                icon: Bell,
                title: "Smart Alerting",
                description: "Intelligent notifications that reduce false positives and focus on real threats",
                color: "success"
              },
              {
                icon: Github,
                title: "Easy Integration",
                description: "Simple webhook API that works with any MCP server implementation",
                color: "secondary"
              },
              {
                icon: Twitter,
                title: "Breach Reporting",
                description: "Auto-generated security summaries perfect for threat intelligence sharing",
                color: "accent"
              }
            ].map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className={`h-10 w-10 mb-4 ${
                    feature.color === "primary" ? "text-primary" :
                    feature.color === "warning" ? "text-warning" :
                    feature.color === "info" ? "text-info" :
                    feature.color === "success" ? "text-success" :
                    "text-muted-foreground"
                  }`} />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Trusted by Security Teams
            </h2>
            <p className="text-xl text-muted-foreground">
              Join hundreds of organizations protecting their MCP infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "MCP Security Guardian detected a sophisticated prompt injection attack that our traditional security missed. Saved us from a potential data breach.",
                author: "Sarah Chen",
                role: "CISO, TechCorp",
                rating: 5
              },
              {
                quote: "The real-time detection is incredible. We went from reactive security to proactive protection in just one weekend deployment.",
                author: "Marcus Rodriguez",
                role: "Security Engineer, DataFlow",
                rating: 5
              },
              {
                quote: "Finally, a security solution built specifically for the MCP ecosystem. The attack analytics are game-changing.",
                author: "Dr. Amanda Liu",
                role: "Head of AI Security, InnovateLabs",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <blockquote className="text-lg mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your security needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$99",
                period: "per month",
                description: "Perfect for small teams getting started",
                features: [
                  "Up to 5 MCP servers",
                  "Real-time threat detection",
                  "Basic attack analytics",
                  "Email alerts",
                  "14-day retention"
                ],
                popular: false
              },
              {
                name: "Professional",
                price: "$299",
                period: "per month",
                description: "Advanced security for growing organizations",
                features: [
                  "Up to 25 MCP servers",
                  "AI-powered threat analysis",
                  "Attack replay & forensics",
                  "Slack/Teams integration",
                  "90-day retention",
                  "Custom dashboards"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "contact us",
                description: "Full-scale protection for large enterprises",
                features: [
                  "Unlimited MCP servers",
                  "Custom ML models",
                  "Advanced threat hunting",
                  "API access",
                  "1-year retention",
                  "24/7 support",
                  "On-premise deployment"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`shadow-card relative ${
                plan.popular ? "border-primary shadow-glow" : ""
              }`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Secure Your MCP Infrastructure?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the security revolution. Deploy MCP Security Guardian in minutes and protect your servers from the latest threats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold">MCP Security Guardian</span>
              </div>
              <p className="text-muted-foreground">
                Advanced security monitoring for Model Context Protocol servers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
                <li><Link to="/dashboard" className="hover:text-foreground">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 MCP Security Guardian. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};