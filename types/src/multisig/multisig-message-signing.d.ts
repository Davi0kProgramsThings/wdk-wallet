/**
 * Adds the read-only message-signing queries to a multisig wallet.
 *
 * @interface
 */
export interface IMultisigReadOnlyMessageSigning {
    /**
     * Returns a list of message proposals by their hashes.
     *
     * @param {string[]} messageIds - The list of message hashes
     * @returns {Promise<Record<string, MultisigMessageProposal | null>>} For each message hash, the message details or
     *   null if the message has not been found.
     */
    getMessageProposals(messageIds: string[]): Promise<Record<string, MultisigMessageProposal | null>>;
    /**
     * Returns a message proposal by its identifier.
     *
     * @param {string} messageId - The message's hash.
     * @returns {Promise<MultisigMessageProposal | null>} The message details, or null if it has not been found.
     */
    getMessageProposal(messageId: string): Promise<MultisigMessageProposal | null>;
}
/**
 * Adds message-signing features to a multisig wallet.
 *
 * @interface
 */
export interface IMultisigMessageSigning extends IMultisigReadOnlyMessageSigning {
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
export type MultisigMessageProposal = {
    /**
     * - The message's hash.
     */
    messageId: string;
    /**
     * - The original message.
     */
    message: string;
    /**
     * - The current number of confirmations.
     */
    confirmations: number;
    /**
     * - The minimum amount of confirmations to sign the message.
     */
    threshold: number;
    /**
     * - The final combined signature when the threshold is met.
     */
    combinedSignature: string | null;
};
export type MultisigSignature = {
    /**
     * - The caller's signature.
     */
    signature: string;
};
export type NoSuchElementError = import("../errors.js").NoSuchElementError;
