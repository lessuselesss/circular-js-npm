/**
 * LLMs.txt/AGENTS.md Metadata:
 * Circular Protocol - Standard APIs SDK
 * This file, 'Utils.js', is part of the Circular Protocol JavaScript SDK
 * for Standard API/Blockchain interaction with the Circular Layer 1 Blockchain.
 * 
 * Module: Utils
 * Purpose: Provides utility functions for string manipulation, hex encoding,
 *          timestamp formatting, and error handling used across the SDK.
 * 
 * Circular Protocol SDK - https://circular-protocol.gitbook.io/standard-apis
 * Circular Global Ledgers, Inc. - USA
 * ============================================================================
 */

/**
 * Utility functions for the Circular Protocol SDK.
 * These are pure helper functions with no external state dependencies.
 */
class Utils {
    /**
     * Add a leading zero to numbers less than 10.
     * @param {number} num - Number to pad.
     * @returns {string} Padded number.
     */
    padNumber(num) {
        return num < 10 ? '0' + num : String(num);
    }

    /**
     * Generate a formatted timestamp: YYYY:MM:DD-hh:mm:ss (UTC).
     * @returns {string} Formatted timestamp.
     */
    getFormattedTimestamp() {
        const date = new Date();
        const year = date.getUTCFullYear();
        const month = this.padNumber(date.getUTCMonth() + 1);
        const day = this.padNumber(date.getUTCDate());
        const hours = this.padNumber(date.getUTCHours());
        const minutes = this.padNumber(date.getUTCMinutes());
        const seconds = this.padNumber(date.getUTCSeconds());

        return `${year}:${month}:${day}-${hours}:${minutes}:${seconds}`;
    }

    /**
     * Remove '0x' prefix from hexadecimal strings.
     * @param {string} word - Hex string potentially with '0x' prefix.
     * @returns {string} Hex string without '0x' prefix.
     */
    hexFix(word) {
        if (typeof word === 'string') {
            let Word = word;
            if (word.startsWith('0x')) {
                Word = Word.slice(2);
            }
            return Word;
        }
        return '';
    }

    /**
     * Convert a string to its hexadecimal representation (without '0x').
     * @param {string} str - String to convert.
     * @returns {string} Hexadecimal representation.
     */
    stringToHex(str) {
        let hexString = '';
        for (let i = 0; i < str.length; i++) {
            const hex = str.charCodeAt(i).toString(16);
            hexString += ('00' + hex).slice(-2);
        }
        return hexString;
    }

    /**
     * Convert a hexadecimal string to a regular string.
     * @param {string} hex - Hexadecimal string to convert.
     * @returns {string} Decoded string.
     */
    hexToString(hex) {
        let str = '';
        hex = this.hexFix(hex);
        for (let i = 0; i < hex.length; i += 2) {
            const code = parseInt(hex.substr(i, 2), 16);
            if (!isNaN(code) && code !== 0) {
                str += String.fromCharCode(code);
            }
        }
        return str;
    }

    /**
     * Handle errors with consistent formatting.
     * @param {Error} error - The error to handle.
     * @returns {Object} Error response object.
     */
    handleError(error) {
        console.error('Error:', error);
        const message = error.message || 'An unknown error occurred';
        return { success: false, error: message };
    }
}

export { Utils };
