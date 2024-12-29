import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AddNetworkDialog } from "./AddNetworkDialog";
import { defaultNetworks, type Network } from "@/lib/networks";
import { NetworkIcon } from "@/components/icons/NetworkIcon";

export function NetworkSelector() {
  const [networks, setNetworks] = useState<Network[]>(defaultNetworks);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(networks[3]); // Local Network

  const handleAddNetwork = (network: Network) => {
    setNetworks([...networks, network]);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Select
        value={selectedNetwork.chainId}
        onValueChange={(value) => {
          const network = networks.find((n) => n.chainId === value);
          if (network) setSelectedNetwork(network);
        }}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue>
            <div className="flex items-center space-x-2">
              <NetworkIcon network={selectedNetwork} />
              <span>{selectedNetwork.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Mainnet</SelectLabel>
            <SelectItem value="1">
              <div className="flex items-center space-x-2">
                <NetworkIcon network={networks[0]} />
                <span>Ethereum Mainnet</span>
              </div>
            </SelectItem>
          </SelectGroup>
          <Separator className="my-2" />
          <SelectGroup>
            <SelectLabel>Test Networks</SelectLabel>
            {networks.slice(1).map((network) => (
              <SelectItem key={network.chainId} value={network.chainId}>
                <div className="flex items-center space-x-2">
                  <NetworkIcon network={network} />
                  <span>{network.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <AddNetworkDialog onAddNetwork={handleAddNetwork} />
    </div>
  );
}