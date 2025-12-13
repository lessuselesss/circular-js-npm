/**
 * LLMs.txt/AGENTS.md Metadata:
 * Circular Protocol - Standard APIs SDK
 * This file, 'Asset.js', is part of the Circular Protocol JavaScript SDK
 * for Standard API/Blockchain interaction with the Circular Layer 1 Blockchain.
 *
 * Module: BlockchainAPI/Asset
 * Purpose: Handles asset operations.
 */

import fetch from 'node-fetch';

/**
 * Get list of all assets minted on a blockchain.
 * @param {string} blockchain - Blockchain identifier.
 * @returns {Promise<Object>} Asset list.
 */
export async function getAssetList(blockchain) {
    const data = {
        "Blockchain": this.utils.hexFix(blockchain),
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_GetAssetList_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching asset list:', error);
        return null;
    }
}

/**
 * Get an asset descriptor.
 * @param {string} blockchain - Blockchain identifier.
 * @param {string} name - Asset name (e.g., 'CIRX').
 * @returns {Promise<Object>} Asset descriptor.
 */
export async function getAsset(blockchain, name) {
    const data = {
        "Blockchain": this.utils.hexFix(blockchain),
        "AssetName": name,
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_GetAsset_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching asset:', error);
        return null;
    }
}

/**
 * Get supply information for an asset.
 * @param {string} blockchain - Blockchain identifier.
 * @param {string} name - Asset name.
 * @returns {Promise<Object>} Asset supply info.
 */
export async function getAssetSupply(blockchain, name) {
    const data = {
        "Blockchain": this.utils.hexFix(blockchain),
        "AssetName": name,
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_GetAssetSupply_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching asset supply:', error);
        return null;
    }
}
