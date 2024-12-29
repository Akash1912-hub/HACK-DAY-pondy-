export interface Transaction {
  hash: string;
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  status: boolean;
  timestamp: number;
}

export interface TransactionError {
  code: number;
  message: string;
}