# Circular Protocol - TypeScript SDK

[![npm version](https://img.shields.io/npm/v/circular-protocol-api.svg)](https://www.npmjs.com/package/circular-protocol-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

The **Circular Protocol TypeScript SDK** is the official TypeScript/JavaScript library for seamless integration with the Circular blockchain ecosystem. This open-source SDK provides a comprehensive suite of tools for efficient and secure interaction with blockchain networks, managing wallets, assets, smart contracts, and more.

## 🔥 Key Features

- **Blockchain Interaction**: Connect and interact with Circular's blockchain networks
- **Smart Contracts**: Deploy, test, and interact with smart contracts
- **Wallet Management**: Create, retrieve, and manage blockchain wallets with balance tracking
- **Asset Management**: Issue and manage assets, handle transfers, and retrieve supply information
- **Domain Management**: Resolve blockchain domain names to wallet addresses
- **Transaction Management**: Send transactions, track status, and search the blockchain
- **Analytics**: Access blockchain performance data and insights
- **Cryptographic Helpers**: Built-in utilities for key generation, signing, and hashing
- **TypeScript Support**: Full type definitions for enhanced developer experience
- **Dual Module Support**: Works with both CommonJS (require) and ES Modules (import)

```bash
npm install circular-protocol-api
```

Or with Yarn:

```bash
yarn add circular-protocol-api
```

Or with pnpm:

```bash
pnpm add circular-protocol-api
```

## 🚀 Quick Start

```typescript
import { CircularProtocolAPI } from 'circular-protocol-api';

async function main() {
  // Initialize the API client
  const api = new CircularProtocolAPI(
    'https://nag.circularlabs.io/NAG.php?cep=',  // Optional: NAG URL
    'your-api-key'  // Optional: API key
  );

  try {
    // Method 1: Positional parameters (JavaScript-style, matches circular-js-npm)
    const result1 = await api.checkWallet(
      'MainNet',
      '0xd55872dbe508fd27445889b9d81bbc9411bb0f1353153a249f2fb34ef2690310'
    );

    // Method 2: Request object (TypeScript-style, type-safe)
    const result2 = await api.checkWallet({
      Blockchain: 'MainNet',
      Address: '0xd55872dbe508fd27445889b9d81bbc9411bb0f1353153a249f2fb34ef2690310'
      // Version automatically injected, no need to specify
    });

    console.log('Wallet exists:', result1.Response);
  } catch (error) {
    console.error('API Error:', error);
  }
}

main();
```

### Key Features in v1.0.9

- **Dual API Styles**: Use either positional parameters or request objects
- **Auto-Preprocessing**: Hex values automatically normalized ('0x' prefix optional)
- **Version Auto-Injection**: No need to specify version in requests
- **Full JavaScript Compatibility**: Drop-in replacement for circular-js-npm

## 📜 API Reference

The Circular Protocol TypeScript SDK provides **39 methods** across multiple categories for comprehensive blockchain interaction.

### Wallet Operations (5 methods)

- **`checkWallet`** - Verify wallet existence on the blockchain
- **`getWallet`** - Retrieve complete wallet details and metadata
- **`getLatestTransactions`** - Get recent wallet activity and transaction history
- **`getWalletBalance`** - Query current wallet balance across assets
- **`getWalletNonce`** - Get transaction nonce for the wallet

### Transaction Operations (6 methods)

- **`sendTransaction`** - Submit new transaction to the blockchain
- **`getPendingTransaction`** - Check transaction status in the mempool
- **`getTransactionbyID`** - Query transaction by unique identifier
- **`getTransactionbyNode`** - Query transactions by validator node
- **`getTransactionbyAddress`** - Query all transactions for a wallet address
- **`getTransactionbyDate`** - Query transactions within a date range

### Block Operations (4 methods)

- **`getBlock`** - Retrieve block data by block number or hash
- **`getBlockRange`** - Query multiple blocks within a range
- **`getBlockCount`** - Get current blockchain height (latest block number)
- **`getAnalytics`** - Retrieve blockchain performance metrics and analytics

### Contract Operations (2 methods)

- **`testContract`** - Validate smart contract logic before deployment
- **`callContract`** - Execute smart contract function call

### Asset Operations (4 methods)

- **`getAssetList`** - List all available assets on the blockchain
- **`getAsset`** - Get detailed asset information and metadata
- **`getAssetSupply`** - Query total and circulating supply for an asset
- **`getVoucher`** - Retrieve voucher data and redemption details

### Domain Operations (1 method)

- **`getDomain`** - Query blockchain domain registry (resolve domain to address)

### Network Operations (1 method)

- **`getBlockchains`** - List all supported blockchain networks

---

### Cryptographic Helpers (5 methods)

- **`signMessage`** - Generate ECDSA secp256k1 signatures (DER format)
- **`verifySignature`** - Verify message signatures against public keys
- **`getPublicKey`** - Derive public key from private key (128 hex characters, uncompressed, no 0x04 prefix)
- **`hashString`** - Generate SHA-256 hash of string input
- **`getFormattedTimestamp`** - Get current UTC timestamp in Circular Protocol format (`YYYY:MM:DD-HH:mm:ss`)

**Implementation Details:**
- **TypeScript/JavaScript**: `crypto-browserify` (browser-compatible)
- **Python**: `ecdsa` + `hashlib` (standard library)
- **Java**: Bouncy Castle library for secp256k1
- **PHP**: `phpseclib3` elliptic curve cryptography
- **Go**: `btcsuite/btcd/btcec/v2` secp256k1
- **Dart**: `pointycastle` package

---

### Encoding Helpers (4 methods)

- **`hexFix`** - Normalize hex strings (remove `0x` prefix if present)
- **`stringToHex`** - Convert UTF-8 string to hexadecimal encoding
- **`hexToString`** - Convert hexadecimal string to UTF-8
- **`padNumber`** - Zero-pad single-digit numbers (e.g., `5` → `"05"`)

---

### Advanced Helpers (3 methods)

- **`GetError`** - Retrieve last error message from SDK
- **`handleError`** - Internal error tracking and logging
- **`getTransactionOutcome`** - Poll for transaction confirmation with automatic retries

**Transaction Polling Behavior:**
- Checks transaction status every **5 seconds** (configurable via `intervalSec`)
- Returns successfully when transaction has `BlockNumber > 0` (confirmed)
- Throws timeout error after **120 seconds** (configurable via `timeoutSec`)
- Handles "pending" status gracefully with automatic retries
- Distinguishes between temporary "pending" and permanent errors

---

### Convenience Methods (1 method)

- **`registerWallet`** - Simplified wallet registration (wraps `sendTransaction`)

**Implementation:**
- Automatically derives `From` and `To` addresses via `hashString(publicKey)`
- Constructs transaction payload: `{"Action": "CP_WALLET", "PublicKey": "..."}`
- Sets default values: `Nonce="00000000"`, `Type="C"`, `Signature="0000..."`
- Calculates transaction ID as SHA-256 hash of transaction fields
- Returns same response structure as `sendTransaction`

---

## 📊 Total Methods: 39

- **23** API Endpoint Methods
- **5** Cryptographic Helpers
- **4** Encoding Helpers
- **3** Advanced Helpers
- **3** Configuration Methods (getNagUrl, setNagUrl, getNagKey, setNagKey, setHeader, etc.)
- **1** Convenience Method

> **Note**: For detailed parameter types, response structures, and advanced usage examples, refer to the **[TypeScript SDK Documentation](https://circular-protocol.gitbook.io/circular-sdk/api-docs/typescript)**.

## 🤝 Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](https://github.com/circular-protocol/circular-canonical/blob/main/CONTRIBUTING.md) file in the canonical repository for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Resources

- **[TypeScript SDK Documentation](https://circular-protocol.gitbook.io/circular-sdk/api-docs/typescript)** - Complete API reference
- **[Circular Protocol Docs](https://circular-protocol.gitbook.io)** - Protocol documentation
- **[Circular Canonical](https://github.com/circular-protocol/circular-canonical)** - Single source of truth
- **[Package on npm](https://www.npmjs.com/package/circular-protocol-api)** - Official TypeScript/JavaScript package

## ℹ️ About

**Version**: 1.0.x
**License**: MIT
**Maintained**: Manually maintained to ensure compatibility with circular-js-npm while adding TypeScript enhancements

---

© 2025 Circular Global Ledgers, Inc. - Open source for private and commercial use
