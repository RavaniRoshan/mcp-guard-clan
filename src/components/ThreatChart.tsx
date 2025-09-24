import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { time: '00:00', critical: 2, high: 5, medium: 12, low: 8 },
  { time: '04:00', critical: 1, high: 3, medium: 15, low: 6 },
  { time: '08:00', critical: 4, high: 8, medium: 20, low: 12 },
  { time: '12:00', critical: 6, high: 12, medium: 25, low: 18 },
  { time: '16:00', critical: 3, high: 7, medium: 18, low: 14 },
  { time: '20:00', critical: 5, high: 9, medium: 22, low: 16 },
  { time: '24:00', critical: 2, high: 4, medium: 14, low: 10 },
];

export const ThreatChart = () => {
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
          <AreaChart data={data}>
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