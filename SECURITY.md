# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of the Circular Protocol TypeScript SDK seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Where to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:
- **Email**: security@circularlabs.io

If you prefer encrypted communication, please request our PGP key.

### What to Include

Please include the following information in your report:

- **Type of vulnerability** (e.g., cryptographic weakness, input validation issue, etc.)
- **Full paths of source file(s)** related to the manifestation of the vulnerability
- **Location of the affected source code** (tag/branch/commit or direct URL)
- **Step-by-step instructions** to reproduce the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact of the vulnerability**, including how an attacker might exploit it
- **Your contact information** for follow-up questions

### Response Timeline

- **Initial Response**: Within 48 hours of report submission
- **Vulnerability Assessment**: Within 5 business days
- **Fix Timeline**: Depends on severity and complexity
  - Critical: Within 7 days
  - High: Within 14 days
  - Medium: Within 30 days
  - Low: Next scheduled release

### Security Update Process

1. **Confirmation**: We confirm the vulnerability and determine its severity
2. **Fix Development**: We develop a fix in a private repository
3. **Testing**: Thorough testing of the fix
4. **Release**: Security patch released with credit to reporter (unless anonymity requested)
5. **Disclosure**: Public disclosure after patch is available

### Security Best Practices

When using the Circular Protocol TypeScript SDK:

#### Private Key Management

**NEVER** store private keys in:
- Source code or version control
- Environment variables in public repositories
- Client-side code or frontend applications
- Log files or error messages
- Configuration files committed to git

**DO** store private keys in:
- Secure key management systems (AWS KMS, HashiCorp Vault, etc.)
- Hardware security modules (HSMs)
- Encrypted environment variables (with restricted access)
- Secure secrets management services

```typescript
// ❌ NEVER DO THIS
const privateKey = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3';

// ✅ DO THIS
const privateKey = process.env.WALLET_PRIVATE_KEY;
if (!privateKey) {
  throw new Error('Private key not configured');
}
```

#### Input Validation

Always validate and sanitize inputs:

```typescript
// Validate addresses
function isValidAddress(address: string): boolean {
  return /^[a-fA-F0-9]{64}$/.test(address.replace(/^0x/, ''));
}

// Validate blockchain names
const VALID_BLOCKCHAINS = [
  'Circular Main Public',
  'Circular Secondary Public',
  'Circular Documark Public',
  'Circular SandBox'
];
if (!VALID_BLOCKCHAINS.includes(blockchain)) {
  throw new Error('Invalid blockchain identifier');
}
```

#### Transaction Verification

Always verify transaction parameters before signing:

```typescript
// Verify transaction before signing
const nonce = await api.getWalletNonce(blockchain, fromAddress);
console.log('Transaction Details:');
console.log(`From: ${fromAddress}`);
console.log(`To: ${toAddress}`);
console.log(`Amount: ${amount}`);
console.log(`Nonce: ${nonce}`);

// Confirm before proceeding
const signature = api.signMessage(transactionHash, privateKey);
```

#### Network Security

- **Use HTTPS**: Always use HTTPS endpoints for NAG communication
- **Verify Endpoints**: Ensure NAG endpoint URLs are from trusted sources
- **Rate Limiting**: Implement client-side rate limiting to prevent abuse
- **Timeout Handling**: Set appropriate timeouts for API calls

```typescript
const api = new CircularProtocolAPI('https://nag.circularlabs.io/NAG.php?cep=');
// Never use: http:// (unencrypted)
```

#### Dependency Security

- Keep dependencies up to date
- Regularly run `npm audit` to check for vulnerabilities
- Review dependency changes before updating
- Use lock files (package-lock.json) to ensure consistent builds

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically (review changes)
npm audit fix

# Check for outdated packages
npm outdated
```

## Known Security Considerations

### Cryptographic Operations

This SDK uses:
- **secp256k1** elliptic curve (same as Bitcoin/Ethereum)
- **SHA256** hashing algorithm
- **DER-encoded signatures**

These are industry-standard cryptographic primitives. However:

- **Randomness**: Ensure your environment has sufficient entropy for key generation
- **Side-channel attacks**: Private keys should never be exposed to untrusted code
- **Timing attacks**: Be cautious when comparing signatures or hashes

### Client-Side Usage Warning

**⚠️ This SDK is designed for server-side use (Node.js)**

Using this SDK in browser/client-side applications exposes:
- Private keys to potential XSS attacks
- Transaction signing logic to inspection
- API keys to public view

For client-side applications:
- Implement a backend API to handle signing
- Never expose private keys to the frontend
- Use hardware wallets or browser extensions for user signatures

### Auto-Preprocessing

The SDK automatically preprocesses inputs:
- Strips `0x` prefixes from hex strings
- Converts strings to hex for contract methods
- Generates timestamps automatically

While this improves developer experience, always:
- Validate inputs before passing to the SDK
- Understand what transformations are applied
- Review transaction data before submitting

## Security Advisories

Security advisories will be published at:
- [GitHub Security Advisories](https://github.com/circular-protocol/circular-js-npm/security/advisories)
- Release notes with `[SECURITY]` tag
- CHANGELOG.md with security section

## Bug Bounty Program

Currently, we do not have a formal bug bounty program. However:
- Significant vulnerabilities may be eligible for recognition
- Contributors will be credited in release notes (unless anonymity requested)
- We appreciate responsible disclosure

## Contact

For security concerns or questions:
- **Security Email**: security@circularlabs.io
- **General Support**: support@circularlabs.io
- **GitHub Issues**: For non-security bugs only

## Acknowledgments

We would like to thank the following individuals for responsibly disclosing security vulnerabilities:

*No vulnerabilities reported yet*

---

**Last Updated**: 2025-11-15
