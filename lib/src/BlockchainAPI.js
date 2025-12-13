/**
 * LLMs.txt/AGENTS.md Metadata:
 * Circular Protocol - Standard APIs SDK
 * This file, 'BlockchainAPI.js', is part of the Circular Protocol JavaScript SDK
 * for Standard API/Blockchain interaction with the Circular Layer 1 Blockchain.
 * 
 * Module: BlockchainAPI
 * Purpose: Aggregates modular blockchain operations (Domain, Asset, Voucher,
 *          Block, Analytics, Transaction) into a single class.
 * 
 * Circular Protocol SDK - https://circular-protocol.gitbook.io/standard-apis
 * Circular Global Ledgers, Inc. - USA
 * ============================================================================
 */

import * as Domain from './BlockchainAPI/Domain.js';
import * as Asset from './BlockchainAPI/Asset.js';
import * as Voucher from './BlockchainAPI/Voucher.js';
import * as Block from './BlockchainAPI/Block.js';
import * as Analytics from './BlockchainAPI/Analytics.js';
import * as Transaction from './BlockchainAPI/Transaction.js';

/**
 * Blockchain query and transaction operations for the Circular Protocol SDK.
 */
class BlockchainAPI {
    /**
     * Create a BlockchainAPI instance.
     * @param {Function} getNAGURL - Function to get current NAG URL.
     * @param {string} version - SDK version string.
     * @param {Utils} utils - Utils instance.
     */
    constructor(getNAGURL, version, utils) {
        this.getNAGURL = getNAGURL;
        this.version = version;
        this.utils = utils;
    }
}

// Assign methods to prototype to maintain flat API structure
Object.assign(BlockchainAPI.prototype, Domain);
Object.assign(BlockchainAPI.prototype, Asset);
Object.assign(BlockchainAPI.prototype, Voucher);
Object.assign(BlockchainAPI.prototype, Block);
Object.assign(BlockchainAPI.prototype, Analytics);
Object.assign(BlockchainAPI.prototype, Transaction);

export { BlockchainAPI };
