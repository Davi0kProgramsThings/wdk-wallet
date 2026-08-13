/** @interface */
export interface IWalletAccountReadOnlyMultisig extends IWalletAccountReadOnlySimple {
    /**
     * Returns the multisig wallet account info.
     *
     * @returns {Promise<MultisigInfo>} The info.
    */
    getMultisigInfo(): Promise<MultisigInfo>;
    /**
     * Returns a list of proposals by their identifiers.
     *
     * @param {string[]} proposalIds - The list of proposal identifiers.
     * @returns {Promise<Record<string, MultisigProposal | null>>} For each proposal id, the proposal details or
     *   null if the proposal has not been found.
     */
    getProposals(proposalIds: string[]): Promise<Record<string, MultisigProposal | null>>;
    /**
     * Returns a proposal by its identifier.
     *
     * @param {string} proposalId - The proposal's identifier.
     * @returns {Promise<MultisigProposal | null>} The proposal details, or null if it has not been found.
     */
    getProposal(proposalId: string): Promise<MultisigProposal | null>;
    /**
     * Quotes the on-chain cost of executing a pending proposal.
     *
     * @param {string} proposalId - The proposal's id.
     * @returns {Promise<Omit<TransactionResult, 'hash'>>} The execution cost estimate.
     * @throws {NoSuchElementError} If no proposal exists for the given id.
     */
    quoteExecuteProposal(proposalId: string): Promise<Omit<TransactionResult, "hash">>;
}
export type MultisigInfo = {
    /**
     * - The multisig wallet account address.
     */
    address: string;
    /**
     * - The owners of the multisig wallet account.
     */
    owners: string[];
    /**
     * - The minimum amount of signatures to execute a transaction.
     */
    threshold: number;
};
export type MultisigProposal = {
    /**
     * - The proposal's id.
     */
    proposalId: string;
    /**
     * - The current number of confirmations.
     */
    confirmations: number;
    /**
     * - The minimum amount of confirmations to execute the transaction.
     */
    threshold: number;
    /**
     * - The proposal's lifecycle state: `'pending'` while it still awaits confirmations or on-chain execution, `'executed'` once it has been executed on-chain.
     */
    status: 'pending' | 'executed';
};
export type TransactionResult = import("../wallet-account-read-only.js").TransactionResult;
import { IWalletAccountReadOnlySimple } from '../wallet-account-read-only-simple.js';
