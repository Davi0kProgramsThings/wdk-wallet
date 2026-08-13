// This file has been automatically generated with jsdoc-to-d-ts
/**
 * Thrown when the account is not an owner of the multisig wallet.
 */
export class AccountNotOwnerError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates a new account not owner error.
     *
     * @param {string} message - The error's message.
     */
    constructor(message: string);
}
/**
 * Thrown when the account attempts to execute a proposal but its threshold has not been met yet.
 */
export class ThresholdNotMetError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates a new threshold not met error.
     *
     * @param {string} message - The error's message.
     */
    constructor(message: string);
}
export type TransactionErrorOptions = import('../errors.js').TransactionErrorOptions;
export { MaximumFeeExceededError, NoSuchElementError, NotImplementedError, ProviderError, ProviderRequiredError, TransactionError, TransactionErrorReason, ValueError, WdkError };
import { MaximumFeeExceededError, NoSuchElementError, NotImplementedError, ProviderError, ProviderRequiredError, TransactionError, TransactionErrorReason, ValueError, WdkError } from '../errors.js';
