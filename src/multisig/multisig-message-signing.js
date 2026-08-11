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

import { NotImplementedError } from '../errors.js'

/** @typedef {import('../errors.js').NoSuchElementError} NoSuchElementError */

/**
 * @typedef {Object} MultisigMessageProposal
 * @property {string} messageId - The message's hash.
 * @property {string} message - The original message.
 * @property {number} confirmations - The current number of confirmations.
 * @property {number} threshold - The minimum amount of confirmations to sign the message.
 * @property {string | null} combinedSignature - The final combined signature when the threshold is met.
 */

/**
 * @typedef {Object} MultisigSignature
 * @property {string} signature - The caller's signature.
 */

/**
 * Adds the read-only message-signing queries to a multisig wallet.
 *
 * @interface
 */
export class IMultisigReadOnlyMessageSigning {
  /**
   * Returns a list of message proposals by their hashes.
   *
   * @param {string[]} messageIds - The list of message hashes
   * @returns {Promise<Record<string, MultisigMessageProposal | null>>} For each message hash, the message details or
   *   null if the message has not been found.
   */
  async getMessageProposals (messageIds) {
    throw new NotImplementedError('getMessageProposals(messageIds)')
  }

  /**
   * Returns a message proposal by its identifier.
   *
   * @param {string} messageId - The message's hash.
   * @returns {Promise<MultisigMessageProposal | null>} The message details, or null if it has not been found.
   */
  async getMessageProposal (messageId) {
    throw new NotImplementedError('getMessageProposal(messageId)')
  }
}

/**
 * Adds message-signing features to a multisig wallet.
 *
 * @interface
 */
export class IMultisigMessageSigning extends IMultisigReadOnlyMessageSigning {
  /**
   * Proposes signing a message.
   *
   * @param {string} message - The message to sign.
   * @returns {Promise<MultisigMessageProposal & MultisigSignature>} The multisig message proposal.
   * @throws {Error} If the account is not an owner of the multisig wallet.
   */
  async proposeMessage (message) {
    throw new NotImplementedError('proposeMessage(message)')
  }

  /**
   * Approves an existing message proposal.
   *
   * @param {string} messageId - The message's hash.
   * @returns {Promise<MultisigMessageProposal & MultisigSignature>} The multisig message proposal.
   * @throws {Error} If the account is not an owner of the multisig wallet.
   * @throws {NoSuchElementError} If no message exists for the given id.
   */
  async approveMessageProposal (messageId) {
    throw new NotImplementedError('approveMessageProposal(messageId)')
  }
}
