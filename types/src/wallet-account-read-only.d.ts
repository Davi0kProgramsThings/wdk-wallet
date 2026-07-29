/** @interface */
export interface IWalletAccountReadOnly {
    /**
     * Returns the account's address.
     *
     * @returns {Promise<string>} The account's address.
     */
    getAddress(): Promise<string>;
    /**
     * Verifies a message's signature.
     *
     * @param {string} message - The original message.
     * @param {string} signature - The signature to verify.
     * @returns {Promise<boolean>} True if the signature is valid.
     * @throws {Error} If the read-only wallet account class is not able to provide an implementation for the method.
     */
    verify(message: string, signature: string): Promise<boolean>;
    /**
     * Returns the account's native token balance.
     *
     * @returns {Promise<bigint>} The native token balance.
     */
    getBalance(): Promise<bigint>;
    /**
     * Returns the account balance for a specific token.
     *
     * @param {string} tokenAddress - The smart contract address of the token.
     * @returns {Promise<bigint>} The token balance.
     */
    getTokenBalance(tokenAddress: string): Promise<bigint>;
    /**
     * Quotes the costs of a send transaction operation.
     *
     * @param {Transaction} tx - The transaction.
     * @returns {Promise<Omit<TransactionResult, 'hash'>>} The transaction's quotes.
     */
    quoteSendTransaction(tx: Transaction): Promise<Omit<TransactionResult, "hash">>;
    /**
     * Quotes the costs of a transfer operation.
     *
     * @param {TransferOptions} options - The transfer's options.
     * @returns {Promise<Omit<TransferResult, 'hash'>>} The transfer's quotes.
     */
    quoteTransfer(options: TransferOptions): Promise<Omit<TransferResult, "hash">>;
    /**
     * Returns a transaction's receipt.
     *
     * @deprecated Use {@link getTransaction} instead, which returns a normalized, finality-based receipt. The native receipt fields remain available on each module's extended return type.
     * @param {string} hash - The transaction's hash.
     * @returns {Promise<unknown | null>} The receipt, or null if the transaction has not been included in a block yet.
     */
    getTransactionReceipt(hash: string): Promise<unknown | null>;
    /**
     * Returns a normalized, finality-based receipt for a transaction.
     *
     * @param {string} hash - The transaction's identifier (hash / signature / lt:hash).
     * @returns {Promise<TransactionReceipt | null>} The normalized receipt, or null if the transaction is not known.
     */
    getTransaction(hash: string): Promise<TransactionReceipt | null>;
    /**
     * Blocks until a transaction reaches the requested finality target, fails, is dropped, or times out.
     *
     * @param {string} hash - The transaction's identifier.
     * @param {WaitForTransactionOptions} [options] - The wait options.
     * @returns {Promise<TransactionReceipt>} The terminal receipt.
     */
    waitForTransaction(hash: string, options?: WaitForTransactionOptions): Promise<TransactionReceipt>;
}
/**
 * @abstract
 * @implements {IWalletAccountReadOnly}
 */
export default abstract class WalletAccountReadOnly implements IWalletAccountReadOnly {
    /**
     * Creates a new read-only wallet account.
     *
     * @param {string} [address] - The account's address.
     */
    constructor(address?: string);
    /** @private */
    private __address;
    /**
     * The account's address.
     *
     * @protected
     * @type {string | undefined}
     */
    protected get _address(): string | undefined;
    /**
     * Returns the account's address.
     *
     * @returns {Promise<string>} The account's address.
     */
    getAddress(): Promise<string>;
    /**
     * Verifies a message's signature.
     *
     * @abstract
     * @param {string} message - The original message.
     * @param {string} signature - The signature to verify.
     * @returns {Promise<boolean>} True if the signature is valid.
     * @throws {Error} If the read-only wallet account class is not able to provide an implementation for the method.
     */
    abstract verify(message: string, signature: string): Promise<boolean>;
    /**
     * Returns the account's native token balance.
     *
     * @abstract
     * @returns {Promise<bigint>} The native token balance.
     */
    abstract getBalance(): Promise<bigint>;
    /**
     * Returns the account balance for a specific token.
     *
     * @abstract
     * @param {string} tokenAddress - The smart contract address of the token.
     * @returns {Promise<bigint>} The token balance.
     */
    abstract getTokenBalance(tokenAddress: string): Promise<bigint>;
    /**
     * Quotes the costs of a send transaction operation.
     *
     * @abstract
     * @param {Transaction} tx - The transaction.
     * @returns {Promise<Omit<TransactionResult, 'hash'>>} The transaction's quotes.
     */
    abstract quoteSendTransaction(tx: Transaction): Promise<Omit<TransactionResult, "hash">>;
    /**
     * Quotes the costs of a transfer operation.
     *
     * @abstract
     * @param {TransferOptions} options - The transfer's options.
     * @returns {Promise<Omit<TransferResult, 'hash'>>} The transfer's quotes.
     */
    abstract quoteTransfer(options: TransferOptions): Promise<Omit<TransferResult, "hash">>;
    /**
     * Returns a transaction's receipt.
     *
     * @deprecated Use {@link getTransaction} instead, which returns a normalized, finality-based receipt. The native receipt fields remain available on each module's extended return type.
     * @abstract
     * @param {string} hash - The transaction's hash.
     * @returns {Promise<unknown | null>} The receipt, or null if the transaction has not been included in a block yet.
     */
    abstract getTransactionReceipt(hash: string): Promise<unknown | null>;
    /**
     * Returns a normalized, finality-based receipt for a transaction.
     *
     * @abstract
     * @param {string} hash - The transaction's identifier (hash / signature / lt:hash).
     * @returns {Promise<TransactionReceipt | null>} The normalized receipt, or null if the transaction is not known.
     */
    abstract getTransaction(hash: string): Promise<TransactionReceipt | null>;
    /**
     * Blocks until a transaction reaches the requested finality target, fails, is dropped, or times out.
     *
     * @param {string} hash - The transaction's identifier.
     * @param {WaitForTransactionOptions} [options] - The wait options.
     * @returns {Promise<TransactionReceipt>} The terminal receipt once the target is reached.
     * @throws {TransactionFailedError} If the transaction lands but reverts (success === false). The receipt is exposed on `.receipt`.
     * @throws {TransactionDroppedError} If the transaction is evicted or replaced. The receipt is exposed on `.receipt`.
     * @throws {TransactionConfirmationTimeoutError} If the target is not reached before the timeout. The last-seen receipt (or null) is exposed on `.receipt`.
     */
    waitForTransaction(hash: string, options?: WaitForTransactionOptions): Promise<TransactionReceipt>;
    /**
     * Decides whether a finality level satisfies the requested target.
     *
     * @protected
     * @param {Finality} finality - The observed finality level.
     * @param {WaitForTransactionTarget} target - The requested finality target.
     * @returns {boolean} True if the observed finality satisfies the target.
     */
    protected _meetsFinality(finality: Finality, target: WaitForTransactionTarget): boolean;
    /**
     * The default poll cadence for {@link waitForTransaction}, in milliseconds.
     *
     * @protected
     * @type {number}
     */
    protected get _defaultWaitInterval(): number;
    /**
     * The default total time budget for {@link waitForTransaction}, in milliseconds.
     *
     * @protected
     * @type {number}
     */
    protected get _defaultWaitTimeout(): number;
}
export type Transaction = {
    /**
     * - The transaction's recipient.
     */
    to: string;
    /**
     * - The amount of native tokens to send to the recipient (in base unit).
     */
    value: number | bigint;
};
export type TransactionResult = {
    /**
     * - The transaction's hash.
     */
    hash: string;
    /**
     * - The gas cost.
     */
    fee: bigint;
};
export type TransferOptions = {
    /**
     * - The address of the token to transfer.
     */
    token: string;
    /**
     * - The address of the recipient.
     */
    recipient: string;
    /**
     * - The amount of tokens to transfer to the recipient (in base units).
     */
    amount: number | bigint;
};
export type TransferResult = {
    /**
     * - The hash of the transfer operation.
     */
    hash: string;
    /**
     * - The gas cost.
     */
    fee: bigint;
};
/**
 * A normalized, cross-chain transaction finality level.
 *
 * - `pending`: seen, not settled (mempool / processed / in-flight).
 * - `confirmed`: settled, reversible only under extreme conditions.
 * - `final`: irreversible per the chain's own guarantees.
 * - `dropped`: evicted / replaced, never landed.
 */
export type Finality = "pending" | "confirmed" | "final" | "dropped";
/**
 * A normalized, cross-chain transaction receipt. Blockchain modules extend this
 * type with their own native receipt fields (e.g. `confirmations`, the raw
 * transaction and receipt objects, etc.).
 */
export type TransactionReceipt = {
    /**
     * - The transaction's identifier (hash / signature / lt:hash).
     */
    id: string;
    /**
     * - The transaction's finality level.
     */
    finality: Finality;
    /**
     * - The execution result, or null while pending/dropped.
     */
    success: boolean | null;
    /**
     * - A reference to the including block (block hash / slot / masterchain seqno).
     */
    blockRef?: string | number;
    /**
     * - The fee paid, when known.
     */
    fee?: bigint;
};
/**
 * The finality level to wait for.
 */
export type WaitForTransactionTarget = "confirmed" | "final";
export type WaitForTransactionOptions = {
    /**
     * - The finality target to wait for (default: 'confirmed').
     */
    target?: WaitForTransactionTarget;
    /**
     * - The total time budget in milliseconds before giving up (default: per-module).
     */
    timeout?: number;
    /**
     * - The poll cadence in milliseconds (default: per-module).
     */
    interval?: number;
};
