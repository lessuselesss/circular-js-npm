# AGENTS Guidelines for This Repository

This repository contains the Node.js/JavaScript SDK for the Circular Protocol API. When working on the project interactively with an agent (e.g., Codex CLI, Gemini CLI, Cursor, Claude Code, Open Code or other AI coding assistants), please follow the guidelines below to ensure a smooth development experience.

## 1. Development Environment Setup

* **Install dependencies** using npm:
  ```bash
  npm install
  ```

* **Use ES modules** - This project uses `"type": "module"` in package.json, meaning all files are ES modules by default.

* **Dual package support** - The package exports both CommonJS and ES module formats:
  - CommonJS: `./lib/index.cjs`
  - ES Module: `./lib/index.js`

## 2. Code Quality and Standards

* **Follow modern JavaScript conventions**:
  - Use ES6+ features (arrow functions, async/await, destructuring, etc.)
  - Prefer `const` and `let` over `var`
  - Use meaningful variable and function names

* **Test your changes** - All new functionality should include tests:
  ```bash
  npm test
  ```

* **Keep dependencies minimal** - Only add necessary dependencies and keep them updated.

## 3. Project Structure

* `lib/` - Main package directory containing SDK implementation
* `tests/` - Test files (uses Jest)
* `package.json` - Package configuration and dependencies
* `webpack.config.*.js` - Build configurations for different module formats

## 4. Building and Testing

* **Run tests** before committing changes:
  ```bash
  npm test
  ```

* **Build the package** if you modify source files:
  ```bash
  npm run build:cjs    # Build CommonJS version
  npm run build:esm    # Build ES Module version
  ```

* **Verify imports** work in both CommonJS and ES module environments after building.

## 5. Version Management

* Update the version in `package.json` when making releases.
* Follow [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH).
* Current version: `1.0.14`

## 6. Useful Commands Recap

| Command              | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| `npm install`        | Install all dependencies                             |
| `npm test`           | Run Jest test suite                                  |
| `npm run build:cjs`  | Build CommonJS distribution                          |
| `npm run build:esm`  | Build ES Module distribution                         |
| `npm update`         | Update dependencies to latest versions               |

## 7. API Documentation

* Refer to the [Circular Protocol Documentation](https://circular-protocol.gitbook.io/standard-apis) for API endpoints and usage patterns.
* Keep README.md examples up to date with any API changes.
* Update both CommonJS and ES module usage examples when applicable.

## 8. Dependencies

Current dependencies:
- `elliptic` - Elliptic curve cryptography
- `node-fetch` - HTTP client for making API requests
- `sha256` - SHA-256 hashing

## 9. Testing Framework

* **Jest** is used for testing
* Mock HTTP requests using `nock` for reliable, offline-friendly tests
* Place test files in the `tests/` directory

---

Following these practices ensures that agent-assisted development remains efficient and maintains code quality. When in doubt, run the test suite to verify changes don't break existing functionality.

## 10. API Tester

The repository includes an interactive API tester (`api-tester.html`) for verifying SDK functionality in the browser.

### Setup
The tester requires the browser-bundled SDK. Build it using:
```bash
npm run build
```
This generates `dist/circular-api-bundle.js`.

### Usage
1. Open `api-tester.html` in a web browser.
2. Configure the **NAG URL** (default provided) and **NAG Key** (if required).
3. Use the interface to execute API methods:
   - **Utility Functions**: Hex conversion, timestamp generation.
   - **Cryptographic Functions**: Hashing, signing, verification (fully supported via bundle).
   - **Wallet/Contract/Block Operations**: Interact with the blockchain.

### Troubleshooting
- If crypto methods fail, ensure you have run `npm run build` to update the bundle.
- Check the console for detailed error messages.
