// Copyright 2024 Tether Operations Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
'use strict'

import {
  NotImplementedError,
  TransactionFailedError,
  TransactionDroppedError,
  TransactionConfirmationTimeoutError
} from './errors.js'

/**
 * @typedef {Object} Transaction
 * @property {string} to - The transaction's recipient.
 * @property {number | bigint} value - The amount of native tokens to send to the recipient (in base unit).
 */

/**
 * @typedef {Object} TransactionResult
 * @property {string} hash - The transaction's hash.
 * @property {bigint} fee - The gas cost.
 */

/**
 * @typedef {Object} TransferOptions
 * @property {string} token - The address of the token to transfer.
 * @property {string} recipient - The address of the recipient.
 * @property {number | bigint} amount - The amount of tokens to transfer to the recipient (in base units).
 */

/**
 * @typedef {Object} TransferResult
 * @property {string} hash - The hash of the transfer operation.
 * @property {bigint} fee - The gas cost.
 */

/**
 * A normalized, cross-chain transaction finality level.
 *
 * - `pending`: seen, not settled (mempool / processed / in-flight).
 * - `confirmed`: settled, reversible only under extreme conditions.
 * - `final`: irreversible per the chain's own guarantees.
 * - `dropped`: evicted / replaced, never landed.
 *
 * @typedef {'pending' | 'confirmed' | 'final' | 'dropped'} Finality
 */

/**
 * A normalized, cross-chain transaction receipt. Blockchain modules extend this
 * type with their own native receipt fields (e.g. `confirmations`, the raw
 * transaction and receipt objects, etc.).
 *
 * @typedef {Object} TransactionReceipt
 * @property {string} id - The transaction's identifier (hash / signature / lt:hash).
 * @property {Finality} finality - The transaction's finality level.
 * @property {boolean | null} success - The execution result, or null while pending/dropped.
 * @property {string | number} [blockRef] - A reference to the including block (block hash / slot / masterchain seqno).
 * @property {bigint} [fee] - The fee paid, when known.
 */

/**
 * The finality level to wait for.
 *
 * @typedef {'confirmed' | 'final'} WaitForTransactionTarget
 */

/**
 * @typedef {Object} WaitForTransactionOptions
 * @property {WaitForTransactionTarget} [target] - The finality target to wait for (default: 'confirmed').
 * @property {number} [timeout] - The total time budget in milliseconds before giving up (default: per-module).
 * @property {number} [interval] - The poll cadence in milliseconds (default: per-module).
 */

/** @interface */
export class IWalletAccountReadOnly {
  /**
   * Returns the account's address.
   *
   * @returns {Promise<string>} The account's address.
   */
  async getAddress () {
    throw new NotImplementedError('getAddress()')
  }

  /**
   * Verifies a message's signature.
   *
   * @param {string} message - The original message.
   * @param {string} signature - The signature to verify.
   * @returns {Promise<boolean>} True if the signature is valid.
   * @throws {Error} If the read-only wallet account class is not able to provide an implementation for the method.
   */
  async verify (message, signature) {
    throw new NotImplementedError('verify(message, signature)')
  }

  /**
   * Returns the account's native token balance.
   *
   * @returns {Promise<bigint>} The native token balance.
   */
  async getBalance () {
    throw new NotImplementedError('getBalance()')
  }

  /**
   * Returns the account balance for a specific token.
   *
   * @param {string} tokenAddress - The smart contract address of the token.
   * @returns {Promise<bigint>} The token balance.
   */
  async getTokenBalance (tokenAddress) {
    throw new NotImplementedError('getTokenBalance(tokenAddress)')
  }

  /**
   * Quotes the costs of a send transaction operation.
   *
   * @param {Transaction} tx - The transaction.
   * @returns {Promise<Omit<TransactionResult, 'hash'>>} The transaction's quotes.
   */
  async quoteSendTransaction (tx) {
    throw new NotImplementedError('quoteSendTransaction(tx)')
  }

  /**
   * Quotes the costs of a transfer operation.
   *
   * @param {TransferOptions} options - The transfer's options.
   * @returns {Promise<Omit<TransferResult, 'hash'>>} The transfer's quotes.
   */
  async quoteTransfer (options) {
    throw new NotImplementedError('quoteTransfer(options)')
  }

  /**
   * Returns a transaction's receipt.
   *
   * @deprecated Use {@link getTransaction} instead, which returns a normalized, finality-based receipt. The native receipt fields remain available on each module's extended return type.
   * @param {string} hash - The transaction's hash.
   * @returns {Promise<unknown | null>} The receipt, or null if the transaction has not been included in a block yet.
   */
  async getTransactionReceipt (hash) {
    throw new NotImplementedError('getTransactionReceipt(hash)')
  }

  /**
   * Returns a normalized, finality-based receipt for a transaction.
   *
   * @param {string} hash - The transaction's identifier (hash / signature / lt:hash).
   * @returns {Promise<TransactionReceipt | null>} The normalized receipt, or null if the transaction is not known.
   */
  async getTransaction (hash) {
    throw new NotImplementedError('getTransaction(hash)')
  }

  /**
   * Blocks until a transaction reaches the requested finality target, fails, is dropped, or times out.
   *
   * @param {string} hash - The transaction's identifier.
   * @param {WaitForTransactionOptions} [options] - The wait options.
   * @returns {Promise<TransactionReceipt>} The terminal receipt.
   */
  async waitForTransaction (hash, options) {
    throw new NotImplementedError('waitForTransaction(hash, options)')
  }
}

/**
 * @abstract
 * @implements {IWalletAccountReadOnly}
 */
export default class WalletAccountReadOnly {
  /**
   * Creates a new read-only wallet account.
   *
   * @param {string} [address] - The account's address.
   */
  constructor (address) {
    /** @private */
    this.__address = address
  }

  /**
   * The account's address.
   *
   * @protected
   * @type {string | undefined}
   */
  get _address () {
    return this.__address
  }

  /**
   * Returns the account's address.
   *
   * @returns {Promise<string>} The account's address.
   */
  async getAddress () {
    if (!this._address) {
      throw new Error("The account's address must be set to perform this operation.")
    }

    return this._address
  }

  /**
   * Verifies a message's signature.
   *
   * @abstract
   * @param {string} message - The original message.
   * @param {string} signature - The signature to verify.
   * @returns {Promise<boolean>} True if the signature is valid.
   * @throws {Error} If the read-only wallet account class is not able to provide an implementation for the method.
   */
  async verify (message, signature) {
    throw new NotImplementedError('verify(message, signature)')
  }

  /**
   * Returns the account's native token balance.
   *
   * @abstract
   * @returns {Promise<bigint>} The native token balance.
   */
  async getBalance () {
    throw new NotImplementedError('getBalance()')
  }

  /**
   * Returns the account balance for a specific token.
   *
   * @abstract
   * @param {string} tokenAddress - The smart contract address of the token.
   * @returns {Promise<bigint>} The token balance.
   */
  async getTokenBalance (tokenAddress) {
    throw new NotImplementedError('getTokenBalance(tokenAddress)')
  }

  /**
   * Quotes the costs of a send transaction operation.
   *
   * @abstract
   * @param {Transaction} tx - The transaction.
   * @returns {Promise<Omit<TransactionResult, 'hash'>>} The transaction's quotes.
   */
  async quoteSendTransaction (tx) {
    throw new NotImplementedError('quoteSendTransaction(tx)')
  }

  /**
   * Quotes the costs of a transfer operation.
   *
   * @abstract
   * @param {TransferOptions} options - The transfer's options.
   * @returns {Promise<Omit<TransferResult, 'hash'>>} The transfer's quotes.
   */
  async quoteTransfer (options) {
    throw new NotImplementedError('quoteTransfer(options)')
  }

  /**
   * Returns a transaction's receipt.
   *
   * @deprecated Use {@link getTransaction} instead, which returns a normalized, finality-based receipt. The native receipt fields remain available on each module's extended return type.
   * @abstract
   * @param {string} hash - The transaction's hash.
   * @returns {Promise<unknown | null>} The receipt, or null if the transaction has not been included in a block yet.
   */
  async getTransactionReceipt (hash) {
    throw new NotImplementedError('getTransactionReceipt(hash)')
  }

  /**
   * Returns a normalized, finality-based receipt for a transaction.
   *
   * @abstract
   * @param {string} hash - The transaction's identifier (hash / signature / lt:hash).
   * @returns {Promise<TransactionReceipt | null>} The normalized receipt, or null if the transaction is not known.
   */
  async getTransaction (hash) {
    throw new NotImplementedError('getTransaction(hash)')
  }

  /**
   * Blocks until a transaction reaches the requested finality target, fails, is dropped, or times out.
   *
   * The polling loop and target resolution are chain-agnostic: this method only
   * interprets the normalized receipt returned by {@link getTransaction}.
   *
   * @param {string} hash - The transaction's identifier.
   * @param {WaitForTransactionOptions} [options] - The wait options.
   * @returns {Promise<TransactionReceipt>} The terminal receipt once the target is reached.
   * @throws {TransactionFailedError} If the transaction lands but reverts (success === false). The receipt is exposed on `.receipt`.
   * @throws {TransactionDroppedError} If the transaction is evicted or replaced. The receipt is exposed on `.receipt`.
   * @throws {TransactionConfirmationTimeoutError} If the target is not reached before the timeout. The last-seen receipt (or null) is exposed on `.receipt`.
   */
  async waitForTransaction (hash, options = {}) {
    const {
      target = 'confirmed',
      interval = this._defaultWaitInterval,
      timeout = this._defaultWaitTimeout
    } = options

    const deadline = Date.now() + timeout
    let last = null

    while (true) {
      const receipt = await this.getTransaction(hash)

      if (receipt) {
        last = receipt

        if (receipt.finality === 'dropped') {
          throw new TransactionDroppedError(hash, receipt)
        }
        if (receipt.success === false) {
          throw new TransactionFailedError(hash, receipt)
        }
        if (this._meetsFinality(receipt.finality, target)) {
          return receipt
        }
      }
      // A null receipt (not seen yet) or a 'pending' finality means we keep polling.

      if (Date.now() >= deadline) {
        throw new TransactionConfirmationTimeoutError(hash, target, last)
      }

      await new Promise(resolve => setTimeout(resolve, interval))
    }
  }

  /**
   * Decides whether a finality level satisfies the requested target.
   *
   * @protected
   * @param {Finality} finality - The observed finality level.
   * @param {WaitForTransactionTarget} target - The requested finality target.
   * @returns {boolean} True if the observed finality satisfies the target.
   */
  _meetsFinality (finality, target) {
    if (target === 'final') {
      return finality === 'final'
    }

    return finality === 'confirmed' || finality === 'final'
  }

  /**
   * The default poll cadence for {@link waitForTransaction}, in milliseconds.
   * Modules override this to match their block cadence.
   *
   * @protected
   * @type {number}
   */
  get _defaultWaitInterval () {
    return 4000
  }

  /**
   * The default total time budget for {@link waitForTransaction}, in milliseconds.
   * Modules override this to match their finality expectations.
   *
   * @protected
   * @type {number}
   */
  get _defaultWaitTimeout () {
    return 60000
  }
}
