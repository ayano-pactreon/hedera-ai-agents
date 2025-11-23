import {coreAccountQueryPlugin, coreTokenPlugin, HederaLangchainToolkit} from 'hedera-agent-kit';
import {
  coreAccountPlugin,
  coreConsensusPlugin,
} from 'hedera-agent-kit';
import HederaClient from './client';

class HederaToolkit {
  private static instance: HederaToolkit | null = null;
  private toolkit: HederaLangchainToolkit;

  private constructor() {
    const hederaClient = HederaClient.getInstance();
    const client = hederaClient.getClient();
    const config = hederaClient.getConfig();

    this.toolkit = new HederaLangchainToolkit({
      client,
      configuration: {
        plugins: [
          coreAccountPlugin,      // HBAR transfers
          coreConsensusPlugin,    // Topic operations
          coreTokenPlugin,        // Token & NFT operations
          coreAccountQueryPlugin, // Balance & account queries
        ],
      },
    });

    console.log('[Toolkit] Initialized with Hedera plugins');
  }

  public static getInstance(): HederaToolkit {
    if (!HederaToolkit.instance) {
      HederaToolkit.instance = new HederaToolkit();
    }
    return HederaToolkit.instance;
  }

  public getTools() {
    return this.toolkit.getTools();
  }
}

export default HederaToolkit;
