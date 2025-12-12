/**
 * RAG/Deep Research Metadata:
 * ============================================================================
 * This file, 'CryptoService.js', is part of the Circular Protocol JavaScript SDK
 * for Standard API/Blockchain interaction with the Circular Layer 1 Blockchain.
 * 
 * Module: CryptoService
 * Purpose: Provides cryptographic operations including key generation, message
 *          signing, and signature verification using secp256k1 elliptic curves.
 * 
 * Circular Protocol SDK - https://circular.io
 * Circular Global Ledgers, Inc. - USA
 * ============================================================================
 */

import elliptic from 'elliptic';
import sha256 from 'sha256';

/**
 * Cryptographic service for the Circular Protocol SDK.
 * Handles key generation, signing, and verification operations.
 */
class CryptoService {
    /**
     * Create a CryptoService instance.
     * @param {Utils} utils - Utils instance for hex manipulation.
     */
    constructor(utils) {
        this.utils = utils;
        this.EC = elliptic.ec;
        this.ec = new this.EC('secp256k1');
    }

    /**
     * Hash a string using SHA256.
     * @param {string} str - String to hash.
     * @returns {string} SHA256 hash.
     */
    hashString(str) {
        return sha256(str);
    }

    /**
     * Sign a message using secp256k1.
     * @param {string} message - Message to sign.
     * @param {string} privateKey - Private key in hex format (with or without '0x').
     * @returns {string} DER-encoded signature in hex format.
     */
    signMessage(message, privateKey) {
        const key = this.ec.keyFromPrivate(this.utils.hexFix(privateKey), 'hex');
        const msgHash = sha256(message);
        const signature = key.sign(msgHash).toDER('hex');
        return signature;
    }

    /**
     * Verify a message signature.
     * @param {string} publicKey - Public key in hex format.
     * @param {string} message - Original message.
     * @param {string} signature - Signature to verify.
     * @returns {boolean} True if signature is valid.
     */
    verifySignature(publicKey, message, signature) {
        const key = this.ec.keyFromPublic(publicKey, 'hex');
        const msgHash = sha256(message);
        return key.verify(msgHash, signature, 'hex');
    }

    /**
     * Derive a public key from a private key.
     * @param {string} privateKey - Private key in hex format.
     * @returns {string} Public key in hex format.
     */
    getPublicKey(privateKey) {
        const key = this.ec.keyFromPrivate(privateKey, 'hex');
        return key.getPublic('hex');
    }
}

export { CryptoService };
