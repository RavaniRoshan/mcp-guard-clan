import { useEffect, useMemo, useRef, useState } from "react";
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
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion, useAnimation, useInView } from "framer-motion";
import { useAuth } from "@/auth/AuthContext";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";

export const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full">
        <div className="container mx-auto px-6 py-4">
          <div className="border border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40 shadow-lg rounded-full px-8 py-4 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  MCP Security Guardian
                </span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                  Testimonials
                </a>
                <ThemeToggle />
                {user ? (
                  <Link to="/dashboard">
                    <Button>Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/waitlist">
                      <Button variant="outline">View Demo</Button>
                    </Link>
                    <Link to="/waitlist">
                      <Button>Get Started</Button>
                    </Link>
                  </>
                )}
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
              <div className="md:hidden mt-4 pt-4 border border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40 shadow-lg rounded-3xl px-6 py-4">
                <div className="flex flex-col space-y-4">
                  <a href="#features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </a>
                  <a href="#testimonials" className="text-muted-foreground hover:text-foreground">
                    Testimonials
                  </a>
                  <div>
                    <ThemeToggle />
                  </div>
                  {user ? (
                    <Link to="/dashboard">
                      <Button className="w-full">Dashboard</Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/waitlist">
                        <Button variant="outline" className="w-full">View Demo</Button>
                      </Link>
                      <Link to="/waitlist">
                        <Button className="w-full">Get Started</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
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
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="text-lg px-8">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/waitlist">
                    <Button size="lg" className="text-lg px-8">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button size="lg" variant="outline" className="text-lg px-8">
                      View Live Demo
                    </Button>
                  </Link>
                </>
              )}
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

      {/* Features Section - Parallax Storytelling */}
      <section id="features" className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Complete MCP Security Platform</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Comprehensive protection against the latest attack vectors targeting Model Context Protocol servers</p>
          </div>

          <ParallaxFeatures />
        </div>
      </section>

      {/* Testimonials - Infinite Marquee with drag/pause */}
      <section id="testimonials" className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Trusted by Security Teams</h2>
            <p className="text-xl text-muted-foreground">Join hundreds of organizations protecting their MCP infrastructure</p>
          </div>

          <TestimonialsMarquee />
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
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/waitlist">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
                    View Demo
                  </Button>
                </Link>
              </>
            )}
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

// Parallax storytelling features
function ParallaxFeatures() {
  const features = useMemo(() => ([
    {
      icon: Shield,
      title: "Real-time Threat Detection",
      description: "AI-powered analysis using GPT-5-codex and DeepSeek V3.1 to identify attacks as they happen",
      tint: "from-primary/20 to-primary/0",
    },
    {
      icon: Zap,
      title: "Instant Response",
      description: "Block malicious requests in under 12ms with our lightning-fast detection engine",
      tint: "from-warning/20 to-warning/0",
    },
    {
      icon: Eye,
      title: "Attack Replay & Analysis",
      description: "Detailed forensics with full attack reconstruction and payload analysis",
      tint: "from-info/20 to-info/0",
    },
    {
      icon: Bell,
      title: "Smart Alerting",
      description: "Intelligent notifications that reduce false positives and focus on real threats",
      tint: "from-success/20 to-success/0",
    },
    {
      icon: Github,
      title: "Easy Integration",
      description: "Simple webhook API that works with any MCP server implementation",
      tint: "from-secondary/30 to-secondary/0",
    },
    {
      icon: Twitter,
      title: "Breach Reporting",
      description: "Auto-generated security summaries perfect for threat intelligence sharing",
      tint: "from-accent/30 to-accent/0",
    },
  ]), []);

  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="mx-auto max-w-5xl h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-5xl space-y-10">
        {features.map((f, idx) => (
          <FeatureRow key={idx} index={idx} {...f} />
        ))}
      </div>
    </div>
  );
}

function FeatureRow({ icon: Icon, title, description, tint, index }:{ icon: any; title: string; description: string; tint: string; index: number; }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 60, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={`relative`}
    >
      <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-r ${tint} blur-2xl`} />
      <Card className={`relative overflow-hidden backdrop-blur bg-card/70 border-border/60 ${isEven ? "ml-auto" : "mr-auto"} w-full lg:w-[80%] shadow-card`}>
        <CardHeader className={`${isEven ? "items-end text-right" : "items-start"}`}>
          <Icon className="h-10 w-10 text-primary mb-3" />
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Testimonials marquee
function TestimonialsMarquee() {
  const base = useMemo(() => ([
    {
      quote: "MCP Security Guardian detected a sophisticated prompt injection attack that our traditional security missed. Saved us from a potential data breach.",
      author: "Sarah Chen",
      role: "CISO, TechCorp",
    },
    {
      quote: "The real-time detection is incredible. We went from reactive security to proactive protection in just one weekend deployment.",
      author: "Marcus Rodriguez",
      role: "Security Engineer, DataFlow",
    },
    {
      quote: "Finally, a security solution built specifically for the MCP ecosystem. The attack analytics are game-changing.",
      author: "Dr. Amanda Liu",
      role: "Head of AI Security, InnovateLabs",
    },
    {
      quote: "Our SOC loves the precision of alerts and the lack of noise.",
      author: "Jon Park",
      role: "Director of Security, CloudFlux",
    },
  ]), []);

  const items = useMemo(() => [...base, ...base, ...base], [base]);
  const controls = useAnimation();
  const [isPaused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isPaused) controls.stop();
    else {
      controls.start({ x: [0, -1000], transition: { duration: 20, repeat: Infinity, ease: "linear" } });
    }
  }, [isPaused, controls]);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-90" />
      <motion.div
        ref={containerRef}
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="flex gap-6 will-change-transform"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -2000, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setPaused(true)}
          onDragEnd={() => setPaused(false)}
        >
          {items.map((t, i) => (
            <Card key={i} className="min-w-[320px] max-w-[360px] bg-card/70 backdrop-blur border-border/60 shadow-card">
              <CardContent className="p-6">
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <blockquote className="text-base leading-relaxed mb-3">“{t.quote}”</blockquote>
                <div>
                  <div className="font-semibold">{t.author}</div>
                  <div className="text-muted-foreground text-sm">{t.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}