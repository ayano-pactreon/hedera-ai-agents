export interface HederaConfig {
  accountId: string;
  privateKey: string;
  network: 'testnet' | 'mainnet' | 'previewnet';
  executionMode: 'AUTONOMOUS' | 'RETURN_BYTES';
}

export interface AccountBalance {
  hbars: string;
  tokens: Record<string, string>;
}

export interface TransferRequest {
  to: string;
  amount: number;
  memo?: string;
}

export interface TransferResponse {
  success: boolean;
  transactionId: string;
  message: string;
}
