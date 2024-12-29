import { z } from "zod";

export const networkSchema = z.object({
  chainId: z.string(),
  name: z.string(),
  currency: z.object({
    name: z.string(),
    symbol: z.string(),
    decimals: z.number(),
  }),
  rpcUrl: z.string().url(),
  blockExplorer: z.string().url().optional(),
});

export type Network = z.infer<typeof networkSchema>;

export const defaultNetworks: Network[] = [
  {
    chainId: "1",
    name: "Ethereum Mainnet",
    currency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrl: "https://mainnet.infura.io/v3/your-api-key",
    blockExplorer: "https://etherscan.io",
  },
  {
    chainId: "5",
    name: "Goerli Testnet",
    currency: {
      name: "Goerli Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrl: "https://goerli.infura.io/v3/your-api-key",
    blockExplorer: "https://goerli.etherscan.io",
  },
  {
    chainId: "11155111",
    name: "Sepolia Testnet",
    currency: {
      name: "Sepolia Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrl: "https://sepolia.infura.io/v3/your-api-key",
    blockExplorer: "https://sepolia.etherscan.io",
  },
  {
    chainId: "31337",
    name: "Local Network",
    currency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrl: "http://127.0.0.1:8545",
  },
];