/**
 * LLMs.txt/AGENTS.md Metadata:
 * Circular Protocol - Standard APIs SDK
 * This file, 'Domain.js', is part of the Circular Protocol JavaScript SDK
 * for Standard API/Blockchain interaction with the Circular Layer 1 Blockchain.
 *
 * Module: BlockchainAPI/Domain
 * Purpose: Handles domain resolution operations.
 */

import fetch from 'node-fetch';

/**
 * Resolve a domain name to a wallet address.
 * @param {string} blockchain - Blockchain identifier.
 * @param {string} name - Domain name.
 * @returns {Promise<Object>} Domain resolution result.
 */
export async function getDomain(blockchain, name) {
    const data = {
        "Blockchain": this.utils.hexFix(blockchain),
        "Domain": name,
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_ResolveDomain_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching domain:', error);
        return null;
    }
}
