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
import { Api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Button as UIButton } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getApiBase, getApiKey, setApiBase, setApiKey } from "@/lib/config";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: honeypot } = useQuery({ queryKey: ["honeypot-recent"], queryFn: Api.getHoneypotRecent, staleTime: 10_000 });
  const { data: hpStatus } = useQuery({ queryKey: ["honeypot-status"], queryFn: Api.getHoneypotStatus, staleTime: 10_000 });
  const { data: alertData } = useQuery({ queryKey: ["critical-alerts"], queryFn: Api.getCriticalAlerts, staleTime: 10_000 });
  const [replay, setReplay] = useState<{ open: boolean; frames: Array<{ index: number; ts: string; type: string; content: string }> }>({ open: false, frames: [] });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiBase, setApiBaseState] = useState<string>(getApiBase());
  const [apiKey, setApiKeyState] = useState<string>(getApiKey());

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40">
        <div className="container mx-auto px-6 py-4">
          <div className="border border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40 shadow-lg rounded-full px-8 py-4 max-w-6xl mx-auto">
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
                <Button variant="outline" size="sm" onClick={() => setSettingsOpen(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="default" size="sm" onClick={async () => {
                  const attacks = alertData?.items ?? [];
                  const header = `Security Report (Last 24h) - Critical Incidents: ${alertData?.count24h ?? 0}`;
                  const bullets = attacks.map(a => `- ${a.timestamp} ${a.attackType} on ${a.serverUrl} (${a.severity})`).join("\n");
                  const report = `${header}\n\n${bullets}`;
                  await navigator.clipboard.writeText(report);
                }}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Alert Banner */}
      <div className="container mx-auto px-6 py-4">
        <Alert className="border-critical/20 bg-critical/5">
          <AlertTriangle className="h-4 w-4 text-critical" />
          <AlertDescription className="text-critical">
            <strong>{alertData?.count24h ?? 0} Critical Threats Detected</strong> in the last 24 hours. 
            <Button variant="link" className="p-0 h-auto text-critical underline ml-2" onClick={() => setReplay({ open: true, frames: (alertData?.items ?? []).map((a, idx) => ({ index: idx, ts: a.timestamp, type: 'input', content: `${a.attackType} on ${a.serverUrl}` })) })}>
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
                          <UIButton size="sm" variant="outline" onClick={async () => {
                            const resp = await Api.getReplay("SES-EXAMPLE");
                            setReplay({ open: true, frames: resp.frames });
                          }}>
                            <Eye className="h-4 w-4 mr-1" />
                            Replay
                          </UIButton>
                        </div>
                      </div>

  {/* Settings dialog */}
  {settingsOpen && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Settings</h3>
          <UIButton size="sm" variant="outline" onClick={() => setSettingsOpen(false)}>Close</UIButton>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">API Base URL</label>
            <Input placeholder="http://localhost:3001" value={apiBase} onChange={(e) => setApiBaseState(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">API Key</label>
            <Input placeholder="your-api-key" value={apiKey} onChange={(e) => setApiKeyState(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <UIButton variant="outline" onClick={() => { setSettingsOpen(false); }}>Cancel</UIButton>
          <UIButton onClick={() => { setApiBase(apiBase); setApiKey(apiKey); setSettingsOpen(false); window.location.reload(); }}>Save</UIButton>
        </div>
      </div>
    </div>
  )}
                      <p className="text-sm text-muted-foreground">{threat.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {replay.open && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Session Replay</h3>
                    <UIButton size="sm" variant="outline" onClick={() => setReplay({ open: false, frames: [] })}>Close</UIButton>
                  </div>
                  <div className="max-h-[60vh] overflow-auto space-y-2 text-sm font-mono">
                    {replay.frames.map((f) => (
                      <div key={f.index} className="p-2 border border-border rounded">
                        <div className="text-muted-foreground">[{f.ts}] {f.type.toUpperCase()}</div>
                        <div className="whitespace-pre-wrap">{f.content}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
                      <div className={`h-3 w-3 rounded-full ${hpStatus?.collecting ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
                      <span className="text-sm">{hpStatus?.collecting ? 'Live & Collecting Data' : 'Paused'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg p-4 bg-muted/50">
                  <h4 className="font-semibold mb-2">Recent Captures</h4>
                  <div className="space-y-2 text-sm font-mono">
                    {(honeypot?.items ?? []).map((i, idx) => (
                      <div key={idx}>
                        <span className="text-muted-foreground">[{i.ts}]</span>
                        <span className={`ml-2 ${i.severity === 'critical' ? 'text-critical' : i.severity === 'high' ? 'text-high' : 'text-medium'}`}>
                          {i.severity.toUpperCase()}:
                        </span>
                        <span className="ml-2">{i.summary}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button onClick={() => { const a = document.createElement('a'); a.href = '/api/honeypot/export'; a.download = 'honeypot_logs.csv'; document.body.appendChild(a); a.click(); a.remove(); }}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                  <Button variant="outline" onClick={async () => { const r = await Api.generateHoneypotReport(); navigator.clipboard.writeText(r.markdown); }}>
                    <Play className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" onClick={async () => { const r = await Api.generateHoneypotReport(); const share = `Honeypot Report (last 24h)\n\n${r.markdown}`; await navigator.clipboard.writeText(share); }}>
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