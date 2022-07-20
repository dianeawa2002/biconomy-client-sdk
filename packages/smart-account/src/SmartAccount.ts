import { SmartAccountConfig, networks, NetworkConfig, ChainId, ChainConfig, SmartAccountState, SmartAccountContext } from './types'
import EthersAdapter from '@biconomy-sdk/ethers-lib'
import { ethers, providers } from 'ethers'
import {
  getSmartWalletFactoryContract,
  getMultiSendContract,
  getSmartWalletContract
} from './utils/FetchContractsInfo'
import {
  SmartWalletFactoryContract,
  SmartWalletContract,
  MultiSendContract,
  TransactionResult
} from '@biconomy-sdk/core-types'
import SafeServiceClient from '@biconomy-sdk/node-client';
import { Web3Provider } from '@ethersproject/providers'
import { Relayer } from '@biconomy-sdk/relayer';

class SmartAccount {
  // { ethAdapter } is a window that gave access to all the Implemented function of it
  ethAdapter!: { [chainId: number]: EthersAdapter }

  context!: { [chainId: number]: SmartAccountContext }

  // hold instantiated chain info
  #smartAccountConfig!: SmartAccountConfig

  // hold supported network info
  supportedNetworkIds!: ChainId[]

  providers!:  Web3Provider[]

  nodeClient!: SafeServiceClient 

  relayer!: Relayer

  owner!: string

  address!: string

  // contract instances
  smartWalletContract!: { [chainId: number]: SmartWalletContract }
  multiSendContract!: { [chainId: number]: MultiSendContract }
  smartWalletFactoryContract!: { [chainId: number]: SmartWalletFactoryContract }


  // Review :: ToDo
  // To be able to passs provider : WalletProviderLike 
  constructor(config: SmartAccountConfig) {

    this.#smartAccountConfig = config
    this.ethAdapter = {}
    this.smartWalletContract = {}
    this.multiSendContract = {}
    this.smartWalletFactoryContract = {}
    this.supportedNetworkIds = config.supportedNetworksIds
    this.providers = config.providers
    
    this.nodeClient = new SafeServiceClient({txServiceUrl: config.backend_url});
  }

  // for testing
  // providers and contracts initialization
  public async init(): Promise<SmartAccount> {
    const chainConfig = await this.getSupportedChainsInfo();
    console.log("chain config: ", chainConfig);
    // instead of getting from networks, get details from chainConfig

    for(let i=0; i < this.supportedNetworkIds.length; i++) {
      const network = this.supportedNetworkIds[i];
      const provider = this.providers[i];
      // check if corresponds to same chainId correctly
      const signer = provider.getSigner();

      // instantiating EthersAdapter instance and maintain it as class level variable
      this.ethAdapter[network] = new EthersAdapter({
        ethers,
        signer
      })

      // TODO
      //this.context[network].entryPointAddress = networks[network].entryPoint; // come from chainConfig
      //this.context[network].fallbackHandlerAddress = networks[network].fallbackHandler; // come from chainConfig

      this.initializeContracts(network);
    }   
    // Review
    this.owner = await this.ethersAdapter().getSignerAddress();
    this.address = await this.getAddress();
    return this;
  }

  // getSupportedNetworks / chains endpoint


  // intialize contract to be used throughout this class
  private initializeContracts(chainId: ChainId) {
    this.smartWalletFactoryContract[networks[chainId].chainId] = getSmartWalletFactoryContract(
      chainId,
      this.ethAdapter[chainId]
    );

    this.smartWalletContract[networks[chainId].chainId] = getSmartWalletContract(
      chainId,
      this.ethAdapter[chainId]
    );

    this.multiSendContract[networks[chainId].chainId] = getMultiSendContract(
      chainId,
      this.ethAdapter[chainId]
    );
  }

  private async getSupportedChainsInfo(): Promise<ChainConfig[]> {
    return this.nodeClient.getChainInfo();
  }

  // return adapter instance to be used for blockchain interactions
  ethersAdapter(chainId: ChainId = this.#smartAccountConfig.activeNetworkId): EthersAdapter {
    return this.ethAdapter[chainId]
  }

  // return configuration used for intialization of the { wallet } instance
  getSmartAccountConfig(chainId: ChainId = this.#smartAccountConfig.activeNetworkId): NetworkConfig {
    // networks should come from chainConfig instead
    return networks[chainId]
  }

  // Assigns transaction relayer to this smart wallet instance
  setRelayer(relayer: Relayer): SmartAccount {
    if (relayer === undefined) return this
    this.relayer = relayer
    return this
  }

  // return smartaccount instance
  smartAccount(chainId: ChainId = this.#smartAccountConfig.activeNetworkId): SmartWalletContract {
    return this.smartWalletContract[networks[chainId].chainId]
  }

  factory(chainId: ChainId = this.#smartAccountConfig.activeNetworkId): SmartWalletFactoryContract {
    return this.smartWalletFactoryContract[networks[chainId].chainId]
  }

  // Optional index allowed
  async getAddress(index: number = 0, chainId: ChainId = this.#smartAccountConfig.activeNetworkId) : Promise<string> {
    return await this.getAddressForCounterfactualWallet(index,chainId);
  }

  // Review
  // might be coming wrong..
  async isDeployed(chainId: ChainId = this.#smartAccountConfig.activeNetworkId): Promise<boolean> {
    const readProvider = new ethers.providers.JsonRpcProvider(networks[chainId].providerUrl);
    const walletCode = await readProvider.getCode(await this.getAddress(chainId));
    return !!walletCode && walletCode !== '0x'
  }

  async getSmartAccountState(chainId: ChainId = this.#smartAccountConfig.activeNetworkId): Promise<SmartAccountState> {
    const state: SmartAccountState = {
       address: this.address,
       owner: this.owner,
       isDeployed: await this.isDeployed(chainId)
    }
    return state;
  }

  async getSmartAccountContext(chainId: ChainId = this.#smartAccountConfig.activeNetworkId): Promise<SmartAccountContext> {
    const context: SmartAccountContext = {
      entryPointAddress: networks[chainId].entryPoint,
      fallbackHandlerAddress: networks[chainId].fallbackHandler
   }
   return context;
  }

  // more methods
  // accountConfiguration?
  // sendSignedTransaction
  // signMessage
  // signTransaction
  // Discuss about multichain aspect of relayer node url and clients
  // TODO: get details from backend config

  // more methods to fetch balance via backend -> indexer node

  /**
   * @param address Owner aka {EOA} address
   * @param index number of smart account deploy i.e {0, 1 ,2 ...}
   * @description return address for Smart account
   * @returns
   */
  async getAddressForCounterfactualWallet(index: number = 0, chainId: ChainId = this.#smartAccountConfig.activeNetworkId): Promise<string> {
    return await this.smartWalletFactoryContract[
      networks[chainId].chainId
    ].getAddressForCounterfactualWallet(this.owner, index)
  }
}
export default SmartAccount