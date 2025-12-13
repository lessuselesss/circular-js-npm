/**
 * LLMs.txt/AGENTS.md Metadata:
 * Circular Protocol - Standard APIs SDK
 * This file, 'index.js', is the main non-breaking FACADE for the Circular
 * Protocol JavaScript SDK for Standard API/Blockchain interaction with the
 * Circular Layer 1 Blockchain.
 * 
 * Purpose: Manages configuration state (NAG_URL, NAG_KEY) and delegates all
 *          public method calls to internal modular components (WalletAPI,
 *          ContractAPI, BlockchainAPI, CryptoService, Utils), ensuring
 *          backward compatibility for external consumers.
 * 
 * Version: 1.0.14
 * 
 * Circular Protocol SDK - https://circular-protocol.gitbook.io/standard-apis
 * Circular Global Ledgers, Inc. - USA
 * 
 * Originator: Gianluca De Novi, PhD
 * Contributors: Danny De Novi, redorc83
 * 
 * Creation: 7/12/2022
 * Update: 28/01/2025
 * ============================================================================
 */

// --- Internal Module Imports ---
import { Utils } from './src/Utils.js';
import { CryptoService } from './src/CryptoService.js';
import { WalletAPI } from './src/WalletAPI.js';
import { ContractAPI } from './src/ContractAPI.js';
import { BlockchainAPI } from './src/BlockchainAPI.js';

// --- Configuration State (Retained in Facade) ---
let NAG_URL = 'https://nag.circularlabs.io/NAG.php?cep=';
let NAG_KEY = '';
const VERSION = '1.0.8';

// --- Configuration Getters (for dependency injection to modules) ---
const getNAGURL = () => NAG_URL;

// --- Initialize Internal Delegates ---
const utils = new Utils();
const crypto = new CryptoService(utils);
const blockchain = new BlockchainAPI(getNAGURL, VERSION, utils);
const contract = new ContractAPI(getNAGURL, VERSION, utils);
// WalletAPI needs sendTransaction reference, will be set after blockchain is ready
const wallet = new WalletAPI(getNAGURL, VERSION, utils,
    (id, from, to, timestamp, type, payload, nonce, signature, chain) =>
        blockchain.sendTransaction(id, from, to, timestamp, type, payload, nonce, signature, chain)
);

/**
 * Circular Protocol API - Non-Breaking Facade
 * 
 * All public methods delegate to internal modular implementations.
 * The interface remains identical to the original SDK for backward compatibility.
 */
let CircularProtocolAPI = {

    // ==================== CONFIGURATION (Retained in Facade) ====================

    /**
     * Set the Application NAG Key.
     * @param {string} nagKey - NAG API key.
     */
    setNAGKey: function (nagKey) {
        NAG_KEY = nagKey;
    },

    /**
     * Get the current NAG Key.
     * @returns {string} NAG API key.
     */
    getNAGKey: function () {
        return NAG_KEY;
    },

    /**
     * Set the Network Access Gateway (NAG) URL.
     * @param {string} nURL - NAG URL.
     */
    setNAGURL: function (nURL) {
        NAG_URL = nURL;
    },

    /**
     * Get the current NAG URL.
     * @returns {string} NAG URL.
     */
    getNAGURL: function () {
        return NAG_URL;
    },

    // ==================== UTILITY FUNCTIONS (Delegated) ====================

    /**
     * Remove '0x' prefix from hex strings.
     * @param {string} word - Hex string.
     * @returns {string} Cleaned hex string.
     */
    hexFix: function (word) {
        return utils.hexFix(word);
    },

    /**
     * Convert string to hexadecimal.
     * @param {string} str - String to convert.
     * @returns {string} Hex representation.
     */
    stringToHex: function (str) {
        return utils.stringToHex(str);
    },

    /**
     * Convert hexadecimal to string.
     * @param {string} hex - Hex string to convert.
     * @returns {string} Decoded string.
     */
    hexToString: function (hex) {
        return utils.hexToString(hex);
    },

    /**
     * Get formatted UTC timestamp: YYYY:MM:DD-hh:mm:ss.
     * @returns {string} Formatted timestamp.
     */
    getFormattedTimestamp: function () {
        return utils.getFormattedTimestamp();
    },

    // ==================== CRYPTOGRAPHIC FUNCTIONS (Delegated) ====================

    /**
     * Hash a string using SHA256.
     * @param {string} str - String to hash.
     * @returns {string} SHA256 hash.
     */
    hashString: function (str) {
        return crypto.hashString(str);
    },

    /**
     * Sign a message using secp256k1.
     * @param {string} message - Message to sign.
     * @param {string} privateKey - Private key (hex format).
     * @returns {string} DER-encoded signature.
     */
    signMessage: function (message, privateKey) {
        return crypto.signMessage(message, privateKey);
    },

    /**
     * Verify a message signature.
     * @param {string} publicKey - Public key (hex format).
     * @param {string} message - Original message.
     * @param {string} signature - Signature to verify.
     * @returns {boolean} True if valid.
     */
    verifySignature: function (publicKey, message, signature) {
        return crypto.verifySignature(publicKey, message, signature);
    },

    /**
     * Derive public key from private key.
     * @param {string} privateKey - Private key (hex format).
     * @returns {string} Public key (hex format).
     */
    getPublicKey: function (privateKey) {
        return crypto.getPublicKey(privateKey);
    },

    // ==================== WALLET FUNCTIONS (Delegated) ====================

    /**
     * Check if a wallet is registered.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} address - Wallet address.
     * @returns {Promise<Object>} Wallet status.
     */
    checkWallet: function (blockchain, address) {
        return wallet.checkWallet(blockchain, address);
    },

    /**
     * Get wallet information.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} address - Wallet address.
     * @returns {Promise<Object>} Wallet data.
     */
    getWallet: function (blockchain, address) {
        return wallet.getWallet(blockchain, address);
    },

    /**
     * Get latest transactions for a wallet.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} address - Wallet address.
     * @returns {Promise<Object>} Latest transactions.
     */
    getLatestTransactions: function (blockchain, address) {
        return wallet.getLatestTransactions(blockchain, address);
    },

    /**
     * Get wallet balance for an asset.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} address - Wallet address.
     * @param {string} asset - Asset name (e.g., 'CIRX').
     * @returns {Promise<Object>} Balance information.
     */
    getWalletBalance: function (blockchain, address, asset) {
        return wallet.getWalletBalance(blockchain, address, asset);
    },

    /**
     * Get wallet nonce.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} address - Wallet address.
     * @returns {Promise<Object>} Nonce value.
     */
    getWalletNonce: function (blockchain, address) {
        return wallet.getWalletNonce(blockchain, address);
    },

    /**
     * Register a wallet on a blockchain.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} publicKey - Wallet public key.
     * @returns {Promise<string>} Transaction ID.
     */
    registerWallet: function (blockchain, publicKey) {
        return wallet.registerWallet(blockchain, publicKey);
    },

    // ==================== CONTRACT FUNCTIONS (Delegated) ====================

    /**
     * Test smart contract execution.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} from - Developer wallet address.
     * @param {string} project - Smart contract project.
     * @returns {Promise<Object>} Test result.
     */
    testContract: function (blockchain, from, project) {
        return contract.testContract(blockchain, from, project);
    },

    /**
     * Make a local smart contract call.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} from - Caller wallet address.
     * @param {string} address - Contract address.
     * @param {string} request - Contract endpoint.
     * @returns {Promise<Object>} Call result.
     */
    callContract: function (blockchain, from, address, request) {
        return contract.callContract(blockchain, from, address, request);
    },

    // ==================== DOMAIN FUNCTIONS (Delegated) ====================

    /**
     * Resolve domain to wallet address.
     * @param {string} blockchain - Blockchain identifier.
     * @param {string} name - Domain name.
     * @returns {Promise<Object>} Resolution result.
     */
    getDomain: function (blockchain, name) {
        return blockchain.getDomain(blockchain, name);
    },

    // ==================== ASSET FUNCTIONS (Delegated) ====================

    /**
     * Get list of all assets on blockchain.
     * @param {string} chain - Blockchain identifier.
     * @returns {Promise<Object>} Asset list.
     */
    getAssetList: function (chain) {
        return blockchain.getAssetList(chain);
    },

    /**
     * Get asset descriptor.
     * @param {string} chain - Blockchain identifier.
     * @param {string} name - Asset name.
     * @returns {Promise<Object>} Asset descriptor.
     */
    getAsset: function (chain, name) {
        return blockchain.getAsset(chain, name);
    },

    /**
     * Get asset supply information.
     * @param {string} chain - Blockchain identifier.
     * @param {string} name - Asset name.
     * @returns {Promise<Object>} Supply info.
     */
    getAssetSupply: function (chain, name) {
        return blockchain.getAssetSupply(chain, name);
    },

    // ==================== VOUCHER FUNCTIONS (Delegated) ====================

    /**
     * Get voucher information.
     * @param {string} chain - Blockchain identifier.
     * @param {string} code - Voucher code.
     * @returns {Promise<Object>} Voucher data.
     */
    getVoucher: function (chain, code) {
        return blockchain.getVoucher(chain, code);
    },

    // ==================== BLOCK FUNCTIONS (Delegated) ====================

    /**
     * Get blocks in a range.
     * @param {string} chain - Blockchain identifier.
     * @param {number} start - Start block.
     * @param {number} end - End block.
     * @returns {Promise<Object>} Block range.
     */
    getBlockRange: function (chain, start, end) {
        return blockchain.getBlockRange(chain, start, end);
    },

    /**
     * Get a specific block.
     * @param {string} chain - Blockchain identifier.
     * @param {number} num - Block number.
     * @returns {Promise<Object>} Block data.
     */
    getBlock: function (chain, num) {
        return blockchain.getBlock(chain, num);
    },

    /**
     * Get blockchain block height.
     * @param {string} chain - Blockchain identifier.
     * @returns {Promise<Object>} Block count.
     */
    getBlockCount: function (chain) {
        return blockchain.getBlockCount(chain);
    },

    // ==================== ANALYTICS FUNCTIONS (Delegated) ====================

    /**
     * Get blockchain analytics.
     * @param {string} chain - Blockchain identifier.
     * @returns {Promise<Object>} Analytics data.
     */
    getAnalytics: function (chain) {
        return blockchain.getAnalytics(chain);
    },

    /**
     * Get list of available blockchains.
     * @returns {Promise<Object>} Blockchain list.
     */
    getBlockchains: function () {
        return blockchain.getBlockchains();
    },

    // ==================== TRANSACTION FUNCTIONS (Delegated) ====================

    /**
     * Get pending transaction by ID.
     * @param {string} chain - Blockchain identifier.
     * @param {string} txID - Transaction ID.
     * @returns {Promise<Object>} Pending transaction.
     */
    getPendingTransaction: function (chain, txID) {
        return blockchain.getPendingTransaction(chain, txID);
    },

    /**
     * Get transaction by ID.
     * @param {string} chain - Blockchain identifier.
     * @param {string} txID - Transaction ID.
     * @param {number} start - Start block.
     * @param {number} end - End block.
     * @returns {Promise<Object>} Transaction data.
     */
    getTransactionbyID: function (chain, txID, start, end) {
        return blockchain.getTransactionbyID(chain, txID, start, end);
    },

    /**
     * Get transactions by node.
     * @param {string} chain - Blockchain identifier.
     * @param {string} nodeID - Node ID.
     * @param {number} start - Start block.
     * @param {number} end - End block.
     * @returns {Promise<Object>} Transactions.
     */
    getTransactionbyNode: function (chain, nodeID, start, end) {
        return blockchain.getTransactionbyNode(chain, nodeID, start, end);
    },

    /**
     * Get transactions by address.
     * @param {string} chain - Blockchain identifier.
     * @param {string} address - Wallet address.
     * @param {number} start - Start block.
     * @param {number} end - End block.
     * @returns {Promise<Object>} Transactions.
     */
    getTransactionbyAddress: function (chain, address, start, end) {
        return blockchain.getTransactionbyAddress(chain, address, start, end);
    },

    /**
     * Get transactions by date range.
     * @param {string} chain - Blockchain identifier.
     * @param {string} address - Wallet address.
     * @param {string} startDate - Start date.
     * @param {string} endDate - End date.
     * @returns {Promise<Object>} Transactions.
     */
    getTransactionbyDate: function (chain, address, startDate, endDate) {
        return blockchain.getTransactionbyDate(chain, address, startDate, endDate);
    },

    /**
     * Submit a transaction.
     * @param {string} id - Transaction ID.
     * @param {string} from - Sender address.
     * @param {string} to - Recipient address.
     * @param {string} timestamp - Formatted timestamp.
     * @param {string} type - Transaction type.
     * @param {string} payload - Transaction payload.
     * @param {string} nonce - Wallet nonce.
     * @param {string} signature - Transaction signature.
     * @param {string} chain - Blockchain identifier.
     * @returns {Promise<Object>} Transaction result.
     */
    sendTransaction: function (id, from, to, timestamp, type, payload, nonce, signature, chain) {
        return blockchain.sendTransaction(id, from, to, timestamp, type, payload, nonce, signature, chain);
    },

    /**
     * Poll for transaction outcome.
     * @param {string} chain - Blockchain identifier.
     * @param {string} txID - Transaction ID.
     * @param {number} timeoutSec - Timeout in seconds.
     * @param {number} intervalSec - Poll interval in seconds.
     * @returns {Promise<Object>} Transaction outcome.
     */
    getTransactionOutcome: function (chain, txID, timeoutSec, intervalSec) {
        return blockchain.getTransactionOutcome(chain, txID, timeoutSec, intervalSec);
    }
};

export default CircularProtocolAPI;
