import { CircleDollarSign, Coins } from "lucide-react";

interface TokenIconProps {
  symbol: string;
  className?: string;
}

export function TokenIcon({ symbol, className = "w-8 h-8" }: TokenIconProps) {
  switch (symbol) {
    case "ETH":
      return <Coins className={className} />;
    case "USDC":
    case "USDT":
      return <CircleDollarSign className={className} />;
    default:
      return <Coins className={className} />;
  }
}