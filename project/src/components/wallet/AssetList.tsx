import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TokenIcon } from "@/components/icons/TokenIcon";

interface Asset {
  symbol: string;
  balance: string;
  value: string;
}

const mockAssets: Asset[] = [
  { symbol: "ETH", balance: "0.5", value: "$925.50" },
  { symbol: "USDC", balance: "100.00", value: "$100.00" },
  { symbol: "USDT", balance: "50.00", value: "$50.00" },
];

export function AssetList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {mockAssets.map((asset) => (
              <div
                key={asset.symbol}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <TokenIcon symbol={asset.symbol} />
                  <div>
                    <p className="font-medium">{asset.symbol}</p>
                    <p className="text-sm text-muted-foreground">{asset.balance}</p>
                  </div>
                </div>
                <p className="font-medium">{asset.value}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}