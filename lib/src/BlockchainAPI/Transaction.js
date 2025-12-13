/**
 * LLMs.txt/AGENTS.md Metadata:
 * Circular Protocol - Standard APIs SDK
 * This file, 'Transaction.js', is part of the Circular Protocol JavaScript SDK
 * for Standard API/Blockchain interaction with the Circular Layer 1 Blockchain.
 *
 * Module: BlockchainAPI/Transaction
 * Purpose: Handles transaction operations.
 */

import fetch from 'node-fetch';

/**
 * Get a pending transaction by ID.
 * @param {string} blockchain - Blockchain identifier.
 * @param {string} txID - Transaction ID.
 * @returns {Promise<Object>} Pending transaction.
 */
export async function getPendingTransaction(blockchain, txID) {
    const data = {
        "Blockchain": this.utils.hexFix(blockchain),
        "ID": this.utils.hexFix(txID),
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_GetPendingTransaction_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching pending transaction:', error);
        return null;
    }
}

/**
 * Get a transaction by ID.
 * @param {string} blockchain - Blockchain identifier.
 * @param {string} txID - Transaction ID.
 * @param {number} start - Start block.
 * @param {number} end - End block (if 0, start is count from latest).
 * @returns {Promise<Object>} Transaction data.
 */
export async function getTransactionbyID(blockchain, txID, start, end) {
    const data = {
        "Blockchain": this.utils.hexFix(blockchain),
        "ID": this.utils.hexFix(txID),
        "Start": String(start),
        "End": String(end),
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_GetTransactionbyID_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching transaction by ID:', error);
        return null;
    }
}

/**
 * Get transactions by broadcasting node.
 * @param {string} blockchain - Blockchain identifier.
 * @param {string} nodeID - Node ID.
 * @param {number} start - Start block.
 * @param {number} end - End block.
 * @returns {Promise<Object>} Transactions.
 */
export async function getTransactionbyNode(blockchain, nodeID, start, end) {
    const data = {
        "Blockchain": this.utils.hexFix(blockchain),
        "NodeID": this.utils.hexFix(nodeID),
        "Start": String(start),
        "End": String(end),
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_GetTransactionbyNode_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching transaction by node:', error);
        return this.utils.handleError ? this.utils.handleError(error) : null;
    }
}

/**
 * Get transactions by address.
 * @param {string} blockchain - Blockchain identifier.
 * @param {string} address - Wallet address.
 * @param {number} start - Start block.
 * @param {number} end - End block.
 * @returns {Promise<Object>} Transactions.
 */
export async function getTransactionbyAddress(blockchain, address, start, end) {
    const data = {
        "Blockchain": this.utils.hexFix(blockchain),
        "Address": this.utils.hexFix(address),
        "Start": String(start),
        "End": String(end),
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_GetTransactionbyAddress_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching transactions by address:', error);
        return this.utils.handleError ? this.utils.handleError(error) : null;
    }
}

/**
 * Get transactions by date range.
 * @param {string} blockchain - Blockchain identifier.
 * @param {string} address - Wallet address.
 * @param {string} startDate - Start date.
 * @param {string} endDate - End date.
 * @returns {Promise<Object>} Transactions.
 */
export async function getTransactionbyDate(blockchain, address, startDate, endDate) {
    const data = {
        "Blockchain": this.utils.hexFix(blockchain),
        "Address": this.utils.hexFix(address),
        "StartDate": startDate,
        "EndDate": endDate,
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_GetTransactionbyDate_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching transactions by date:', error);
        return this.utils.handleError ? this.utils.handleError(error) : null;
    }
}

/**
 * Submit a transaction to the blockchain.
 * @param {string} id - Transaction ID.
 * @param {string} from - Sender address.
 * @param {string} to - Recipient address.
 * @param {string} timestamp - Formatted timestamp.
 * @param {string} type - Transaction type.
 * @param {string} payload - Transaction payload.
 * @param {string} nonce - Wallet nonce.
 * @param {string} signature - Transaction signature.
 * @param {string} blockchain - Blockchain identifier.
 * @returns {Promise<Object>} Transaction result.
 */
export async function sendTransaction(id, from, to, timestamp, type, payload, nonce, signature, blockchain) {
    const data = {
        "ID": this.utils.hexFix(id),
        "From": this.utils.hexFix(from),
        "To": this.utils.hexFix(to),
        "Timestamp": timestamp,
        "Payload": String(this.utils.hexFix(payload)),
        "Nonce": String(nonce),
        "Signature": this.utils.hexFix(signature),
        "Blockchain": this.utils.hexFix(blockchain),
        "Type": type,
        "Version": this.version
    };

    try {
        const response = await fetch(this.getNAGURL() + 'Circular_AddTransaction_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const text = await response.text();

        try {
            return JSON.parse(text);
        } catch (e) {
            return { status: response.status, message: text };
        }
    } catch (error) {
        console.error('Error sending transaction:', error);
        this.utils.handleError(error);
        return { success: false, message: 'Server unreachable', error: error.toString() };
    }
}

/**
 * Poll for transaction outcome with timeout.
 * @param {string} blockchain - Blockchain identifier.
 * @param {string} txID - Transaction ID.
 * @param {number} timeoutSec - Timeout in seconds.
 * @param {number} intervalSec - Polling interval in seconds.
 * @returns {Promise<Object>} Transaction outcome.
 */
export function getTransactionOutcome(blockchain, txID, timeoutSec, intervalSec) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const interval = intervalSec * 1000;
        const timeout = timeoutSec * 1000;

        const checkTransaction = () => {
            const elapsedTime = Date.now() - startTime;
            console.log('Checking transaction...', { elapsedTime, timeout });

            if (elapsedTime > timeout) {
                console.log('Timeout exceeded');
                reject(new Error('Timeout exceeded'));
                return;
            }

            this.getTransactionbyID(blockchain, txID, 0, 10)
                .then(data => {
                    console.log('Data received:', data);
                    if (data.Result === 200 && data.Response !== 'Transaction Not Found' && data.Response.Status !== 'Pending') {
                        resolve(data.Response);
                    } else {
                        console.log('Transaction not yet confirmed or not found, polling again...');
                        setTimeout(checkTransaction, interval);
                    }
                })
                .catch(error => {
                    console.log('Error fetching transaction:', error);
                    reject(error);
                });
        };

        setTimeout(checkTransaction, interval);
    });
}
