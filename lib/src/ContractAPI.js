/**
 * LLMs.txt/AGENTS.md Metadata:
 * Circular Protocol - Standard APIs SDK
 * This file, 'ContractAPI.js', is part of the Circular Protocol JavaScript SDK
 * for Standard API/Blockchain interaction with the Circular Layer 1 Blockchain.
 * 
 * Module: ContractAPI
 * Purpose: Provides smart contract operations including testing contracts
 *          and making local contract calls.
 * 
 * Circular Protocol SDK - https://circular-protocol.gitbook.io/standard-apis
 * Circular Global Ledgers, Inc. - USA
 * ============================================================================
 */

import fetch from 'node-fetch';

/**
 * Smart contract operations for the Circular Protocol SDK.
 */
class ContractAPI {
    /**
     * Create a ContractAPI instance.
     * @param {Function} getNAGURL - Function to get current NAG URL.
     * @param {string} version - SDK version string.
     * @param {Utils} utils - Utils instance.
     */
    constructor(getNAGURL, version, utils) {
        this.getNAGURL = getNAGURL;
        this.version = version;
        this.utils = utils;
    }

    /**
     * Test the execution of a smart contract project.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} from - Developer's wallet address.
     * @param {string} project - Hyper Code Light Smart Contract Project.
     * @returns {Promise<Object>} Contract test result.
     */
    async testContract(blockchain, from, project) {
        const data = {
            "Blockchain": this.utils.hexFix(blockchain),
            "From": this.utils.hexFix(from),
            "Timestamp": this.utils.getFormattedTimestamp(),
            "Project": this.utils.stringToHex(project),
            "Version": this.version
        };

        try {
            const response = await fetch(this.getNAGURL() + 'Circular_TestContract_', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    /**
     * Make a local smart contract call.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} from - Caller wallet address.
     * @param {string} address - Smart contract address.
     * @param {string} request - Smart contract local endpoint.
     * @returns {Promise<Object>} Contract call result.
     */
    async callContract(blockchain, from, address, request) {
        const data = {
            "Blockchain": this.utils.hexFix(blockchain),
            "From": this.utils.hexFix(from),
            "Address": this.utils.hexFix(address),
            "Request": this.utils.stringToHex(request),
            "Timestamp": this.utils.getFormattedTimestamp(),
            "Version": this.version
        };

        try {
            const response = await fetch(this.getNAGURL() + 'Circular_CallContract_', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }
}

export { ContractAPI };
