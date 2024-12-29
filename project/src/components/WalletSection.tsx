import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletIcon, RefreshCwIcon } from "lucide-react";

interface WalletSectionProps {
  walletAddress: string;
  balance: string;
  onCreateWallet: () => void;
  onCheckBalance: () => void;
}

export function WalletSection({ 
  walletAddress, 
  balance, 
  onCreateWallet, 
  onCheckBalance 
}: WalletSectionProps) {
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Wallet</CardTitle>
        <WalletIcon className="text-primary" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            variant="default" 
            onClick={onCreateWallet}
            className="w-full"
          >
            Create New Wallet
          </Button>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Wallet Address:</p>
            <p className="text-sm font-mono break-all">
              {walletAddress || "-"}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Balance:</p>
              <p className="text-xl font-bold">{balance || "0"} ETH</p>
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={onCheckBalance}
            >
              <RefreshCwIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}