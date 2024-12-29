import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServerIcon } from "lucide-react";

interface NetworkStatusProps {
  isConnected: boolean;
  networkInfo: string;
  onConnect: () => void;
}

export function NetworkStatus({ isConnected, networkInfo, onConnect }: NetworkStatusProps) {
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Network Status</CardTitle>
        <ServerIcon className={isConnected ? "text-green-500" : "text-destructive"} />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            variant={isConnected ? "secondary" : "default"} 
            onClick={onConnect}
            className="w-full"
          >
            {isConnected ? "Connected" : "Connect to Network"}
          </Button>
          <p className="text-sm text-muted-foreground">{networkInfo}</p>
        </div>
      </CardContent>
    </Card>
  );
}