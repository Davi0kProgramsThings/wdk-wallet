/**
 * Adds message-signing features to a multisig wallet.
 *
 * @interface
 */
export interface IMultisigMessageSigning extends IMultisigMessageSigningReadOnly {
    /**
     * Proposes signing a message.
     *
     * @param {string} message - The message to sign.
     * @returns {Promise<MultisigMessageProposal & MultisigSignature>} The multisig message proposal.
     * @throws {Error} If the account is not an owner of the multisig wallet.
     */
    proposeMessage(message: string): Promise<MultisigMessageProposal & MultisigSignature>;
    /**
     * Approves an existing message proposal.
     *
     * @param {string} messageId - The message's hash.
     * @returns {Promise<MultisigMessageProposal & MultisigSignature>} The multisig message proposal.
     * @throws {Error} If the account is not an owner of the multisig wallet.
     * @throws {NoSuchElementError} If no message exists for the given id.
     */
    approveMessageProposal(messageId: string): Promise<MultisigMessageProposal & MultisigSignature>;
}
export type NoSuchElementError = import("../errors.js").NoSuchElementError;
export type MultisigMessageProposal = import("./multisig-message-signing-read-only.js").MultisigMessageProposal;
export type MultisigSignature = {
    /**
     * - The caller's signature.
     */
    signature: string;
};
import { IMultisigMessageSigningReadOnly } from './multisig-message-signing-read-only.js';
