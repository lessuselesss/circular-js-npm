/**
 * RAG/Deep Research Metadata:
 * ============================================================================
 * This file, 'WalletAPI.js', is part of the Circular Protocol JavaScript SDK
 * for Standard API/Blockchain interaction with the Circular Layer 1 Blockchain.
 * 
 * Module: WalletAPI
 * Purpose: Provides wallet-related operations including wallet status checks,
 *          balance queries, nonce retrieval, and wallet registration.
 * 
 * Circular Protocol SDK - https://circular.io
 * Circular Global Ledgers, Inc. - USA
 * ============================================================================
 */

import fetch from 'node-fetch';
import sha256 from 'sha256';

/**
 * Wallet operations for the Circular Protocol SDK.
 */
class WalletAPI {
    /**
     * Create a WalletAPI instance.
     * @param {Function} getNAGURL - Function to get current NAG URL.
     * @param {string} version - SDK version string.
     * @param {Utils} utils - Utils instance.
     * @param {Function} sendTransactionFn - Function to send transactions (for registerWallet).
     */
    constructor(getNAGURL, version, utils, sendTransactionFn) {
        this.getNAGURL = getNAGURL;
        this.version = version;
        this.utils = utils;
        this.sendTransaction = sendTransactionFn;
    }

    /**
     * Check if a wallet is registered on the chain.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} address - Wallet address.
     * @returns {Promise<Object>} Wallet status.
     */
    async checkWallet(blockchain, address) {
        const data = {
            "Blockchain": this.utils.hexFix(blockchain),
            "Address": this.utils.hexFix(address),
            "Version": this.version
        };

        try {
            const response = await fetch(this.getNAGURL() + 'Circular_CheckWallet_', {
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
            return this.utils.handleError(error);
        }
    }

    /**
     * Retrieve a wallet's information.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} address - Wallet address.
     * @returns {Promise<Object>} Wallet information.
     */
    async getWallet(blockchain, address) {
        const data = {
            "Blockchain": this.utils.hexFix(blockchain),
            "Address": this.utils.hexFix(address),
            "Version": this.version
        };

        try {
            const response = await fetch(this.getNAGURL() + 'Circular_GetWallet_', {
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
     * Get the latest transactions for a wallet.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} address - Wallet address.
     * @returns {Promise<Object>} Latest transactions.
     */
    async getLatestTransactions(blockchain, address) {
        const data = {
            "Blockchain": this.utils.hexFix(blockchain),
            "Address": this.utils.hexFix(address),
            "Version": this.version
        };

        try {
            const response = await fetch(this.getNAGURL() + 'Circular_GetLatestTransactions_', {
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
     * Get the balance of a specified asset in a wallet.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} address - Wallet address.
     * @param {string} asset - Asset name (e.g., 'CIRX').
     * @returns {Promise<Object>} Wallet balance.
     */
    async getWalletBalance(blockchain, address, asset) {
        const data = {
            "Blockchain": this.utils.hexFix(blockchain),
            "Address": this.utils.hexFix(address),
            "Asset": asset,
            "Version": this.version
        };

        try {
            const response = await fetch(this.getNAGURL() + 'Circular_GetWalletBalance_', {
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
     * Get the nonce for a wallet.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} address - Wallet address.
     * @returns {Promise<Object>} Wallet nonce.
     */
    async getWalletNonce(blockchain, address) {
        const data = {
            "Blockchain": this.utils.hexFix(blockchain),
            "Address": this.utils.hexFix(address),
            "Version": this.version
        };

        try {
            const response = await fetch(this.getNAGURL() + 'Circular_GetWalletNonce_', {
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
     * Register a wallet on a blockchain.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} publicKey - Wallet public key.
     * @returns {Promise<string>} Transaction ID.
     */
    async registerWallet(blockchain, publicKey) {
        blockchain = this.utils.hexFix(blockchain);
        publicKey = this.utils.hexFix(publicKey);

        const From = sha256(publicKey);
        const To = From;
        const Nonce = '0';
        const Type = 'C_TYPE_REGISTERWALLET';

        const PayloadObj = { "Action": "CP_REGISTERWALLET", "PublicKey": publicKey };
        const jsonstr = JSON.stringify(PayloadObj);
        const Payload = this.utils.stringToHex(jsonstr);

        const Timestamp = this.utils.getFormattedTimestamp();
        const ID = sha256(blockchain + From + To + Payload + Nonce + Timestamp);
        const Signature = "";

        try {
            await this.sendTransaction(ID, From, To, Timestamp, Type, Payload, Nonce, Signature, blockchain);
        } catch (error) {
            console.error('Error sending transaction:', error);
            throw error;
        }

        return ID;
    }
}

export { WalletAPI };
