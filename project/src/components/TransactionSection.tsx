import { Button } from "@/components/ui/button";
import { NetworkSelector } from "@/components/network/NetworkSelector";
import { WalletStatus } from "@/components/wallet/WalletStatus";
//import { FoxIcon } from "@/components/icons/FoxIcon";
import image from './logo/123.jpg';

interface HeaderProps {
  isConnected: boolean;
  balance: string;
  walletAddress?: string;
  onConnect: () => void;
}

export function Header({ isConnected, balance, walletAddress, onConnect }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-4 justify-start">
        <img src={image} alt="Logo" className="h-12 w-15 " />
          <span className="text-lg font-bold">Web3 Wallet</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {isConnected ? (
            <>
              <NetworkSelector />
              <WalletStatus balance={balance} address={walletAddress} />
            </>
          ) : (
            <Button onClick={onConnect} variant="default">
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}