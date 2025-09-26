import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  AlertTriangle, 
  Eye,
  Zap
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/lib/api";

export const ThreatMetrics = () => {
  const { data, isLoading } = useQuery({ queryKey: ["metrics"], queryFn: Api.getMetrics, staleTime: 10_000 });
  const metrics = [
    {
      title: "Security Score",
      value: isLoading ? "--" : String(data?.securityScore ?? "--"),
      unit: "/100",
      change: isLoading ? "--" : `${data ? `${data.deltas.securityScore}%` : "--"}`,
      trend: isLoading ? "up" : (data && data.deltas.securityScore >= 0 ? "up" : "down"),
      icon: Shield,
      color: "success",
      description: "Overall protection effectiveness"
    },
    {
      title: "Active Threats",
      value: isLoading ? "--" : String(data?.activeThreats ?? "--"),
      unit: "",
      change: isLoading ? "--" : `${data ? `${data.deltas.activeThreats}%` : "--"}`,
      trend: isLoading ? "down" : (data && data.deltas.activeThreats <= 0 ? "down" : "up"),
      icon: AlertTriangle,
      color: "critical",
      description: "Currently detected threats"
    },
    {
      title: "Monitored Servers",
      value: isLoading ? "--" : String(data?.monitoredServers ?? "--"),
      unit: "",
      change: isLoading ? "--" : `${data ? `${data.deltas.monitoredServers}` : "--"}`,
      trend: "up",
      icon: Eye,
      color: "primary",
      description: "MCP servers under protection"
    },
    {
      title: "Response Time",
      value: isLoading ? "--" : String(data?.responseTimeMs ?? "--"),
      unit: "ms",
      change: isLoading ? "--" : `${data ? `${data.deltas.responseTimeMs}ms` : "--"}`,
      trend: isLoading ? "down" : (data && data.deltas.responseTimeMs <= 0 ? "down" : "up"),
      icon: Zap,
      color: "info",
      description: "Average threat detection speed"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const isPositive = metric.trend === "up" && !metric.title.includes("Threats") || 
                          metric.trend === "down" && metric.title.includes("Threats") ||
                          metric.trend === "down" && metric.title.includes("Response Time");
        
        return (
          <Card key={index} className="shadow-card hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${
                metric.color === "success" ? "text-success" :
                metric.color === "critical" ? "text-critical" :
                metric.color === "primary" ? "text-primary" :
                "text-info"
              }`} />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline space-x-1">
                  <div className="text-2xl font-bold">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.unit}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      isPositive ? "text-success border-success/20 bg-success/10" :
                      "text-critical border-critical/20 bg-critical/10"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {metric.change}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
                {metric.title === "Security Score" && (
                  <Progress 
                    value={parseInt(metric.value)} 
                    className="h-2 mt-2"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};