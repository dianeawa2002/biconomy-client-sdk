import { Signer } from '@ethersproject/abstract-signer'
import { SmartAccountTrx } from '@biconomy-sdk/core-types'

export type SmartAccountInfoResponse = {
  readonly name: string
  readonly version: string
  readonly api_version: string
  readonly secure: boolean
  readonly settings: {
    readonly AWS_CONFIGURED: boolean
    readonly AWS_S3_CUSTOM_DOMAIN: string
    readonly ETHEREUM_NODE_URL: string
    readonly ETHEREUM_TRACING_NODE_URL: string
    readonly ETH_INTERNAL_TXS_BLOCK_PROCESS_LIMIT: number
    readonly ETH_INTERNAL_NO_FILTER: boolean
    readonly ETH_REORG_BLOCKS: number
    readonly TOKENS_LOGO_BASE_URI: string
    readonly TOKENS_LOGO_EXTENSION: string
  }
}

export type ChainConfig = {
  chainId: number
  name: string
  symbol: string
  isL2: boolean
  isMainnet: boolean
  description: string
  blockExplorerUriTemplate: BlockExplorerConfig
  ensRegistryAddress: string
  walletFactoryAddress: string
  multiSendAddress: string
  multiSendCallAddress: string
  walletAddress: string // base wallet
  entryPoint: string //should make this address var
  fallBackHandler: string //should make this address var
  relayerURL: string
  providerUrl: string
  indexerUrl: string
  backendNodeUrl: string
  createdAt: Date
  updatedAt: Date
  token: TokenInfo
}

export type MasterCopyResponse = {
  address: string
  version: string
  deployer: string
  deployedBlockNumber: number
  lastIndexedBlockNumber: number
}

export type SafeInfoResponse = {
  readonly address: string
  readonly nonce: number
  readonly threshold: number
  readonly owners: string[]
  readonly masterCopy: string
  readonly modules: string[]
  readonly fallbackHandler: string
  readonly version: string
}

export type OwnerResponse = {
  safes: string[]
}

export type BlockExplorerConfig = {
  address: string
  txHash: string
  api: string
}

export type TokenInfo = {
  id: number
  name: string
  symbol: string
  blockChain: number
  ercType?: string
  decimals: number
  logoUri: string
  address: string
  isNativeToken: boolean
  isEnabled: boolean
  cmcId: number //Verify
  price: number //Verify
  createdAt: Date
  updatedAt: Date
}

export type ChainConfigResponse = {
  message: string
  code: number
  data: ChainConfig[]
}

export type SmartAccountCreationInfoResponse = {
  readonly created: string
  readonly creator: string
  readonly transactionHash: string
  readonly factoryAddress: string
  readonly masterCopy: string
  readonly setupData: string
  readonly dataDecoded?: string
}

export type SmartAccountDelegateDeleteConfig = {
  readonly safe: string
  readonly delegate: string
  readonly signer: Signer
}

export type SmartAccountDelegateConfig = SmartAccountDelegateDeleteConfig & {
  readonly label: string
}

export type SmartAccountDelegate = {
  readonly safe: string
  readonly delegate: string
  readonly signature: string
  readonly label: string
}

export type SafeDelegateResponse = {
  readonly delegate: string
  readonly delegator: string
  readonly label: string
}

export type SafeDelegateListResponse = {
  readonly count: number
  readonly next?: string
  readonly previous?: string
  readonly results: SafeDelegateResponse[]
}

export type SafeMultisigTransactionEstimate = {
  readonly to: string
  readonly value: string
  readonly data?: string
  readonly operation: number
}

export type SafeMultisigTransactionEstimateResponse = {
  readonly safeTxGas: string
}

export type SignatureResponse = {
  readonly signature: string
}

export type SafeMultisigConfirmationResponse = {
  readonly owner: string
  readonly submissionDate: string
  readonly transactionHash?: string
  readonly confirmationType?: string
  readonly signature: string
  readonly signatureType?: string
}

export type SafeMultisigConfirmationListResponse = {
  readonly count: number
  readonly next?: string
  readonly previous?: string
  readonly results: SafeMultisigConfirmationResponse[]
}

export type ProposeTransactionProps = {
  safeAddress: string
  senderAddress: string
  safeTransaction: SmartAccountTrx
  safeTxHash: string
  origin?: string
}

export type SafeMultisigTransactionResponse = {
  readonly safe: string
  readonly to: string
  readonly value: string
  readonly data?: string
  readonly operation: number
  readonly gasToken: string
  readonly safeTxGas: number
  readonly baseGas: number
  readonly gasPrice: string
  readonly refundReceiver?: string
  readonly nonce: number
  readonly executionDate: string
  readonly submissionDate: string
  readonly modified: string
  readonly blockNumber?: number
  readonly transactionHash: string
  readonly safeTxHash: string
  readonly executor?: string
  readonly isExecuted: boolean
  readonly isSuccessful?: boolean
  readonly ethGasPrice?: string
  readonly gasUsed?: number
  readonly fee?: number
  readonly origin: string
  readonly dataDecoded?: string
  readonly confirmationsRequired: number
  readonly confirmations?: SafeMultisigConfirmationResponse[]
  readonly signatures?: string
}

export type SafeMultisigTransactionListResponse = {
  readonly count: number
  readonly next?: string
  readonly previous?: string
  readonly results: SafeMultisigTransactionResponse[]
}

export type TransferResponse = {
  readonly type?: string
  readonly executionDate: string
  readonly blockNumber: number
  readonly transactionHash: string
  readonly to: string
  readonly value: string
  readonly tokenId: string
  readonly tokenAddress?: string
  readonly from: string
}

export type TransferListResponse = {
  readonly count: number
  readonly next?: string
  readonly previous?: string
  readonly results: TransferResponse[]
}

export type SafeModuleTransaction = {
  readonly created?: string
  readonly executionDate: string
  readonly blockNumber?: number
  readonly isSuccessful?: boolean
  readonly transactionHash?: string
  readonly safe: string
  readonly module: string
  readonly to: string
  readonly value: string
  readonly data: string
  readonly operation: number
  readonly dataDecoded?: string
}

export type SafeModuleTransactionListResponse = {
  readonly count: number
  readonly next?: string
  readonly previous?: string
  readonly results: SafeModuleTransaction[]
}

export type Erc20Info = {
  readonly name: string
  readonly symbol: string
  readonly decimals: number
  readonly logoUri: string
}

export type SafeBalancesOptions = {
  excludeSpamTokens?: boolean
}

export type SafeBalanceResponse = {
  readonly tokenAddress: string
  readonly token: Erc20Info
  readonly balance: string
}

export type SafeBalancesUsdOptions = {
  excludeSpamTokens?: boolean
}

export type SafeBalanceUsdResponse = {
  readonly tokenAddress: string
  readonly token: Erc20Info
  readonly balance: string
  readonly ethValue: string
  readonly timestamp: string
  readonly fiatBalance: string
  readonly fiatConversion: string
  readonly fiatCode: string
}

export type SafeCollectiblesOptions = {
  excludeSpamTokens?: boolean
}

export type SafeCollectibleResponse = {
  readonly address: string
  readonly tokenName: string
  readonly tokenSymbol: string
  readonly logoUri: string
  readonly id: string
  readonly uri: string
  readonly name: string
  readonly description: string
  readonly imageUri: string
  readonly metadata: any
}

export type TokenInfoResponse = {
  readonly type?: string
  readonly address: string
  readonly name: string
  readonly symbol: string
  readonly decimals: number
  readonly logoUri?: string
}

export type TokenInfoListResponse = {
  readonly count: number
  readonly next?: string
  readonly previous?: string
  readonly results: TokenInfoListResponse[]
}

export type TransferWithTokenInfoResponse = TransferResponse & {
  readonly tokenInfo: TokenInfoResponse
}

export type SafeModuleTransactionWithTransfersResponse = SafeModuleTransaction & {
  readonly txType?: 'MODULE_TRANSACTION'
  readonly transfers: TransferWithTokenInfoResponse[]
}

export type SafeMultisigTransactionWithTransfersResponse = SafeMultisigTransactionResponse & {
  readonly txType?: 'MULTISIG_TRANSACTION'
  readonly transfers: TransferWithTokenInfoResponse[]
}

export type EthereumTxResponse = {
  readonly executionDate: string
  readonly to: string
  readonly data: string
  readonly txHash: string
  readonly blockNumber?: number
  readonly from: string
}

export type EthereumTxWithTransfersResponse = EthereumTxResponse & {
  readonly txType?: 'ETHEREUM_TRANSACTION'
  readonly transfers: TransferWithTokenInfoResponse[]
}

export type AllTransactionsOptions = {
  executed?: boolean
  queued?: boolean
  trusted?: boolean
}

export type AllTransactionsListResponse = {
  readonly count: number
  readonly next?: string
  readonly previous?: string
  readonly results: Array<
    | SafeModuleTransactionWithTransfersResponse
    | SafeMultisigTransactionWithTransfersResponse
    | EthereumTxWithTransfersResponse
  >
}