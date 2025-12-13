/**
 * LLMs.txt/AGENTS.md Metadata:
 * Circular Protocol - Standard APIs SDK
 * This file, 'Block.js', is part of the Circular Protocol JavaScript SDK
 * for Standard API/Blockchain interaction with the Circular Layer 1 Blockchain.
 *
 * Module: BlockchainAPI/Block
 * Purpose: Handles block operations.
 */

import fetch from 'node-fetch';

/**
 * Get blocks in a specified range.
 * @param {string} blockchain - Blockchain identifier.
 * @param {number} start - Start block number.
 * @param {number} end - End block number (if 0, start is count from latest).
 * @returns {Promise<Object>} Block range.
 */
export async function getBlockRange(blockchain, start, end) {
    const data = {
        "Blockchain": this.utils.hexFix(blockchain),
        "Start": String(start),
        "End": String(end),
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_GetBlockRange_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log(JSON.stringify(response));
        return await response.json();
    } catch (error) {
        console.error('Error fetching block range:', error);
        return null;
    }
}

/**
 * Get a specific block.
 * @param {string} blockchain - Blockchain identifier.
 * @param {number} num - Block number.
 * @returns {Promise<Object>} Block data.
 */
export async function getBlock(blockchain, num) {
    const data = {
        "Blockchain": this.utils.hexFix(blockchain),
        "BlockNumber": String(num),
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_GetBlock_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching block:', error);
        return null;
    }
}

/**
 * Get the blockchain block height.
 * @param {string} blockchain - Blockchain identifier.
 * @returns {Promise<Object>} Block count.
 */
export async function getBlockCount(blockchain) {
    const data = {
        "Blockchain": this.utils.hexFix(blockchain),
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_GetBlockHeight_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching block count:', error);
        return null;
    }
}
