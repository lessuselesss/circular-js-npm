/**
 * LLMs.txt/AGENTS.md Metadata:
 * Circular Protocol - Standard APIs SDK
 * This file, 'Voucher.js', is part of the Circular Protocol JavaScript SDK
 * for Standard API/Blockchain interaction with the Circular Layer 1 Blockchain.
 *
 * Module: BlockchainAPI/Voucher
 * Purpose: Handles voucher operations.
 */

import fetch from 'node-fetch';

/**
 * Get a voucher by code.
 * @param {string} blockchain - Blockchain identifier.
 * @param {string} code - Voucher code.
 * @returns {Promise<Object>} Voucher information.
 */
export async function getVoucher(blockchain, code) {
    code = String(code);
    if (code.startsWith('0x')) {
        code = code.slice(2);
    }

    const data = {
        "Blockchain": this.utils.hexFix(blockchain),
        "Code": code,
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_GetVoucher_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching voucher:', error);
        return null;
    }
}
