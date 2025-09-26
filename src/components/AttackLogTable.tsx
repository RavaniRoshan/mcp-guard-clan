import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Download, Search, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Api } from "@/lib/api";

type AttackLog = {
  id: string;
  sessionId: string;
  timestamp: string;
  serverUrl: string;
  attackType: string;
  severity: "critical" | "high" | "medium" | "low";
  payload: string;
  blocked: boolean;
  sourceIP: string;
};

export const AttackLogTable = () => {
  const { data, isLoading } = useQuery({ queryKey: ["attacks"], queryFn: Api.getAttacks, staleTime: 10_000 });
  const [selected, setSelected] = useState<AttackLog | null>(null);

  const attackLogs = useMemo(() => data?.data ?? [], [data]);
  const total = data?.total ?? attackLogs.length;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attack Event Logs</CardTitle>
        <CardDescription>
          Detailed log of all security events and attack attempts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search attacks, IPs, or payloads..." 
                className="pl-10"
              />
            </div>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Attack Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="prompt-injection">Prompt Injection</SelectItem>
              <SelectItem value="tool-poisoning">Tool Poisoning</SelectItem>
              <SelectItem value="context-manipulation">Context Manipulation</SelectItem>
              <SelectItem value="resource-exhaustion">Resource Exhaustion</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={async () => {
            // Trigger CSV download via browser by opening the export URL
            const link = document.createElement('a');
            link.href = "/api/attacks/export";
            link.download = "attack_logs.csv";
            document.body.appendChild(link);
            link.click();
            link.remove();
          }}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Server</TableHead>
                <TableHead>Attack Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Source IP</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-sm text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : attackLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {log.id}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {log.timestamp}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {log.serverUrl}
                  </TableCell>
                  <TableCell>
                    {log.attackType}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        log.severity === "critical" ? "border-critical text-critical bg-critical/10" :
                        log.severity === "high" ? "border-high text-high bg-high/10" :
                        log.severity === "medium" ? "border-medium text-medium bg-medium/10" :
                        "border-low text-low bg-low/10"
                      }
                    >
                      {log.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {log.sourceIP}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={log.blocked ? "secondary" : "destructive"}
                      className={log.blocked ? "bg-success text-success-foreground" : ""}
                    >
                      {log.blocked ? "Blocked" : "Allowed"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => setSelected(log)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {Math.min(attackLogs.length, 5)} of {total} attack events
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>

        {selected && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 max-w-xl w-full space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Attack Details</h3>
                <Button size="sm" variant="outline" onClick={() => setSelected(null)}>Close</Button>
              </div>
              <div className="text-sm space-y-1 font-mono">
                <div><strong>ID:</strong> {selected.id}</div>
                <div><strong>Session:</strong> {selected.sessionId}</div>
                <div><strong>Time:</strong> {selected.timestamp}</div>
                <div><strong>Server:</strong> {selected.serverUrl}</div>
                <div><strong>Type:</strong> {selected.attackType}</div>
                <div><strong>Severity:</strong> {selected.severity}</div>
                <div><strong>Source IP:</strong> {selected.sourceIP}</div>
              </div>
              <div className="text-sm">
                <div className="font-semibold mb-1">Payload</div>
                <pre className="p-3 bg-muted rounded overflow-auto whitespace-pre-wrap">{selected.payload}</pre>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};