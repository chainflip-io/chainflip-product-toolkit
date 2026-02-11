# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Chainflip Product Toolkit is a pnpm monorepo of TypeScript libraries for the Chainflip cross-chain swap protocol. Packages are published under the `@chainflip` npm scope.

## Commands

```bash
# Install dependencies
pnpm install

# Run all tests (watch mode)
pnpm test

# Run tests for a specific package
pnpm --filter @chainflip/utils test
pnpm --filter @chainflip/rpc test

# Run tests once (no watch, used in CI)
pnpm --filter @chainflip/utils test run

# Run a single test file
pnpm vitest run packages/utils/src/__tests__/math.test.ts

# Lint
pnpm eslint --max-warnings 0 --no-warn-ignored .

# Format check
pnpm prettier:check

# Type check a package
pnpm --filter @chainflip/utils exec tsc --noEmit

# Build a package
pnpm --filter @chainflip/utils build

# Check dependency version consistency
pnpm syncpack:list
```

## Architecture

### Package Dependency Graph

`@chainflip/utils` is the foundational package — nearly every other package depends on it. Key dependencies flow:

- `utils` → `rpc`, `bitcoin`, `solana`, `scale`, `delegation`, `processor`, `redis`, `testing`
- `scale` → `solana`
- `rpc` → `processor` (devDependency), `chainspec` (devDependency)
- `chainspec` is internal-only (not published), provides the base Parser/CodeGenerator/Compiler framework

### Central Type System (`@chainflip/utils/chainflip`)

This is the most important module to understand. It defines the canonical asset and chain types used across all packages:

- **Internal assets** use CamelCase identifiers: `Eth`, `Btc`, `Usdc`, `ArbUsdc`, `SolUsdc`, `HubDot`, etc.
- **Chains**: `Ethereum`, `Bitcoin`, `Polkadot`, `Solana`, `Arbitrum`, `Assethub`
- **Asset symbols**: `ETH`, `BTC`, `USDC`, `USDT`, `FLIP`, `DOT`, `SOL`
- `ChainAssetMap<T>` maps chain → asset symbol → T (the standard way to represent per-asset data)
- `getInternalAsset({ chain, asset })` converts RPC-style `{chain, asset}` pairs to internal asset names
- `assetConstants` and `chainConstants` hold decimals, chain mappings, and block times

### Subpath Exports

Packages use subpath exports extensively. Import specific modules, not the barrel:
```typescript
import { sum } from '@chainflip/utils/math';
import { assert } from '@chainflip/utils/assertion';
import { bytesToHex } from '@chainflip/utils/bytes';
```

### Code Generation Pattern (chainspec, processor, extrinsics)

These packages follow a shared pattern: `BaseParser` parses Substrate metadata, `BaseCodeGenerator` produces TypeScript files, and `Compiler` orchestrates the pipeline across spec versions. The processor package extends this for block event handling.

### Block Processor (`@chainflip/processor`)

Generic framework for processing Substrate blocks. `Processor` class fetches blocks in batches, routes events to handlers via `HandlerMap`, and tracks state through a `ProcessorStore` abstraction. Event handlers are registered with spec version ranges.

### RPC Client (`@chainflip/rpc`)

Typed JSON-RPC client with `HttpClient` and `WsClient` implementations. Request types and response parsers are defined in `types.ts` and `parsers.ts`.

## Code Conventions

- **ESM only**: All packages use `"type": "module"`
- **Strict TypeScript**: `strict: true`, `noImplicitReturns`, target ESNext, module resolution Bundler
- **`no-console` rule**: Console usage is an error everywhere except `packages/processor`
- **Unused vars**: Prefix with `_` (e.g., `_unused`) to satisfy `@typescript-eslint/no-unused-vars`
- **Import order**: Enforced by eslint-plugin-import — externals first, then internal (`@/`), then relative
- **Prettier**: Single quotes, 100 char print width, trailing commas
- **Curly braces**: `multi-line` style (single-line bodies don't need braces)
- **Build tools**: Most packages use tsup; some use tsdown. Dual CJS/ESM output
- **Validation**: zod for runtime schema validation
- **Ethereum**: viem (not ethers.js)
- **SCALE encoding**: scale-ts library
- **PR titles**: Must follow semantic commit format (enforced by CI)
- **Tests**: Colocated in `src/__tests__/` directories, files named `*.test.ts`
- **TSConfig paths**: `@/chainspec/*`, `@/scale/*`, and `@/testing` are workspace path aliases (for tests/internal use)
