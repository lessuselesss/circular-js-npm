/**
 * LLMs.txt/AGENTS.md Metadata:
 * Circular Protocol - Standard APIs SDK
 * This file, 'Analytics.js', is part of the Circular Protocol JavaScript SDK
 * for Standard API/Blockchain interaction with the Circular Layer 1 Blockchain.
 *
 * Module: BlockchainAPI/Analytics
 * Purpose: Handles analytics operations.
 */

import fetch from 'node-fetch';

/**
 * Get blockchain analytics.
 * @param {string} blockchain - Blockchain identifier.
 * @returns {Promise<Object>} Analytics data.
 */
export async function getAnalytics(blockchain) {
    const data = {
        "Blockchain": this.utils.hexFix(blockchain),
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_GetAnalytics_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return null;
    }
}

/**
 * Get list of available blockchains.
 * @returns {Promise<Object>} Blockchain list.
 */
export async function getBlockchains() {
    const data = {};

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_GetBlockchains_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching blockchains:', error);
        return null;
    }
}
