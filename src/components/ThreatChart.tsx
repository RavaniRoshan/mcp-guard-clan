import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/lib/api";

export const ThreatChart = () => {
  const { data, isLoading } = useQuery({ queryKey: ["chart"], queryFn: Api.getChart, staleTime: 10_000 });
  const points = data?.data ?? [];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Threat Detection Timeline</CardTitle>
        <CardDescription>
          24-hour threat activity analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={points}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                color: 'hsl(var(--card-foreground))'
              }}
            />
            <Area
              type="monotone"
              dataKey="critical"
              stackId="1"
              stroke="hsl(var(--critical))"
              fill="hsl(var(--critical))"
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="high"
              stackId="1"
              stroke="hsl(var(--high))"
              fill="hsl(var(--high))"
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="medium"
              stackId="1"
              stroke="hsl(var(--medium))"
              fill="hsl(var(--medium))"
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="low"
              stackId="1"
              stroke="hsl(var(--low))"
              fill="hsl(var(--low))"
              fillOpacity={0.8}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-critical rounded-full"></div>
            <span className="text-sm text-muted-foreground">Critical</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-high rounded-full"></div>
            <span className="text-sm text-muted-foreground">High</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-medium rounded-full"></div>
            <span className="text-sm text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-low rounded-full"></div>
            <span className="text-sm text-muted-foreground">Low</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};