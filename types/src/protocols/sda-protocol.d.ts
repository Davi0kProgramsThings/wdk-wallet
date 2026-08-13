// This file has been automatically generated with jsdoc-to-d-ts
/**
 * Interface for "Smart Deposit Address" (SDA) protocols: services that issue a deposit address, accept a
 * stablecoin (or native token) from a supported source chain, convert it, and deliver a chosen asset (e.g., USDT)
 * to a chosen destination chain and address.
 *
 * The required core every protocol implements is route discovery and address creation; every other operation is
 * optional.
 *
 * @interface
 */
export interface ISdaProtocol {
    /**
     * Lists the conversion routes the protocol supports: source chains, accepted input tokens, output assets and
     * per-route deposit limits. A protocol that discovers routes by blockchain pairs might require the `sourceChain`
     * and `destinationChain` options to be set.
     *
     * @param {SdaRoutesOptions} [options] - Optional filters for route discovery.
     * @returns {Promise<SdaRoute[]>} The supported routes.
     * @throws {ValueError} If the protocol discovers routes by blockchain pairs and the source or destination blockchain
     *   is not set.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to fetch the available routes.
     */
    getSupportedRoutes(options?: SdaRoutesOptions): Promise<SdaRoute[]>;
    /**
     * Fetches a non-binding quote (estimate) for a deposit — what a given deposit would deliver.
     *
     * @param {SdaDepositOptions} options - The quote options.
     * @returns {Promise<SdaDepositQuote>} The quoted deposit details.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {ReadOnlyAccountRequiredError} If the protocol requires a read-only or full account to quote the costs of a deposit.
     * @throws {ValueError} If the deposit options are not valid.
     * @throws {InvalidTokenError} If the input token is not a valid ERC 20 token's address.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to estimate the costs of the deposit.
     */
    quoteDeposit(options: SdaDepositOptions): Promise<SdaDepositQuote>;
    /**
     * Creates deposit addresses for the given route and destination, ready to receive per the protocol's activation
     * lifecycle — a protocol that activates addresses also activates the created address so it is monitored. Returns
     * one entry per distinct address: a protocol that issues a single address across a chain family returns one entry
     * covering all of `sourceChains`, while a protocol that issues one address per source chain returns one entry each.
     *
     * @param {SdaCreateDepositAddressOptions} options - The address creation options.
     * @returns {Promise<SdaDepositAddress[]>} The created deposit addresses, one per distinct address.
     * @throws {AccountRequiredError} If the protocol requires a full account to create a new deposit address.
     * @throws {ValueError} If the create deposit address options are not valid.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to create a new deposit address.
     * @throws {SdaError} If the operation fails with an error.
     */
    createDepositAddress(options: SdaCreateDepositAddressOptions): Promise<SdaDepositAddress[]>;
    /**
     * Derives a deposit address client-side, without any protocol call and without activating or monitoring it —
     * used to verify (derive + compare) or recover an address for a self-custodial protocol.
     *
     * @param {SdaCreateDepositAddressOptions} options - The same options passed to
     *   {@link ISdaProtocol#createDepositAddress}; a protocol needing extra derivation inputs declares them on its own
     *   options type (which extends `SdaCreateDepositAddressOptions`).
     * @returns {Promise<string>} The derived deposit address.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {AccountRequiredError} If the protocol requires a full account to derive a deposit address.
     * @throws {ValueError} If the create deposit address options are not valid.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to derive the deposit address.
     * @throws {SdaError} If the operation fails with an error.
     */
    deriveDepositAddress(options: SdaCreateDepositAddressOptions): Promise<string>;
    /**
     * Looks up an existing deposit address by its identifier — the `SdaDepositAddress.id` returned by
     * {@link ISdaProtocol#createDepositAddress}, which round-trips any chain context the protocol needs.
     *
     * @param {string} id - The deposit-address identifier returned in `SdaDepositAddress.id` (round-trips any chain
     *   context the protocol needs).
     * @returns {Promise<SdaDepositAddress>} The deposit address descriptor.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {ValueError} If the id is not valid.
     * @throws {NoSuchElementError} If no deposit address exists for the given id.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to fetch the deposit's address.
     */
    getDepositAddress(id: string): Promise<SdaDepositAddress>;
    /**
     * Refreshes the activation of a deposit address so the protocol keeps monitoring it.
     *
     * @param {string} id - The deposit-address identifier returned in `SdaDepositAddress.id`.
     * @returns {Promise<SdaDepositAddress>} The refreshed deposit address descriptor (with the new `expiry`).
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {AccountRequiredError} If the protocol requires a full account to renew a deposit address.
     * @throws {ValueError} If the id is not valid.
     * @throws {NoSuchElementError} If no deposit address exists for the given id.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to renew the deposit address.
     * @throws {SdaError} If the operation fails with an error.
     */
    renewDepositAddress(id: string): Promise<SdaDepositAddress>;
    /**
     * Lists the deposits observed at a deposit address.
     *
     * @param {string} address - The deposit address to list transfers for.
     * @param {SdaTransfersOptions} [options] - Optional pagination/filtering, plus `sourceChain` for protocols that key
     *   addresses by (address, chain).
     * @returns {Promise<SdaTransfer[]>} The transfers for the address.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to fetch transfers.
     */
    getTransfers(address: string, options?: SdaTransfersOptions): Promise<SdaTransfer[]>;
    /**
     * Lists transfers aggregated by recipient — every deposit routed to the given recipient across all of that
     * recipient's deposit addresses and source chains.
     *
     * @param {Blockchain} destinationChain - The destination chain the transfers are delivered to.
     * @param {string} recipient - The recipient (destination) address to aggregate transfers for.
     * @param {SdaTransfersOptions} [options] - Optional pagination/filtering.
     * @returns {Promise<SdaTransfer[]>} The transfers routed to the recipient.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to fetch transfers.
     */
    getTransfersByRecipient(destinationChain: Blockchain, recipient: string, options?: SdaTransfersOptions): Promise<SdaTransfer[]>;
    /**
     * Retrieves a single transfer by its identifier.
     *
     * @param {string} id - The transfer identifier.
     * @returns {Promise<SdaTransfer>} The transfer's current status.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {ValueError} If the id is not valid.
     * @throws {NoSuchElementError} If no transfer exists for the given id.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to fetch the transfer.
     */
    getTransfer(id: string): Promise<SdaTransfer>;
    /**
     * Recovers a deposit or address that was not picked up automatically, using the protocol's recovery mode.
     *
     * @param {SdaRecoveryOptions} options - The recovery options.
     * @returns {Promise<SdaRecoveryResult>} The recovery outcome.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {AccountRequiredError} If the protocol requires a full account to recover a deposit address.
     * @throws {ValueError} If the id is not valid.
     * @throws {NoSuchElementError} If no deposit address exists for the given id or address.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to recover the deposit address.
     * @throws {SdaError} If the operation fails with an error.
     */
    recoverDepositAddress(options: SdaRecoveryOptions): Promise<SdaRecoveryResult>;
    /**
     * Disables a deposit address so it no longer accepts deposits.
     *
     * @param {string} id - The deposit-address identifier returned in `SdaDepositAddress.id` (round-trips any chain
     *   context the protocol needs).
     * @returns {Promise<void>} Resolves once the address has been disabled.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {AccountRequiredError} If the protocol requires a full account to disable a deposit address.
     * @throws {ValueError} If the id is not valid.
     * @throws {NoSuchElementError} If no deposit address exists for the given id.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to disable the deposit address.
     * @throws {SdaError} If the operation fails with an error.
     */
    disableDepositAddress(id: string): Promise<void>;
}
/**
 * Abstract base class for "Smart Deposit Address" (SDA) protocols.
 *
 * @abstract
 * @implements {ISdaProtocol}
 */
export default abstract class SdaProtocol implements ISdaProtocol {
    /**
     * The wallet account to use to interact with the protocol. The account's address is the default delivery
     * destination for created addresses.
     *
     * @protected
     * @type {IWalletAccountReadOnly | IWalletAccount | undefined}
     */
    protected _account: IWalletAccountReadOnly | IWalletAccount | undefined;
    /**
     * Creates a new SDA protocol without binding it to a wallet account.
     *
     * @overload
     * @param {undefined} [account] - The wallet account to use to interact with the protocol.
     */
    constructor(account?: undefined);
    /**
     * Creates a new read-only SDA protocol.
     *
     * @overload
     * @param {IWalletAccountReadOnly} account - The wallet account to use to interact with the protocol.
     */
    constructor(account: IWalletAccountReadOnly);
    /**
     * Creates a new SDA protocol.
     *
     * @overload
     * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
     */
    constructor(account: IWalletAccount);
    /**
     * Lists the conversion routes the protocol supports: source chains, accepted input tokens, output assets and
     * per-route deposit limits. A protocol that discovers routes by blockchain pairs might require the `sourceChain`
     * and `destinationChain` options to be set.
     *
     * @abstract
     * @param {SdaRoutesOptions} [options] - Optional filters for route discovery.
     * @returns {Promise<SdaRoute[]>} The supported routes.
     * @throws {ValueError} If the protocol discovers routes by blockchain pairs and the source or destination blockchain
     *   is not set.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to fetch the available routes.
     */
    abstract getSupportedRoutes(options?: SdaRoutesOptions): Promise<SdaRoute[]>;
    /**
     * Fetches a non-binding quote (estimate) for a deposit — what a given deposit would deliver.
     *
     * @param {SdaDepositOptions} options - The quote options.
     * @returns {Promise<SdaDepositQuote>} The quoted deposit details.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {ReadOnlyAccountRequiredError} If the protocol requires a read-only or full account to quote the costs of a deposit.
     * @throws {ValueError} If the deposit options are not valid.
     * @throws {InvalidTokenError} If the input token is not a valid ERC 20 token's address.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to estimate the costs of the deposit.
     */
    quoteDeposit(options: SdaDepositOptions): Promise<SdaDepositQuote>;
    /**
     * Creates deposit addresses for the given route and destination, ready to receive per the protocol's activation
     * lifecycle — a protocol that activates addresses also activates the created address so it is monitored. Returns
     * one entry per distinct address: a protocol that issues a single address across a chain family returns one entry
     * covering all of `sourceChains`, while a protocol that issues one address per source chain returns one entry each.
     *
     * @abstract
     * @param {SdaCreateDepositAddressOptions} options - The address creation options.
     * @returns {Promise<SdaDepositAddress[]>} The created deposit addresses, one per distinct address.
     * @throws {AccountRequiredError} If the protocol requires a full account to create a new deposit address.
     * @throws {ValueError} If the create deposit address options are not valid.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to create a new deposit address.
     * @throws {SdaError} If the operation fails with an error.
     */
    abstract createDepositAddress(options: SdaCreateDepositAddressOptions): Promise<SdaDepositAddress[]>;
    /**
     * Derives a deposit address client-side, without any protocol call and without activating or monitoring it —
     * used to verify (derive + compare) or recover an address for a self-custodial protocol.
     *
     * @param {SdaCreateDepositAddressOptions} options - The same options passed to
     *   {@link ISdaProtocol#createDepositAddress}; a protocol needing extra derivation inputs declares them on its own
     *   options type (which extends `SdaCreateDepositAddressOptions`).
     * @returns {Promise<string>} The derived deposit address.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {AccountRequiredError} If the protocol requires a full account to derive a deposit address.
     * @throws {ValueError} If the create deposit address options are not valid.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to derive the deposit address.
     * @throws {SdaError} If the operation fails with an error.
     */
    deriveDepositAddress(options: SdaCreateDepositAddressOptions): Promise<string>;
    /**
     * Looks up an existing deposit address by its identifier — the `SdaDepositAddress.id` returned by
     * {@link ISdaProtocol#createDepositAddress}, which round-trips any chain context the protocol needs.
     *
     * @param {string} id - The deposit-address identifier returned in `SdaDepositAddress.id` (round-trips any chain
     *   context the protocol needs).
     * @returns {Promise<SdaDepositAddress>} The deposit address descriptor.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {ValueError} If the id is not valid.
     * @throws {NoSuchElementError} If no deposit address exists for the given id.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to fetch the deposit's address.
     */
    getDepositAddress(id: string): Promise<SdaDepositAddress>;
    /**
     * Refreshes the activation of a deposit address so the protocol keeps monitoring it.
     *
     * @param {string} id - The deposit-address identifier returned in `SdaDepositAddress.id`.
     * @returns {Promise<SdaDepositAddress>} The refreshed deposit address descriptor (with the new `expiry`).
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {AccountRequiredError} If the protocol requires a full account to renew a deposit address.
     * @throws {ValueError} If the id is not valid.
     * @throws {NoSuchElementError} If no deposit address exists for the given id.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to renew the deposit address.
     * @throws {SdaError} If the operation fails with an error.
     */
    renewDepositAddress(id: string): Promise<SdaDepositAddress>;
    /**
     * Lists the deposits observed at a deposit address.
     *
     * @param {string} address - The deposit address to list transfers for.
     * @param {SdaTransfersOptions} [options] - Optional pagination/filtering, plus `sourceChain` for protocols that key
     *   addresses by (address, chain).
     * @returns {Promise<SdaTransfer[]>} The transfers for the address.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to fetch transfers.
     */
    getTransfers(address: string, options?: SdaTransfersOptions): Promise<SdaTransfer[]>;
    /**
     * Lists transfers aggregated by recipient — every deposit routed to the given recipient across all of that
     * recipient's deposit addresses and source chains.
     *
     * @param {Blockchain} destinationChain - The destination chain the transfers are delivered to.
     * @param {string} recipient - The recipient (destination) address to aggregate transfers for.
     * @param {SdaTransfersOptions} [options] - Optional pagination/filtering.
     * @returns {Promise<SdaTransfer[]>} The transfers routed to the recipient.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to fetch transfers.
     */
    getTransfersByRecipient(destinationChain: Blockchain, recipient: string, options?: SdaTransfersOptions): Promise<SdaTransfer[]>;
    /**
     * Retrieves a single transfer by its identifier.
     *
     * @param {string} id - The transfer identifier.
     * @returns {Promise<SdaTransfer>} The transfer's current status.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {ValueError} If the id is not valid.
     * @throws {NoSuchElementError} If no transfer exists for the given id.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to fetch the transfer.
     */
    getTransfer(id: string): Promise<SdaTransfer>;
    /**
     * Recovers a deposit or address that was not picked up automatically, using the protocol's recovery mode.
     *
     * @param {SdaRecoveryOptions} options - The recovery options.
     * @returns {Promise<SdaRecoveryResult>} The recovery outcome.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {AccountRequiredError} If the protocol requires a full account to recover a deposit address.
     * @throws {ValueError} If the id is not valid.
     * @throws {NoSuchElementError} If no deposit address exists for the given id or address.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to recover the deposit address.
     * @throws {SdaError} If the operation fails with an error.
     */
    recoverDepositAddress(options: SdaRecoveryOptions): Promise<SdaRecoveryResult>;
    /**
     * Disables a deposit address so it no longer accepts deposits.
     *
     * @param {string} id - The deposit-address identifier returned in `SdaDepositAddress.id` (round-trips any chain
     *   context the protocol needs).
     * @returns {Promise<void>} Resolves once the address has been disabled.
     * @throws {UnsupportedOperationError} If the protocol does not support this operation.
     * @throws {AccountRequiredError} If the protocol requires a full account to disable a deposit address.
     * @throws {ValueError} If the id is not valid.
     * @throws {NoSuchElementError} If no deposit address exists for the given id.
     * @throws {ProviderRequiredError} If the method requires a provider.
     * @throws {ProviderError} If the provider fails to disable the deposit address.
     * @throws {SdaError} If the operation fails with an error.
     */
    disableDepositAddress(id: string): Promise<void>;
}
export type IWalletAccountReadOnly = import('../wallet-account-read-only.js').IWalletAccountReadOnly;
export type IWalletAccount = import('../wallet-account.js').IWalletAccount;
export type AccountRequiredError = import('./errors.js').AccountRequiredError;
export type InvalidTokenError = import('./errors.js').InvalidTokenError;
export type NoSuchElementError = import('./errors.js').NoSuchElementError;
export type ReadOnlyAccountRequiredError = import('./errors.js').ReadOnlyAccountRequiredError;
export type ProviderError = import('./errors.js').ProviderError;
export type ProviderRequiredError = import('./errors.js').ProviderRequiredError;
export type SdaError = import('./errors.js').SdaError;
export type ValueError = import('./errors.js').ValueError;
export type Blockchain = string | number;
export type SdaToken = {
    /*
     * The protocol-specific token identifier to use in SDA calls.
     */
    token: string;
    /*
     * The chain on which the token lives.
     */
    chain: Blockchain;
    /*
     * The token symbol (e.g., 'USDC', 'USDT').
     */
    symbol: string;
    /*
     * The number of decimal places for the token's base unit.
     */
    decimals: number;
    /*
     * The token contract address, if applicable.
     */
    address?: string;
    /*
     * The token's full name.
     */
    name?: string;
};
export type SdaDepositAddressLimits = {
    /*
     * Minimum deposit amount, in the input token's base unit.
     */
    min?: number | bigint;
    /*
     * Maximum deposit amount, in the input token's base unit.
     */
    max?: number | bigint;
};
export type SdaRoutesOptions = {
    /*
     * Restrict to routes that accept deposits from this chain.
     */
    sourceChain?: Blockchain;
    /*
     * Restrict to routes that accept this input token.
     */
    sourceToken?: string;
    /*
     * Restrict to routes that deliver to this chain.
     */
    destinationChain?: Blockchain;
    /*
     * Restrict to routes that deliver this asset.
     */
    outputAsset?: string;
};
export type SdaRoute = {
    /*
     * The source chains this route accepts deposits from. A list because some
     *   protocols issue one address valid across a VM family.
     */
    sourceChains: Blockchain[];
    /*
     * The deposit tokens accepted on the source side.
     */
    inputTokens: SdaToken[];
    /*
     * The chain the converted asset is delivered to.
     */
    destinationChain: Blockchain;
    /*
     * The asset delivered to the destination (e.g., USDT). If unset, the route
     *   delivers each input token as its own equivalent on the destination chain.
     */
    outputAsset?: SdaToken;
    /*
     * Deposit limits for this route.
     */
    limits?: SdaDepositAddressLimits;
    /*
     * Whether addresses issued for this route can receive more than one deposit.
     */
    reusable?: boolean;
    /*
     * Typical end-to-end duration in seconds.
     */
    estimatedDuration?: number;
};
export type SdaDepositOptions = {
    /*
     * The chain the deposit originates from.
     */
    sourceChain: Blockchain;
    /*
     * The protocol identifier of the token being deposited.
     */
    inputToken: string;
    /*
     * The chain the converted asset is delivered to.
     */
    destinationChain: Blockchain;
    /*
     * The protocol identifier of the asset to deliver. Omit for protocols that deliver
     *   each input token as its own equivalent.
     */
    outputAsset?: string;
    /*
     * The amount to deposit, in the input token's base unit.
     */
    inputAmount: number | bigint;
};
export type SdaFeeType = 'network' | 'protocol' | 'affiliate' | 'other';
export type SdaFee = {
    /*
     * The category of the fee.
     */
    type: SdaFeeType;
    /*
     * The fee amount, in the fee token's base unit.
     */
    amount: bigint;
    /*
     * The token in which the fee is denominated.
     */
    token: string;
    /*
     * The chain on which the fee is charged.
     */
    chain?: Blockchain;
    /*
     * Whether the fee is already reflected in the quoted output amount.
     */
    included?: boolean;
    /*
     * A human-readable description of the fee.
     */
    description?: string;
};
export type SdaDepositQuote = {
    /*
     * The chain the deposit originates from.
     */
    inputChain: Blockchain;
    /*
     * The protocol identifier of the deposited token.
     */
    inputToken: string;
    /*
     * The amount deposited, in the input token's base unit.
     */
    inputAmount: bigint;
    /*
     * The chain the converted asset is delivered to.
     */
    destinationChain: Blockchain;
    /*
     * The protocol identifier of the delivered asset.
     */
    outputAsset: string;
    /*
     * The estimated amount delivered, in the destination asset's base unit.
     */
    outputAmount: bigint;
    /*
     * Itemised fee breakdown.
     */
    fees: SdaFee[];
    /*
     * The effective conversion rate as a string, to avoid precision loss.
     */
    rate?: string;
    /*
     * Unix timestamp (seconds) at which the quote expires.
     */
    expiry?: number;
    /*
     * The protocol quote identifier, if the protocol issues one.
     */
    id?: string;
};
export type SdaCreateDepositAddressOptions = {
    /*
     * One or more source chains the address should accept deposits from. Protocols
     *   that issue one address per VM family use the full list; single-chain protocols use a one-element list.
     */
    sourceChains: Blockchain[];
    /*
     * The chain the converted asset is delivered to.
     */
    destinationChain: Blockchain;
    /*
     * The protocol identifier of the asset to deliver (e.g., USDT). Omit for protocols
     *   that deliver each input token as its own equivalent.
     */
    outputAsset?: string;
    /*
     * The address that receives the delivered asset. Defaults to the bound
     *   account's address.
     */
    destinationAddress?: string;
};
export type SdaDepositAddress = {
    /*
     * The deposit address the user sends funds to.
     */
    address: string;
    /*
     * The protocol identifier for this SDA, used for status, recovery and disabling.
     */
    id: string;
    /*
     * The chains this address accepts deposits from.
     */
    sourceChains: Blockchain[];
    /*
     * The tokens this address accepts.
     */
    supportedInputTokens: SdaToken[];
    /*
     * The chain the converted asset is delivered to.
     */
    destinationChain: Blockchain;
    /*
     * The asset delivered to the destination. If unset, the address delivers each
     *   input token as its own equivalent on the destination chain.
     */
    outputAsset?: SdaToken;
    /*
     * The resolved address that receives the delivered asset.
     */
    destinationAddress: string;
    /*
     * Deposit limits for this address.
     */
    limits?: SdaDepositAddressLimits;
    /*
     * Whether the address can receive more than one deposit.
     */
    reusable: boolean;
    /*
     * Unix timestamp (seconds) at which the address's activation expires, when the protocol's
     *   address activation is time-limited.
     */
    expiry?: number;
};
export type SdaTransferStatus = 'pending' | 'detected' | 'processing' | 'completed' | 'failed'
            | 'refund-pending' | 'refunded' | 'expired';
export type SdaTransfer = {
    /*
     * The protocol identifier for this transfer.
     */
    id: string;
    /*
     * The current status of the transfer.
     */
    status: SdaTransferStatus;
};
export type SdaTransfersOptions = {
    /*
     * The source chain of the deposit address, required by protocols that key
     *   addresses by (address, chain).
     */
    sourceChain?: Blockchain;
    /*
     * The maximum number of transfers to return.
     */
    limit?: number;
    /*
     * The number of transfers to skip, for offset-based pagination.
     */
    skip?: number;
    /*
     * Restrict to transfers in this status.
     */
    status?: SdaTransferStatus;
};
export type SdaRecoverById = {
    /*
     * The protocol SDA identifier (the `SdaDepositAddress.id`).
     */
    id: string;
};
export type SdaRecoverByAddress = {
    /*
     * The deposit address to reindex.
     */
    address: string;
    /*
     * The chain of the deposit address, required by protocols that key addresses by
     *   (address, chain).
     */
    sourceChain?: Blockchain;
};
export type SdaRecoveryOptions = SdaRecoverById | SdaRecoverByAddress;
export type SdaRecoveryResult = {
    /*
     * The result of the reindex attempt.
     */
    status: 'reindexed' | 'pending' | 'failed';
    /*
     * The address that was reindexed.
     */
    address?: string;
    /*
     * The protocol SDA identifier.
     */
    id?: string;
    /*
     * The transfer that was recovered, if one resulted.
     */
    transfer?: SdaTransfer;
    /*
     * A human-readable description of the outcome.
     */
    message?: string;
};
