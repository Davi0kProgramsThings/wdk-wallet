/**
 * Adds the read-only message-signing queries to a multisig wallet.
 *
 * @interface
 */
export interface IMultisigMessageSigningReadOnly {
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
