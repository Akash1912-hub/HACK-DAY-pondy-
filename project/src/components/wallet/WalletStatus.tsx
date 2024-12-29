import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CopyIcon, ExternalLinkIcon } from "lucide-react";

interface WalletStatusProps {
  balance: string;
  address?: string;
}

export function WalletStatus({ balance, address }: WalletStatusProps) {
  const shortenedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <span>{balance} ETH</span>
          <span className="text-muted-foreground">{shortenedAddress}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress}>
          <CopyIcon className="mr-2 h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ExternalLinkIcon className="mr-2 h-4 w-4" />
          View on Explorer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}