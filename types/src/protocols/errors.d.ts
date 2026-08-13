// This file has been automatically generated with jsdoc-to-d-ts
/**
 * Enum for swap error reasons.
 *
 * @readonly
 * @enum {string}
 */
export enum SwapErrorReason {
  /**
   * Thrown when the account doesn't have enough funds to cover the costs of the swap.
   */
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  /**
   * Thrown when the account doesn't have enough funds to perform the swap.
   */
  INSUFFICIENT_TOKEN_BALANCE = 'INSUFFICIENT_TOKEN_BALANCE',
  /**
   * Thrown when the output amount is lower than the min. amount out option.
   */
  COULD_NOT_MET_THRESHOLD = 'COULD_NOT_MET_THRESHOLD'
}
/**
 * Enum for bridge error reasons.
 *
 * @readonly
 * @enum {string}
 */
export enum BridgeErrorReason {
  /**
   * Thrown when the account doesn't have enough funds to cover the costs of the bridge.
   */
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  /**
   * Thrown when the account doesn't have enough funds to perform the bridge.
   */
  INSUFFICIENT_TOKEN_BALANCE = 'INSUFFICIENT_TOKEN_BALANCE'
}
/**
 * Enum for supply error reasons.
 *
 * @readonly
 * @enum {string}
 */
export enum SupplyErrorReason {
  /**
   * Thrown when the account doesn't have enough funds to cover the costs of the supply.
   */
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  /**
   * Thrown when the account doesn't have enough funds to perform the supply.
   */
  INSUFFICIENT_TOKEN_BALANCE = 'INSUFFICIENT_TOKEN_BALANCE'
}
/**
 * Enum for withdraw error reasons.
 *
 * @readonly
 * @enum {string}
 */
export enum WithdrawErrorReason {
  /**
   * Thrown when the account doesn't have enough funds to cover the costs of the withdraw.
   */
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  /**
   * Thrown when the account doesn't have enough funds to perform the withdraw.
   */
  INSUFFICIENT_TOKEN_BALANCE = 'INSUFFICIENT_TOKEN_BALANCE'
}
/**
 * Enum for borrow error reasons.
 *
 * @readonly
 * @enum {string}
 */
export enum BorrowErrorReason {
  /**
   * Thrown when the account doesn't have enough funds to cover the costs of the borrow.
   */
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  /**
   * Thrown when the account doesn't have enough funds to perform the borrow.
   */
  INSUFFICIENT_TOKEN_BALANCE = 'INSUFFICIENT_TOKEN_BALANCE'
}
/**
 * Enum for repay error reasons.
 *
 * @readonly
 * @enum {string}
 */
export enum RepayErrorReason {
  /**
   * Thrown when the account doesn't have enough funds to cover the costs of the repay.
   */
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  /**
   * Thrown when the account doesn't have enough funds to perform the repay.
   */
  INSUFFICIENT_TOKEN_BALANCE = 'INSUFFICIENT_TOKEN_BALANCE'
}
/**
 * Enum for buy error reasons.
 *
 * @readonly
 * @enum {string}
 */
export enum BuyErrorReason {
  /**
   * Thrown when the user doesn't have enough funds to perform the purchase.
   */
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS'
}
/**
 * Enum for sell error reasons.
 *
 * @readonly
 * @enum {string}
 */
export enum SellErrorReason {
  /**
   * Thrown when the user doesn't have enough funds to perform the sale.
   */
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS'
}
/**
 * Enum for swidge error reasons.
 *
 * @readonly
 * @enum {string}
 */
export enum SwidgeErrorReason {
  /**
   * Thrown when the account doesn't have enough funds to cover the costs of the swidge.
   */
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  /**
   * Thrown when the account doesn't have enough funds to perform the swidge.
   */
  INSUFFICIENT_TOKEN_BALANCE = 'INSUFFICIENT_TOKEN_BALANCE',
  /**
   * Thrown when the output amount is lower than the min. amount out option.
   */
  COULD_NOT_MET_THRESHOLD = 'COULD_NOT_MET_THRESHOLD',
  /**
   * Thrown when the actual slippage is higher than the slippage option.
   */
  SLIPPAGE_TOO_HIGH = 'SLIPPAGE_TOO_HIGH'
}
/**
 * Enum for SDA error reasons.
 *
 * @readonly
 * @enum {string}
 */
export enum SdaErrorReason {
  /**
   * Thrown when the protocol doesn't support the given route.
   */
  ROUTE_NOT_SUPPORTED = 'ROUTE_NOT_SUPPORTED'
}
/**
 * Thrown when an operation requires an account to be set.
 */
export class AccountRequiredError extends WdkError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates a new account required error.
     *
     * @param {string} message - The error's message.
     */
    constructor(message: string);
}
/**
 * Thrown when an operation requires a read-only account to be set.
 */
export class ReadOnlyAccountRequiredError extends AccountRequiredError {
    /**
     * The error's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates a new read-only account required error.
     *
     * @param {string} message - The error's message.
     */
    constructor(message: string);
}
/**
 * Thrown when a swap fails with an error.
 */
export class SwapError extends WdkError {
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
     * Creates a new swap error.
     *
     * @param {string} message - The error's message.
     * @param {SwapErrorOptions & ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: SwapErrorOptions & ErrorOptions);
}
/**
 * Thrown when a bridge fails with an error.
 */
export class BridgeError extends WdkError {
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
     * Creates a new bridge error.
     *
     * @param {string} message - The error's message.
     * @param {BridgeErrorOptions & ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: BridgeErrorOptions & ErrorOptions);
}
/**
 * Thrown when a supply fails with an error.
 */
export class SupplyError extends WdkError {
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
     * Creates a new supply error.
     *
     * @param {string} message - The error's message.
     * @param {SupplyErrorOptions & ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: SupplyErrorOptions & ErrorOptions);
}
/**
 * Thrown when a withdraw fails with an error.
 */
export class WithdrawError extends WdkError {
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
     * Creates a new withdraw error.
     *
     * @param {string} message - The error's message.
     * @param {WithdrawErrorOptions & ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: WithdrawErrorOptions & ErrorOptions);
}
/**
 * Thrown when a borrow fails with an error.
 */
export class BorrowError extends WdkError {
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
     * Creates a new borrow error.
     *
     * @param {string} message - The error's message.
     * @param {BorrowErrorOptions & ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: BorrowErrorOptions & ErrorOptions);
}
/**
 * Thrown when a repay fails with an error.
 */
export class RepayError extends WdkError {
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
     * Creates a new repay error.
     *
     * @param {string} message - The error's message.
     * @param {RepayErrorOptions & ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: RepayErrorOptions & ErrorOptions);
}
/**
 * Thrown when a purchase fails with an error.
 */
export class BuyError extends WdkError {
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
     * Creates a new buy error.
     *
     * @param {string} message - The error's message.
     * @param {BuyErrorOptions & ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: BuyErrorOptions & ErrorOptions);
}
/**
 * Thrown when a sale fails with an error.
 */
export class SellError extends WdkError {
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
     * Creates a new sell error.
     *
     * @param {string} message - The error's message.
     * @param {SellErrorOptions & ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: SellErrorOptions & ErrorOptions);
}
/**
 * Thrown when a swidge fails with an error.
 */
export class SwidgeError extends WdkError {
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
     * Creates a new swidge error.
     *
     * @param {string} message - The error's message.
     * @param {SwidgeErrorOptions & ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: SwidgeErrorOptions & ErrorOptions);
}
/**
 * Thrown when a SDA fails with an error.
 */
export class SdaError extends WdkError {
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
     * Creates a new SDA error.
     *
     * @param {string} message - The error's message.
     * @param {SdaErrorOptions & ErrorOptions} options - The error's options.
     */
    constructor(message: string, options: SdaErrorOptions & ErrorOptions);
}
export type SwapErrorOptions = {
    /*
     * The error's reason.
     */
    reason: SwapErrorReason;
};
export type BridgeErrorOptions = {
    /*
     * The error's reason.
     */
    reason: BridgeErrorReason;
};
export type SupplyErrorOptions = {
    /*
     * The error's reason.
     */
    reason: SupplyErrorReason;
};
export type WithdrawErrorOptions = {
    /*
     * The error's reason.
     */
    reason: WithdrawErrorReason;
};
export type BorrowErrorOptions = {
    /*
     * The error's reason.
     */
    reason: BorrowErrorReason;
};
export type RepayErrorOptions = {
    /*
     * The error's reason.
     */
    reason: RepayErrorReason;
};
export type BuyErrorOptions = {
    /*
     * The error's reason.
     */
    reason: BuyErrorReason;
};
export type SellErrorOptions = {
    /*
     * The error's reason.
     */
    reason: SellErrorReason;
};
export type SwidgeErrorOptions = {
    /*
     * The error's reason.
     */
    reason: SwidgeErrorReason;
};
export type SdaErrorOptions = {
    /*
     * The error's reason.
     */
    reason: SdaErrorReason;
};
export { InvalidTokenError, MaximumFeeExceededError, NoSuchElementError, NotImplementedError, ProviderError, ProviderRequiredError, UnsupportedOperationError, ValueError, WdkError };
import { InvalidTokenError, MaximumFeeExceededError, NoSuchElementError, NotImplementedError, ProviderError, ProviderRequiredError, UnsupportedOperationError, ValueError, WdkError } from '../errors.js';
