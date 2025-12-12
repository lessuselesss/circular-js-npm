/**
 * RAG/Deep Research Metadata:
 * ============================================================================
 * This file, 'BlockchainAPI.js', is part of the Circular Protocol JavaScript SDK
 * for Standard API/Blockchain interaction with the Circular Layer 1 Blockchain.
 * 
 * Module: BlockchainAPI
 * Purpose: Provides blockchain query operations including block retrieval,
 *          transaction queries, asset management, domain resolution, analytics,
 *          vouchers, and transaction submission.
 * 
 * Circular Protocol SDK - https://circular.io
 * Circular Global Ledgers, Inc. - USA
 * ============================================================================
 */

import fetch from 'node-fetch';

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

    // ==================== DOMAIN MANAGEMENT ====================

    /**
     * Resolve a domain name to a wallet address.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} name - Domain name.
     * @returns {Promise<Object>} Domain resolution result.
     */
    async getDomain(blockchain, name) {
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

    // ==================== PARAMETRIC ASSETS ====================

    /**
     * Get list of all assets minted on a blockchain.
     * @param {string} blockchain - Blockchain identifier.
     * @returns {Promise<Object>} Asset list.
     */
    async getAssetList(blockchain) {
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
    async getAsset(blockchain, name) {
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
    async getAssetSupply(blockchain, name) {
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

    // ==================== VOUCHERS ====================

    /**
     * Get a voucher by code.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} code - Voucher code.
     * @returns {Promise<Object>} Voucher information.
     */
    async getVoucher(blockchain, code) {
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

    // ==================== BLOCKS ====================

    /**
     * Get blocks in a specified range.
     * @param {string} blockchain - Blockchain identifier.
     * @param {number} start - Start block number.
     * @param {number} end - End block number (if 0, start is count from latest).
     * @returns {Promise<Object>} Block range.
     */
    async getBlockRange(blockchain, start, end) {
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
    async getBlock(blockchain, num) {
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
    async getBlockCount(blockchain) {
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

    // ==================== ANALYTICS ====================

    /**
     * Get blockchain analytics.
     * @param {string} blockchain - Blockchain identifier.
     * @returns {Promise<Object>} Analytics data.
     */
    async getAnalytics(blockchain) {
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
    async getBlockchains() {
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

    // ==================== TRANSACTIONS ====================

    /**
     * Get a pending transaction by ID.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} txID - Transaction ID.
     * @returns {Promise<Object>} Pending transaction.
     */
    async getPendingTransaction(blockchain, txID) {
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
    async getTransactionbyID(blockchain, txID, start, end) {
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
    async getTransactionbyNode(blockchain, nodeID, start, end) {
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
    async getTransactionbyAddress(blockchain, address, start, end) {
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
    async getTransactionbyDate(blockchain, address, startDate, endDate) {
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
    async sendTransaction(id, from, to, timestamp, type, payload, nonce, signature, blockchain) {
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
    getTransactionOutcome(blockchain, txID, timeoutSec, intervalSec) {
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
}

export { BlockchainAPI };
