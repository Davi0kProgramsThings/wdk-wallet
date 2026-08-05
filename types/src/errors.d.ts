export class NotImplementedError extends Error {
    /**
     * Create a new not implemented error.
     *
     * @param {string} methodName - The method's name.
     */
    constructor(methodName: string);
}
export class SignerError extends Error {
    /**
     * Create a new signer error.
     *
     * @param {string} message - The error's message.
     */
    constructor(message: string);
}
export class UnsupportedOperationError extends Error {
    /**
     * Create a new unsupported operation error. Thrown by an optional operation
     * that the concrete implementation deliberately does not support.
     *
     * @param {string} operation - The name of the operation that is not supported.
     */
    constructor(operation: string);
}
export class ValueError extends Error {
    /**
     * Create a new value error. Thrown when an argument fails validation.
     *
     * @param {string} message - The error's message.
     */
    constructor(message: string);
}
export class NoSuchElementError extends Error {
    /**
     * Create a new no such element error. Thrown when a lookup finds no element for
     * the given identifier.
     *
     * @param {string} message - The error's message.
     */
    constructor(message: string);
}
export class TimeoutError extends Error {
    /**
     * Create a new timeout error. Thrown when a transaction does not reach the
     * requested finality target within the timeout.
     *
     * @param {string} hash - The transaction's hash.
     * @param {string} target - The requested finality target.
     * @param {import('./wallet-account-read-only.js').TransactionReceipt | null} [receipt] - The last-seen receipt, or null if never seen.
     */
    constructor(hash: string, target: string, receipt?: import("./wallet-account-read-only.js").TransactionReceipt | null);
    /** @type {import('./wallet-account-read-only.js').TransactionReceipt | null} */
    receipt: import("./wallet-account-read-only.js").TransactionReceipt | null;
}
