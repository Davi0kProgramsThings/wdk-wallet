// This file has been automatically generated with jsdoc-to-d-ts
/**
 * Enum for provider error reasons.
 *
 * @readonly
 * @enum {string}
 */
export enum ProviderErrorReason {
  /**
   * Thrown when the client fails to establish a connection with the provider.
   */
  NETWORK_ERROR = 'NETWORK_ERROR',
  /**
   * Thrown when the client fails to authenticate to the provider.
   */
  UNAUTHORIZED = 'UNAUTHORIZED',
  /**
   * Thrown when the client doesn't have enough permissions to perform an operation.
   */
  FORBIDDEN = 'FORBIDDEN',
  /**
   * Thrown when the provider times out.
   */
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  /**
   * Thrown when the provider experiences an internal server error.
   */
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}
/**
 * Enum for transaction error reasons.
 *
 * @readonly
 * @enum {string}
 */
export enum TransactionErrorReason {
  /**
   * Thrown when the account doesn't have enough funds to perform the transaction.
   */
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE'
}
/**
 * Enum for transfer error reasons.
 *
 * @readonly
 * @enum {string}
 */
export enum TransferErrorReason {
  /**
   * Thrown when the account doesn't have enough funds to cover the costs of the transfer.
   */
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  /**
   * Thrown when the account doesn't have enough funds to perform the transfer.
   */
  INSUFFICIENT_TOKEN_BALANCE = 'INSUFFICIENT_TOKEN_BALANCE'
}
/**
 * Super-class for errors thrown by wallet development kit's wallet and protocol modules.
 */
export class WdkError extends Error {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates a new wallet development kit error.
     *
     * @param {string} message - The error's message.
     * @param {ErrorOptions} [options] - The error's options.
     */
    constructor(message: string, options?: ErrorOptions);
}
/**
 * Thrown when an abstract method is lacking implementation in the sub-class.
 */
export class NotImplementedError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates a new not implemented error.
     *
     * @param {string} methodName - The method's name.
     */
    constructor(methodName: string);
}
/**
 * Thrown when an assertion fails.
 */
export class AssertionError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates a new assertion error.
     *
     * @param {string} message - The error's message.
     */
    constructor(message: string);
}
/**
 * Thrown when an operation is not supported in the implementation of an interface or abstract class.
 */
export class UnsupportedOperationError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates a new unsupported operation error.
     *
     * @param {string} method - The method's name.
     */
    constructor(method: string);
}
/**
 * Thrown when a method's argument holds an invalid value.
 */
export class ValueError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates a new value error.
     *
     * @param {string} message - The error's message.
     * @param {ErrorOptions} [options] - The error's options.
     */
    constructor(message: string, options?: ErrorOptions);
}
/**
 * Thrown when no element is found for the given identifier.
 */
export class NoSuchElementError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates a new no such element error.
     *
     * @param {string} message - The error's message.
     * @param {ErrorOptions} [options] - The error's options.
     */
    constructor(message: string, options?: ErrorOptions);
}
/**
 * Thrown when an operation rejects to use the given signer.
 */
export class InvalidSignerError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates a new invalid signer error.
     *
     * @param {string} message - The error's message.
     * @param {ErrorOptions} [options] - The error's options.
     */
    constructor(message: string, options?: ErrorOptions);
}
/**
 * Thrown when an address doesn't match an existing token.
 */
export class InvalidTokenError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates a new invalid token error.
     *
     * @param {string} message - The error's message.
     * @param {ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: ErrorOptions);
}
/**
 * Thrown when an operation requires a provider.
 */
export class ProviderRequiredError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates a new provider required error.
     *
     * @param {string} message - The error's message.
     */
    constructor(message: string);
}
/**
 * Thrown when a provider fails to perform an operation.
 */
export class ProviderError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * The error's reason.
     *
     * @type {string}
     */
    reason: string;
    /**
     * Creates a new provider error.
     *
     * @param {string} message - The error's message.
     * @param {ProviderErrorOptions & ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: ProviderErrorOptions & ErrorOptions);
}
/**
 * Thrown when a transaction fails with an error.
 */
export class TransactionError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * The error's reason.
     *
     * @type {string}
     */
    reason: string;
    /**
     * Creates a new transaction error.
     *
     * @param {string} message - The error's message.
     * @param {TransactionErrorOptions & ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: TransactionErrorOptions & ErrorOptions);
}
/**
 * Thrown when a transfer fails with an error.
 */
export class TransferError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * The error's reason.
     *
     * @type {string}
     */
    reason: string;
    /**
     * Creates a new transaction error.
     *
     * @param {string} message - The error's message.
     * @param {TransferErrorOptions & ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: TransferErrorOptions & ErrorOptions);
}
/**
 * Thrown when an operation exceeds its maximum fee threshold.
 */
export class MaximumFeeExceededError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates a new maximum fee exceeded error.
     *
     * @param {string} message - The error's message.
     * @param {ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: ErrorOptions);
}
/**
 * Thrown when an operation times out.
 */
export class TimeoutError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Create a new timeout error.
     *
     * @param {string} message - The error's message.
     */
    constructor(message: string);
}
export type ProviderErrorOptions = {
    /*
     * The error's reason.
     */
    reason: ProviderErrorReason;
};
export type TransactionErrorOptions = {
    /*
     * The error's reason.
     */
    reason: TransactionErrorReason;
};
export type TransferErrorOptions = {
    /*
     * The error's reason.
     */
    reason: TransferErrorReason;
};
