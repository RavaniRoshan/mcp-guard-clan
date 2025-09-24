import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Eye, 
  Bell, 
  Settings,
  ExternalLink,
  Play,
  Download,
  Share2
} from "lucide-react";
import { ThreatChart } from "@/components/ThreatChart";
import { AttackLogTable } from "@/components/AttackLogTable";
import { ThreatMetrics } from "@/components/ThreatMetrics";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  MCP Security Guardian
                </h1>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Live Monitoring
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="default" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Alert Banner */}
      <div className="container mx-auto px-6 py-4">
        <Alert className="border-critical/20 bg-critical/5">
          <AlertTriangle className="h-4 w-4 text-critical" />
          <AlertDescription className="text-critical">
            <strong>3 Critical Threats Detected</strong> in the last 24 hours. 
            <Button variant="link" className="p-0 h-auto text-critical underline ml-2">
              View Details
            </Button>
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="threats">Threats</TabsTrigger>
            <TabsTrigger value="logs">Attack Logs</TabsTrigger>
            <TabsTrigger value="honeypot">Honeypot</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ThreatMetrics />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ThreatChart />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-primary" />
                    Real-time Activity
                  </CardTitle>
                  <CardDescription>
                    Live monitoring of MCP server interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "14:23:45", event: "Prompt injection attempt blocked", severity: "critical" },
                      { time: "14:22:10", event: "Tool poisoning detected", severity: "high" },
                      { time: "14:20:33", event: "Normal server request", severity: "low" },
                      { time: "14:19:57", event: "Suspicious context manipulation", severity: "medium" },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-muted-foreground font-mono">
                            {activity.time}
                          </span>
                          <span className="text-sm">{activity.event}</span>
                        </div>
                        <Badge 
                          variant={activity.severity === "critical" ? "destructive" : 
                                  activity.severity === "high" ? "secondary" :
                                  activity.severity === "medium" ? "outline" : "secondary"}
                          className={
                            activity.severity === "critical" ? "bg-critical text-critical-foreground" :
                            activity.severity === "high" ? "bg-high text-high-foreground" :
                            activity.severity === "medium" ? "bg-medium text-medium-foreground" :
                            "bg-success text-success-foreground"
                          }
                        >
                          {activity.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="threats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-danger shadow-danger">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white">Critical Threats</CardTitle>
                  <CardDescription className="text-white/80">
                    Immediate action required
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">12</div>
                  <p className="text-white/80 text-sm">+3 in last 24h</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Active Monitoring</CardTitle>
                  <CardDescription>
                    MCP servers under protection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">8</div>
                  <p className="text-muted-foreground text-sm">All systems operational</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Blocked Attacks</CardTitle>
                  <CardDescription>
                    Today's prevention count
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">47</div>
                  <p className="text-muted-foreground text-sm">+12 from yesterday</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Threat Detection Patterns</CardTitle>
                <CardDescription>
                  AI-powered analysis of attack vectors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      pattern: "Prompt Injection via Context Manipulation", 
                      count: 15, 
                      severity: "critical",
                      description: "Attackers inserting malicious prompts through context data"
                    },
                    { 
                      pattern: "Tool Function Poisoning", 
                      count: 8, 
                      severity: "high",
                      description: "Attempts to modify tool function definitions"
                    },
                    { 
                      pattern: "Resource Exhaustion Attack", 
                      count: 24, 
                      severity: "medium",
                      description: "Excessive requests to overwhelm server resources"
                    },
                  ].map((threat, i) => (
                    <div key={i} className="p-4 border border-border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{threat.pattern}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant="outline"
                            className={
                              threat.severity === "critical" ? "border-critical text-critical" :
                              threat.severity === "high" ? "border-high text-high" :
                              "border-medium text-medium"
                            }
                          >
                            {threat.count} detected
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Replay
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{threat.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <AttackLogTable />
          </TabsContent>

          <TabsContent value="honeypot" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Honeypot MCP Server
                </CardTitle>
                <CardDescription>
                  Deployed decoy server collecting real attack data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Server URL</label>
                    <div className="flex items-center space-x-2">
                      <code className="px-2 py-1 bg-muted rounded text-sm flex-1">
                        https://honeypot.mcpguardian.dev
                      </code>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 bg-success rounded-full animate-pulse"></div>
                      <span className="text-sm">Live & Collecting Data</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg p-4 bg-muted/50">
                  <h4 className="font-semibold mb-2">Recent Captures</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <div>
                      <span className="text-muted-foreground">[14:25:32]</span>
                      <span className="text-critical ml-2">CRITICAL:</span>
                      <span className="ml-2">Prompt injection: "Ignore all previous instructions..."</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">[14:24:15]</span>
                      <span className="text-high ml-2">HIGH:</span>
                      <span className="ml-2">Tool poisoning attempt on filesystem access</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">[14:23:01]</span>
                      <span className="text-medium ml-2">MEDIUM:</span>
                      <span className="ml-2">Suspicious context manipulation detected</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                  <Button variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Findings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};