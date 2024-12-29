import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Activity {
  type: "send" | "receive";
  amount: string;
  address: string;
  timestamp: string;
}

const mockActivity: Activity[] = [
  {
    type: "send",
    amount: "0.1 ETH",
    address: "0x1234...5678",
    timestamp: "2 mins ago",
  },
  {
    type: "receive",
    amount: "0.05 ETH",
    address: "0x8765...4321",
    timestamp: "1 hour ago",
  },
];

export function ActivityList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {mockActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {activity.type === "send" ? (
                    <ArrowUpRight className="text-destructive" />
                  ) : (
                    <ArrowDownRight className="text-green-500" />
                  )}
                  <div>
                    <p className="font-medium">
                      {activity.type === "send" ? "Sent" : "Received"} {activity.amount}
                    </p>
                    <p className="text-sm text-muted-foreground">To: {activity.address}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}