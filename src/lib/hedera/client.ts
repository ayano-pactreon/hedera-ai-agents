import { Client, PrivateKey, AccountId } from '@hashgraph/sdk';
import {HederaConfig} from "@/types/hedera";

class HederaClient {
  private static instance: HederaClient | null = null;
  private client: Client;
  private config: HederaConfig;

  private constructor() {
    this.config = {
      accountId: process.env.HEDERA_ACCOUNT_ID!,
      privateKey: process.env.HEDERA_PRIVATE_KEY!,
      network: (process.env.HEDERA_NETWORK as any) || 'testnet',
      executionMode: (process.env.HEDERA_EXECUTION_MODE as any) || 'AUTONOMOUS',
    };

    if (!this.config.accountId || !this.config.privateKey) {
      throw new Error('Missing Hedera credentials in environment variables');
    }

    this.client = this.initializeClient();
    console.log(`[Hedera] Connected to ${this.config.network}`);
  }

  private initializeClient(): Client {
    const privateKey = PrivateKey.fromStringECDSA(this.config.privateKey);
    const accountId = AccountId.fromString(this.config.accountId);

    let client: Client;

    switch (this.config.network) {
      case 'mainnet':
        client = Client.forMainnet();
        break;
      case 'previewnet':
        client = Client.forPreviewnet();
        break;
      case 'testnet':
      default:
        client = Client.forTestnet();
        break;
    }

    client.setOperator(accountId, privateKey);
    return client;
  }

  public static getInstance(): HederaClient {
    if (!HederaClient.instance) {
      HederaClient.instance = new HederaClient();
    }
    return HederaClient.instance;
  }

  public getClient(): Client {
    return this.client;
  }

  public getConfig(): HederaConfig {
    return this.config;
  }

  public getAccountId(): string {
    return this.config.accountId;
  }

  public async close(): Promise<void> {
    await this.client.close();
    HederaClient.instance = null;
  }
}

export default HederaClient;
