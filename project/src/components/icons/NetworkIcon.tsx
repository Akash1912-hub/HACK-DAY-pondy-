import { Network } from "@/lib/networks";
import { Globe, Server, Shield } from "lucide-react";

interface NetworkIconProps {
  network: Network;
  className?: string;
}

export function NetworkIcon({ network, className = "w-4 h-4" }: NetworkIconProps) {
  if (network.chainId === "1") {
    return <Globe className={`${className} text-blue-500`} />;
  }
  
  if (network.rpcUrl.includes("localhost") || network.rpcUrl.includes("127.0.0.1")) {
    return <Server className={`${className} text-purple-500`} />;
  }
  
  return <Shield className={`${className} text-green-500`} />;
}